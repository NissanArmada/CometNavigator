import logging
import re
from datetime import datetime, timedelta
from typing import Annotated

import httpx
import google.generativeai as genai
from fastapi import APIRouter, Depends
from pymongo.asynchronous.database import AsyncDatabase

from config import settings
from database import get_db
from exceptions import NotFound, InternalServerError

router = APIRouter()
logger = logging.getLogger("cometnavigator." + __name__)

genai.configure(api_key=settings.GEMINI_API_KEY)

DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

STUDY_START = 8
STUDY_END = 22


def parse_time(time_str: str) -> datetime | None:
    if not time_str:
        return None
    try:
        return datetime.strptime(time_str.strip().upper(), "%I:%M%p")
    except ValueError:
        try:
            return datetime.strptime(time_str.strip().upper(), "%I%p")
        except ValueError:
            return None


def get_busy_slots(courses: list[dict], ecs: list[dict]) -> dict[str, list[tuple[int, int]]]:
    busy: dict[str, list[tuple[int, int]]] = {day: [] for day in DAY_ORDER}

    for course in courses:
        start = parse_time(course.get("start_time", ""))
        end = parse_time(course.get("end_time", ""))
        if not start or not end:
            continue
        for day in course.get("meeting_days", []):
            if day in busy:
                busy[day].append((start.hour + start.minute / 60, end.hour + end.minute / 60))

    for ec in ecs:
        start = parse_time(ec.get("start_times", ""))
        end = parse_time(ec.get("end_times", ""))
        if not start or not end:
            continue
        for day in ec.get("meeting_times", []):
            if day in busy:
                busy[day].append((start.hour + start.minute / 60, end.hour + end.minute / 60))

    return busy


def get_free_slots(busy_slots: list[tuple[float, float]], min_block: float = 1.0) -> list[tuple[float, float]]:
    busy_sorted = sorted(busy_slots)
    free = []
    current = float(STUDY_START)

    for start, end in busy_sorted:
        if start > current + min_block:
            free.append((current, start))
        current = max(current, end)

    if current + min_block <= STUDY_END:
        free.append((current, float(STUDY_END)))

    return free


async def fetch_syllabus(uri: str) -> str | None:
    if not uri:
        return None
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(uri, follow_redirects=True)
            if response.status_code == 200:
                return response.text[:8000]
    except Exception as e:
        logger.warning("Failed to fetch syllabus from %s: %s", uri, str(e))
    return None


async def grade_course_difficulty(course: dict) -> float:
    syllabus_text = await fetch_syllabus(course.get("syllabus_uri", ""))

    prompt = f"""
    You are an academic advisor. Grade the difficulty of this university course on a scale of 1 to 10,
    where 1 is very easy and 10 is extremely hard.

    Course: {course['subject']} {course['number']} - {course['name']}
    Instructor: {course.get('instructor', 'Unknown')}
    {"Syllabus excerpt: " + syllabus_text if syllabus_text else "No syllabus available."}

    Respond with only a single number between 1 and 10. No explanation.
    """

    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)
        score = float(re.search(r"\d+(\.\d+)?", response.text).group())
        return min(max(score, 1.0), 10.0)
    except Exception as e:
        logger.warning("Gemini failed to grade course %s: %s", course['name'], str(e))
        return 5.0


def grade_ec_load(ecs: list[dict]) -> float:
    total_hours = 0.0
    for ec in ecs:
        start = parse_time(ec.get("start_times", ""))
        end = parse_time(ec.get("end_times", ""))
        days = ec.get("meeting_times", [])
        if start and end:
            duration = (end.hour + end.minute / 60) - (start.hour + start.minute / 60)
            total_hours += duration * len(days)

    if total_hours < 5:
        return 1.0
    elif total_hours < 10:
        return 1.2
    elif total_hours < 15:
        return 1.4
    else:
        return 1.6


def hours_to_time_str(hours: float) -> str:
    h = int(hours)
    m = int((hours - h) * 60)
    period = "AM" if h < 12 else "PM"
    display_h = h if h <= 12 else h - 12
    if display_h == 0:
        display_h = 12
    return f"{display_h}:{m:02d} {period}"


def allocate_study_slots(
    courses: list[dict],
    difficulties: dict[str, float],
    busy_by_day: dict[str, list[tuple[float, float]]],
    ec_multiplier: float,
) -> dict[str, list[dict]]:
    """Allocate study slots across the week weighted by course difficulty."""
    total_difficulty = sum(difficulties.values()) or 1
    schedule: dict[str, list[dict]] = {day: [] for day in DAY_ORDER}

    # Total available study hours per week
    total_free_hours = sum(
        sum(end - start for start, end in get_free_slots(busy_by_day[day]))
        for day in DAY_ORDER
    )
    available_study_hours = total_free_hours / ec_multiplier

    for course in courses:
        key = f"{course['subject']} {course['number']}"
        difficulty = difficulties.get(key, 5.0)

        course_hours = (difficulty / total_difficulty) * available_study_hours
        hours_remaining = course_hours

        class_days = set(course.get("meeting_days", []))
        preferred_days = [d for d in DAY_ORDER if d not in class_days]
        if not preferred_days:
            preferred_days = DAY_ORDER

        for day in preferred_days:
            if hours_remaining <= 0:
                break

            free_slots = get_free_slots(busy_by_day[day])
            for slot_start, slot_end in free_slots:
                if hours_remaining <= 0:
                    break

                slot_duration = min(slot_end - slot_start, hours_remaining, 2.0)
                if slot_duration < 0.5:
                    continue

                schedule[day].append({
                    "subject": key,
                    "name": course["name"],
                    "start": hours_to_time_str(slot_start),
                    "end": hours_to_time_str(slot_start + slot_duration),
                    "duration_hours": round(slot_duration, 1),
                    "difficulty": round(difficulty, 1),
                })

                busy_by_day[day].append((slot_start, slot_start + slot_duration))
                busy_by_day[day].sort()
                hours_remaining -= slot_duration

    return schedule


@router.get("/{user_id}")
async def get_user_recommendation(
    user_id: str, db: Annotated[AsyncDatabase, Depends(get_db)]
):
    logger.info("Fetching recommendations for user_id: %s", user_id)

    user_courses_doc = await db["Courses"].find_one({"_id": user_id})
    user_ecs_doc = await db["ECs"].find_one({"_id": user_id})

    if not user_courses_doc:
        raise NotFound("No courses found for this user")

    courses = user_courses_doc.get("courses", [])
    ecs = user_ecs_doc.get("ecs", []) if user_ecs_doc else []

    difficulties = {}
    for course in courses:
        key = f"{course['subject']} {course['number']}"
        difficulties[key] = await grade_course_difficulty(course)
        logger.info("Difficulty for %s: %s", key, difficulties[key])

    ec_multiplier = grade_ec_load(ecs)
    logger.info("EC load multiplier: %s", ec_multiplier)

    busy_by_day = get_busy_slots(courses, ecs)

    schedule = allocate_study_slots(courses, difficulties, busy_by_day, ec_multiplier)

    return {
        "data": {
            "schedule": schedule,
            "course_difficulties": difficulties,
            "ec_load_multiplier": ec_multiplier,
        }
    }