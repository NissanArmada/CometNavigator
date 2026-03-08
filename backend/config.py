import json
from decouple import config
from typing import List


class Settings:
    DATABASE_URL: str = config("DATABASE_URL")
    DATABASE_NAME: str = config("DATABASE_NAME")

    # FIREBASE_CREDENTIALS = json.loads(
    #     config("FIREBASE_CREDENTIALS", default="{}")
    # )

    ALLOWED_ORIGINS: List[str] = ["*"]  # todo - change this to meteormate.com when site is live
    DEBUG: bool = config("DEBUG", default=False, cast=bool)

    # ai service config
    GEMINI_API_KEY: str = config("GEMINI_API_KEY", default=None)
    GEMINI_MODEL: str = config("GEMINI_MODEL", default="gemini-2.5-flash-lite")

    # email config - might not need this at all
    SMTP_SERVER: str = config("SMTP_SERVER", default="")
    SMTP_PORT: int = config("SMTP_PORT", default=587, cast=int)
    EMAIL_USER: str = config("EMAIL_USER", default="")
    EMAIL_PASSWORD: str = config("EMAIL_PASSWORD", default="")

    # cron config (i.e. admin token for cron jobs to perform administrative duties)
    CRON_SECRET: str = config("CRON_SECRET", default="")

    # validation config
    FIRST_NAME_MIN_LEN: int = 2
    FIRST_NAME_MAX_LEN: int = 50
    LAST_NAME_MIN_LEN: int = 2
    LAST_NAME_MAX_LEN: int = 50
    MIN_AGE: int = 16
    MAX_AGE: int = 80

    # Firebase REST client keys
    FIREBASE_API_KEY: str = config("FIREBASE_API_KEY", default="")
    FIREBASE_AUTH_DOMAIN: str = config("FIREBASE_AUTH_DOMAIN", default="")
    FIREBASE_PROJECT_ID: str = config("FIREBASE_PROJECT_ID", default="")
    FIREBASE_STORAGE_BUCKET: str = config("FIREBASE_STORAGE_BUCKET", default="")
    FIREBASE_MESSAGING_SENDER_ID: str = config("FIREBASE_MESSAGING_SENDER_ID", default="")
    FIREBASE_APP_ID: str = config("FIREBASE_APP_ID", default="")
    FIREBASE_MEASUREMENT_ID: str = config("FIREBASE_MEASUREMENT_ID", default="")



settings = Settings()