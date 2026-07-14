import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router

# Configure basic logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    """
    logger.info("Starting up Quick Strength API...")
    # Startup logic (e.g., verifying DB connection) could go here
    yield
    logger.info("Shutting down Quick Strength API...")
    # Shutdown logic (e.g., closing connections, cleaning up) could go here

# Initialize FastAPI application
app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    lifespan=lifespan
)

# Set up CORS middleware
# Combine settings origins with required production/local origins
origins = [
    "https://quick-strength-by-vector.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:8000"
]

if settings.BACKEND_CORS_ORIGINS:
    origins.extend([str(origin) for origin in settings.BACKEND_CORS_ORIGINS])

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(set(origins)),
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.responses import JSONResponse
from fastapi import status
from fastapi.exceptions import RequestValidationError
from app.core.exceptions import QuickStrengthException
from app.core.responses import ErrorResponse

# Include main API router
app.include_router(api_router, prefix="/api/v1")

@app.exception_handler(QuickStrengthException)
async def custom_exception_handler(request, exc: QuickStrengthException):
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(success=False, error=exc.__class__.__name__, detail=exc.detail).model_dump()
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=ErrorResponse(success=False, error="ValidationError", detail=str(exc.errors())).model_dump()
    )

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/", include_in_schema=False)
async def root():
    """
    Redirect root to an informational message.
    """
    return {
        "message": "Welcome to the Quick Strength API.",
        "docs_url": "/docs"
    }
