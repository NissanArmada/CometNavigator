import logging
from concurrent.futures import ThreadPoolExecutor, as_completed

from fastapi import APIRouter
from playwright.sync_api import sync_playwright, expect, Browser, Page, Playwright
import requests

from exceptions import Forbidden, InternalServerError
from schemas.scraper import ScraperCredentials
from config import settings


logger = logging.getLogger("cometnavigator." + __name__)

router = APIRouter()


def login(netid: str, password: str) -> tuple[Playwright, Browser, Page]:
    p = sync_playwright().start()
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto("https://elearning.utdallas.edu/ultra/institution-page")

    logger.info("Attempting to log in to eLearning with netid: %s", netid)

    page.locator("#netid").fill(netid, timeout=10000)
    page.locator("#password").fill(password, timeout=10000)
    page.locator("#submit").click(timeout=10000)

    try:
        expect(page).to_have_title("Institution Page", timeout=10000)
        logger.info("Login successful for netid %s", netid)
        return p, browser, page
    except Exception as e:
        logger.error("Login failed for netid %s: %s", netid, str(e))
        browser.close()
        p.stop()
        raise Forbidden("Login failed")


def scrape_courses(page: Page) -> list[dict]:
    page.goto("https://elearning.utdallas.edu/ultra/course", timeout=10000)

    is_term_expanded = page.locator(
        "//*[@id='courses-overview-filter-terms']"
    ).get_attribute("aria-expanded")
    if is_term_expanded is None:
        page.locator('//*[@id="courses-overview-filter-terms"]').click(timeout=10000)

    page.locator('//li[contains(text(), "Current Courses")]').click(timeout=1000)
    expect(page.locator("div.element-details.summary").first).to_be_visible(
        timeout=10000
    )

    courses = []
    for course in page.locator("div.element-details.summary").all():
        course.locator(".js-course-title-element").wait_for(
            state="visible", timeout=10000
        )
        course_data = course.locator(".js-course-title-element").inner_text()
        course_instructor = course.locator(".instructors").inner_text()

        parts = course_data.split("-")
        course_id, course_name, course_sem = (
            parts[0].strip(),
            parts[1].strip(),
            parts[2].strip(),
        )
        subject, number_section = course_id.split(" ")
        number, section = number_section.split(".")

        courses.append(
            {
                "subject": subject,
                "number": number,
                "section": section,
                "name": course_name,
                "semester": course_sem,
                "instructor": course_instructor,
            }
        )

    return courses


def fetch_section_details(course: dict) -> dict:
    nebula_headers = {"x-api-key": settings.NEBULA_API_KEY}
    reversed_sem = course["semester"][1:3] + course["semester"][0]

    response = requests.get(
        f'{settings.NEBULA_API_URL}/course?course_number={course["number"]}&subject_prefix={course["subject"]}',
        headers=nebula_headers,
    )
    if not response.ok:
        logger.warning(
            "Failed to fetch course %s %s: %s",
            course["subject"],
            course["number"],
            response.status_code,
        )
        raise InternalServerError("Failed to fetch course details from Nebula API")

    sections = response.json()["data"][-1]["sections"]

    def fetch_section(section_id: str) -> dict | None:
        res = requests.get(
            f"{settings.NEBULA_API_URL}/section/{section_id}",
            headers=nebula_headers,
        )
        if not res.ok:
            logger.warning(
                "Failed to fetch section %s: %s", section_id, res.status_code
            )
            return None
        data = res.json()["data"]
        if (
            data["section_number"] == course["section"]
            and data["academic_session"]["name"] == reversed_sem
        ):
            return data
        return None

    with ThreadPoolExecutor() as executor:
        futures = {executor.submit(fetch_section, s): s for s in sections}
        for future in as_completed(futures):
            data = future.result()
            if data:
                meetings = data["meetings"][0]
                return {
                    **course,
                    "meeting_days": meetings["meeting_days"],
                    "start_time": meetings["start_time"],
                    "end_time": meetings["end_time"],
                    "location": meetings["location"],
                    "syllabus_uri": data["syllabus_uri"],
                }

    return course


@router.post("/courses")
def get_courses(credentials: ScraperCredentials):
    logger.info("Received request to get courses for netid %s", credentials.netid)

    p, browser, page = login(credentials.netid, credentials.password)
    try:
        courses = scrape_courses(page)
    except Exception as e:
        logger.error(
            "Error scraping courses for netid %s: %s", credentials.netid, str(e)
        )
        raise InternalServerError("An error occurred while scraping courses")
    finally:
        browser.close()
        p.stop()

    with ThreadPoolExecutor() as executor:
        futures = {
            executor.submit(fetch_section_details, course): course for course in courses
        }
        enriched = []
        for future in as_completed(futures):
            enriched.append(future.result())

    return {"data": enriched}
