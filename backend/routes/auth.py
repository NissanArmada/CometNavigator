import logging
import smtplib
import random
from typing import Annotated
from datetime import datetime, timezone
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from fastapi import APIRouter, Depends
from pymongo.asynchronous.database import AsyncDatabase
from firebase_admin import auth

from schemas.auth import UserCreate, UserRequestVerify, UserResponse, UserVerifyCode
from database import get_db
from exceptions import BadRequest, Conflict, InternalServerError, NotFound
from config import settings

logger = logging.getLogger("cometnavigator." + __name__)

router = APIRouter()


@router.post("/register", response_model=UserResponse)
async def register_user(
    user: UserCreate, db: Annotated[AsyncDatabase, Depends(get_db)]
):
    if await db["Users"].find_one(
        {"$or": [{"netid": user.netid}, {"email": user.email}]}
    ):
        logger.warning("user tried to create an account with an existing email in DB")
        raise Conflict("Account already exists")

    firebase_user = None

    try:
        firebase_user = auth.create_user(
            email=user.email, password=user.password, email_verified=False
        )

        new_user = {
            "_id": firebase_user.uid,
            "email": user.email,
            "netid": user.netid,
        }

        await db["Users"].insert_one(new_user)

        created_user = await db["Users"].find_one({"_id": firebase_user.uid})
        return created_user

    except Exception:
        if firebase_user is not None:
            try:
                auth.delete_user(firebase_user.uid)
                logger.info(
                    f"Rolled back Firebase user {firebase_user.uid} after DB failure"
                )
            except Exception:
                logger.error(
                    "Failed to rollback Firebase user", exc_info=settings.DEBUG
                )

        raise


@router.post("/send-verification")
async def send_verification(
    body: UserRequestVerify,
    db: Annotated[AsyncDatabase, Depends(get_db)],
):
    try:
        firebase_user = auth.get_user_by_email(body.email)
    except auth.UserNotFoundError:
        logger.warning("Verification requested for non-existent email: %s", body.email)
        raise Conflict("No account associated with this email")

    code = str(random.randint(100000, 999999))

    await db["VerificationCodes"].update_one(
        {"_id": firebase_user.uid},
        {"$set": {"code": code, "created_at": datetime.now(timezone.utc)}},
        upsert=True,
    )

    try:
        msg = MIMEMultipart()
        msg["From"] = settings.SMTP_USER
        msg["To"] = body.email
        msg["Subject"] = "Your Verification Code"

        msg.attach(MIMEText(f"Your verification code is: {code}", "plain"))

        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as smtp:
            smtp.starttls()
            smtp.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            smtp.sendmail(settings.SMTP_USER, body.email, msg.as_string())

        logger.info("Verification code sent to %s", body.email)

    except Exception as e:
        logger.error("Failed to send verification email: %s", str(e))
        raise InternalServerError("Failed to send verification email")

    return {"message": "Verification code sent"}


@router.post("/verify")
async def verify_code(
    body: UserVerifyCode,
    db: Annotated[AsyncDatabase, Depends(get_db)],
):
    try:
        firebase_user = auth.get_user_by_email(body.email)
    except auth.UserNotFoundError:
        logger.warning("Verification attempted for non-existent email: %s", body.email)
        raise Conflict("No account associated with this email")

    record = await db["VerificationCodes"].find_one({"_id": firebase_user.uid})

    if not record:
        logger.warning("No verification code found for uid: %s", firebase_user.uid)
        raise NotFound("No verification code found, please request a new one")

    age = datetime.now(timezone.utc) - record["created_at"].replace(tzinfo=timezone.utc)
    if age.total_seconds() > 600:
        logger.warning("Expired verification code used for uid: %s", firebase_user.uid)
        raise BadRequest("Verification code has expired, please request a new one")

    if record["code"] != body.code:
        logger.warning("Invalid verification code for uid: %s", firebase_user.uid)
        raise BadRequest("Invalid verification code")

    auth.update_user(firebase_user.uid, email_verified=True)
    await db["VerificationCodes"].delete_one({"_id": firebase_user.uid})

    logger.info("Email verified for uid: %s", firebase_user.uid)
    return {"message": "Email verified successfully"}
