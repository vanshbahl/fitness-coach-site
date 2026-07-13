from sqlalchemy import String, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base
import uuid
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.booking import Booking

class AvailabilityPreference(Base):
    __tablename__ = "availability_preferences"
    
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    booking_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("bookings.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    preferred_days: Mapped[list[str]] = mapped_column(JSON, nullable=False)
    preferred_times: Mapped[list[str]] = mapped_column(JSON, nullable=False)
    timezone: Mapped[str] = mapped_column(String, nullable=False, default="Asia/Kolkata")
    
    booking: Mapped["Booking"] = relationship("Booking", back_populates="availability_preference")
