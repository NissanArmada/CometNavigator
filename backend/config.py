import json
from decouple import config
from typing import List


class Settings:
    DATABASE_URL: str = config("DATABASE_URL", default="mongodb://localhost:27017")
    DATABASE_NAME: str = config("DATABASE_NAME", default="cometnavigator")

    FIREBASE_CREDENTIALS = json.loads(
        config("FIREBASE_CREDENTIALS", default="{}")
    )

    ALLOWED_ORIGINS: List[str] = ["*"]  # todo - change this to meteormate.com when site is live
    DEBUG: bool = config("DEBUG", default=False, cast=bool)

    # ai service config
    GEMINI_API_KEY: str = config("GEMINI_API_KEY", default=None)
    GEMINI_MODEL: str = config("GEMINI_MODEL", default="gemini-2.5-flash-lite")
    
    # Nebula key
    NEBULA_API_URL: str = config("NEBULA_API_URL", default="")
    NEBULA_API_KEY: str = config("NEBULA_API_KEY", default="")

    # email config - might not need this at all
    SMTP_HOST: str = config("SMTP_HOST", default="")
    SMTP_PORT: int = config("SMTP_PORT", default=587, cast=int)
    SMTP_USER: str = config("SMTP_USER", default="")
    SMTP_PASSWORD: str = config("SMTP_PASSWORD", default="")

    # cron config (i.e. admin token for cron jobs to perform administrative duties)
    CRON_SECRET: str = config("CRON_SECRET", default="")

    # validation config
    FIRST_NAME_MIN_LEN: int = 2
    FIRST_NAME_MAX_LEN: int = 50
    LAST_NAME_MIN_LEN: int = 2
    LAST_NAME_MAX_LEN: int = 50
    MIN_AGE: int = 16
    MAX_AGE: int = 80



settings = Settings()