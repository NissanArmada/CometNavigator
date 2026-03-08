import contextlib
import logging
from typing import Generator

from fastapi import APIRouter, Depends
from playwright.sync_api import sync_playwright, expect, Browser, Page

from exceptions import Forbidden, InternalServerError
from schemas.scraper import ScraperCredentials


logger = logging.getLogger("cometnavigator." + __name__)

router = APIRouter()


def login(netid: str, password: str) -> tuple[Browser, Page]:
    p = sync_playwright().start()
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto("https://elearning.utdallas.edu/ultra/institution-page")

    logger.info("Attempting to log in to eLearning with netid: %s", netid)

    page.locator("#netid").fill(netid, timeout=10000)
    page.locator("#password").fill(password, timeout=10000)
    page.locator("#submit").click(timeout=10000)

    try:
        logger.info("Waiting for institution page to load after login...")
        expect(page).to_have_title("Institution Page", timeout=10000)
        logger.info("Login successful for netid %s", netid)
        return p, browser, page
    except Exception as e:
        logger.error("Login failed for netid %s: %s", netid, str(e))
        browser.close()
        p.stop()
        raise Forbidden("Login failed")


@router.post("/courses")
def get_courses(credentials: ScraperCredentials):
    logger.info("Received request to get courses for netid %s", credentials.netid)

    p, browser, page = login(credentials.netid, credentials.password)

    try:
        page.goto("https://elearning.utdallas.edu/ultra/course", timeout=10000)

        is_term_expanded = page.locator(
            "//*[@id='courses-overview-filter-terms']"
        ).get_attribute("aria-expanded")
        if is_term_expanded is None:
            page.locator('//*[@id="courses-overview-filter-terms"]').click(
                timeout=10000
            )

        page.locator('//li[contains(text(), "Current Courses")]').click(timeout=1000)
        expect(page.locator("div.element-details.summary").first).to_be_visible(
            timeout=10000
        )

        course_cards = page.locator("div.element-details.summary").all()

        course_ids = []
        for course in course_cards:
            course.locator(".js-course-title-element").wait_for(
                state="visible", timeout=10000
            )
            course_name = course.locator(".js-course-title-element").inner_text()
            course_ids.append(course_name.split("-")[0].strip())
    except Exception as e:
        logger.error("Error while scraping courses for netid %s: %s", credentials.netid, str(e))
        raise InternalServerError("An error occurred while scraping courses")
    finally:
        browser.close()
        p.stop()

    return {"data": course_ids}
