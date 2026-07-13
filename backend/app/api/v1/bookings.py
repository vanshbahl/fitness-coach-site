from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from uuid import UUID

from app.db.session import get_db
from app.schemas.booking import BookingCreate, BookingUpdate, BookingResponse
from app.services.booking_service import BookingService
from app.core.responses import SuccessResponse

router = APIRouter()

@router.post(
    "", 
    response_model=SuccessResponse[BookingResponse], 
    status_code=status.HTTP_201_CREATED,
    summary="Create a new booking",
    description="Creates a new trial booking assessment payload along with availability preferences."
)
async def create_booking(booking_in: BookingCreate, db: AsyncSession = Depends(get_db)):
    booking = await BookingService.create_booking(db, booking_in)
    return SuccessResponse(data=booking, message="Booking created successfully")

@router.get(
    "", 
    response_model=SuccessResponse[List[BookingResponse]],
    summary="List all bookings",
    description="Retrieve a paginated list of all bookings."
)
async def get_bookings(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    bookings = await BookingService.get_all_bookings(db, skip=skip, limit=limit)
    return SuccessResponse(data=list(bookings))

@router.get(
    "/{booking_id}", 
    response_model=SuccessResponse[BookingResponse],
    summary="Get a single booking",
    description="Retrieve detailed assessment information for a specific booking ID."
)
async def get_booking(booking_id: UUID, db: AsyncSession = Depends(get_db)):
    booking = await BookingService.get_booking(db, booking_id)
    return SuccessResponse(data=booking)

@router.patch(
    "/{booking_id}", 
    response_model=SuccessResponse[BookingResponse],
    summary="Update a booking",
    description="Update internal admin fields or status for a specific booking ID."
)
async def update_booking(booking_id: UUID, booking_in: BookingUpdate, db: AsyncSession = Depends(get_db)):
    booking = await BookingService.update_booking(db, booking_id, booking_in)
    return SuccessResponse(data=booking, message="Booking updated successfully")

@router.delete(
    "/{booking_id}", 
    response_model=SuccessResponse[None],
    summary="Delete a booking",
    description="Permanently delete a booking."
)
async def delete_booking(booking_id: UUID, db: AsyncSession = Depends(get_db)):
    await BookingService.delete_booking(db, booking_id)
    return SuccessResponse(message="Booking deleted successfully")
