import contextlib
import logging
from typing import Generator

from fastapi import APIRouter, Depends
from playwright.sync_api import sync_playwright, expect, Browser, Page

from schemas.scraper import ScraperCredentials


logger = logging.getLogger("cometnavigator." + __name__)

router = APIRouter()

@contextlib.contextmanager
def login(netid: str, password: str) -> Generator[tuple[Browser, Page], None, None]:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://elearning.utdallas.edu/ultra/institution-page")
        page.locator("#netid").fill(netid, timeout=10000)
        page.locator("#password").fill(password, timeout=10000)
        page.locator("#submit").click(timeout=10000)

        try:
            expect(page).to_have_title("Institution Page", timeout=10000)

            yield browser, page
            return
        except Exception as e:
            logger.error(f"Login failed for netid {netid}: {str(e)}")
            browser.close()
            raise Exception("Login failed")


@router.post("/courses")
def get_courses(credentials: ScraperCredentials):
    logger.info(f"Received request to get courses for netid {credentials.netid}")
    
    with login(credentials.netid, credentials.password) as (browser, page):
        page.goto("https://elearning.utdallas.edu/ultra/course", timeout=10000)
        
        is_term_expanded = page.locator("//*[@id='courses-overview-filter-terms']").get_attribute('aria-expanded')
        if is_term_expanded is None:
            page.locator('//*[@id="courses-overview-filter-terms"]').click(timeout=10000)
        
        page.locator('//li[contains(text(), "Current Courses")]').click(timeout=1000)
        course_cards = page.locator('div.element-details.summary').all();
        
        course_names = []
        for course in course_cards:
            course_name = course.locator('.js-course-title-element').inner_text()
            course_names.append(course_name)
        
        browser.close()
    
    return {"data": course_names}
