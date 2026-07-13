import logging
from typing import Sequence
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.models.booking import Booking
from app.models.availability import AvailabilityPreference
from app.schemas.booking import BookingCreate, BookingUpdate
from app.core.exceptions import BookingNotFound, ValidationError

logger = logging.getLogger(__name__)

class BookingService:
    @staticmethod
    async def create_booking(db: AsyncSession, booking_in: BookingCreate) -> Booking:
        try:
            # Extract availability fields
            avail_data = {
                "preferred_days": booking_in.preferred_days,
                "preferred_times": booking_in.preferred_times,
                "timezone": booking_in.timezone
            }
            
            # The rest of the data goes to Booking
            booking_data = booking_in.model_dump(exclude={"preferred_days", "preferred_times", "timezone"})
            
            db_booking = Booking(**booking_data)
            db.add(db_booking)
            await db.flush() # To get the booking ID
            
            db_avail = AvailabilityPreference(**avail_data, booking_id=db_booking.id)
            db.add(db_avail)
            
            await db.commit()
            await db.refresh(db_booking)
            
            # Eagerly load the relationship for the response
            result = await db.execute(
                select(Booking)
                .options(selectinload(Booking.availability_preference), selectinload(Booking.payment))
                .where(Booking.id == db_booking.id)
            )
            return result.scalar_one()
        except Exception as e:
            await db.rollback()
            logger.error(f"Error creating booking: {str(e)}")
            raise e

    @staticmethod
    async def get_booking(db: AsyncSession, booking_id: UUID) -> Booking:
        result = await db.execute(
            select(Booking)
            .options(selectinload(Booking.availability_preference), selectinload(Booking.payment))
            .where(Booking.id == booking_id)
        )
        booking = result.scalar_one_or_none()
        if not booking:
            raise BookingNotFound()
        return booking

    @staticmethod
    async def get_all_bookings(db: AsyncSession, skip: int = 0, limit: int = 100) -> Sequence[Booking]:
        result = await db.execute(
            select(Booking)
            .options(selectinload(Booking.availability_preference), selectinload(Booking.payment))
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()

    @staticmethod
    async def update_booking(db: AsyncSession, booking_id: UUID, booking_in: BookingUpdate) -> Booking:
        booking = await BookingService.get_booking(db, booking_id)
        
        update_data = booking_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(booking, field, value)
            
        try:
            await db.commit()
            await db.refresh(booking)
            return booking
        except Exception as e:
            await db.rollback()
            logger.error(f"Error updating booking: {str(e)}")
            raise e

    @staticmethod
    async def delete_booking(db: AsyncSession, booking_id: UUID) -> bool:
        booking = await BookingService.get_booking(db, booking_id)
        try:
            await db.delete(booking)
            await db.commit()
            return True
        except Exception as e:
            await db.rollback()
            logger.error(f"Error deleting booking: {str(e)}")
            raise e
