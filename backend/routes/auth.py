import logging
from typing import Annotated

from fastapi import APIRouter, Depends
from pymongo.asynchronous.database import AsyncDatabase
from firebase_admin import auth

from schemas.auth import UserCreate, UserResponse
from database import get_db
from exceptions import Conflict
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
