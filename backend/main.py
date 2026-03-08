import logging
import sys

from fastapi import FastAPI, Request
from fastapi.concurrency import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse, RedirectResponse
import uvicorn

from database import connect_db, disconnect_db
from config import settings
from exceptions import AppException
from routes import scraper
from auth.router import router as auth_router


def create_app() -> FastAPI:
    @asynccontextmanager
    async def lifespan(app: FastAPI):
        await connect_db()
        yield
        await disconnect_db()

    app = FastAPI(
        title="CometNavigator API", version="1.0.0", root_path="/api", lifespan=lifespan
    )

    logger = logging.getLogger("cometnavigator")
    logger.setLevel(logging.DEBUG if settings.DEBUG else logging.INFO)

    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(
        logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
    )
    logger.addHandler(handler)

    # Middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Exception handling
    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request, exc: RequestValidationError
    ):
        errors = []
        for error in exc.errors():
            field = error["loc"][-1] if error["loc"] else "unknown"

            if error["type"] == "missing":
                errors.append(f"{field} is required")
            elif error["type"] == "value_error":
                msg = error["msg"]
                if "Email must be a valid @utdallas.edu address" in msg:
                    errors.append("Email must be a valid @utdallas.edu address")
                else:
                    errors.append(f"{field}: {msg}")
            else:
                errors.append(f"{field}: {error['msg']}")

        return JSONResponse(
            status_code=422,
            content={"error": "Validation failed", "details": errors},
        )

    @app.exception_handler(AppException)
    async def app_exception_handler(request: Request, exc: AppException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail},
        )

    # Routes
    app.include_router(scraper.router, prefix="/scraper", tags=["scraper"])
    app.include_router(auth_router, prefix="/auth", tags=["auth"])

    @app.get("")
    async def root_no_slash():
        return RedirectResponse(url="/")

    # Health / root
    @app.get("/")
    async def root():
        return {"message": "CometNavigator backend is online!"}

    @app.get("/health")
    async def health_check():
        return {"status": "Online"}

    return app


app = create_app()

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=settings.DEBUG,
    )
