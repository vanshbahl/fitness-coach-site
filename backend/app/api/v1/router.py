from fastapi import APIRouter
from app.api.v1 import bookings, availability, payments, admin

api_router = APIRouter()

api_router.include_router(bookings.router, prefix="/bookings", tags=["bookings"])
api_router.include_router(availability.router, prefix="/availability", tags=["availability"])
api_router.include_router(payments.router, prefix="/payments", tags=["payments"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
