from fastapi import APIRouter
from app.api.endpoints import health

api_router = APIRouter()

# Include feature-specific routers here
api_router.include_router(health.router, prefix="/health", tags=["health"])
# api_router.include_router(bookings.router, prefix="/bookings", tags=["bookings"])
