import logging
from pymongo import AsyncMongoClient
from pymongo.asynchronous.database import AsyncDatabase
from typing import AsyncGenerator

from config import settings

logger = logging.getLogger("cometnavigator" + __name__)

client: AsyncMongoClient = None

async def connect_db():
    global client
    try:
        logger.info("Initializing MongoDB connection...")
        client = AsyncMongoClient(settings.DATABASE_URL, serverSelectionTimeoutMS=5000)
        await client.admin.command("ping")
        logger.info("MongoDB connection successful.")
    except Exception as e:
        logger.critical(f"Failed to initialize MongoDB client: {str(e)}")
        raise

async def disconnect_db():
    global client
    if client:
        await client.close()
        logger.info("MongoDB connection closed.")

async def get_db() -> AsyncGenerator[AsyncDatabase, None]:
    try:
        yield client[settings.DATABASE_NAME]
    except Exception as e:
        logger.error(f"Database error: {str(e)}")
        raise