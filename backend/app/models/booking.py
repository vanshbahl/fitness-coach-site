from sqlalchemy import String, Integer, Float, Boolean, Text, JSON, DateTime, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base
import uuid
from datetime import datetime
from app.models.enums import Gender, FitnessLevel, TrainingLevel, CoachingDuration, BookingStatus, TrialOutcome
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.payment import Payment
    from app.models.availability import AvailabilityPreference

class Booking(Base):
    __tablename__ = "bookings"
    
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    
    # Personal Information
    name: Mapped[str] = mapped_column(String, nullable=False)
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    gender: Mapped[Gender] = mapped_column(SQLEnum(Gender), nullable=False)
    city: Mapped[str] = mapped_column(String, nullable=False)
    country: Mapped[str] = mapped_column(String(2), nullable=False, default="IN")
    country_code: Mapped[str] = mapped_column(String, nullable=False)
    national_number: Mapped[str] = mapped_column(String, index=True, nullable=False)
    instagram_handle: Mapped[str | None] = mapped_column(String, nullable=True)
    
    # Body Metrics
    height_cm: Mapped[int] = mapped_column(Integer, nullable=False)
    weight_kg: Mapped[float] = mapped_column(Float, nullable=False)
    
    # Fitness Profile
    fitness_level: Mapped[FitnessLevel] = mapped_column(SQLEnum(FitnessLevel), nullable=False)
    training_level: Mapped[TrainingLevel] = mapped_column(SQLEnum(TrainingLevel), nullable=False, server_default="complete_beginner")
    previous_experience: Mapped[bool] = mapped_column(Boolean, nullable=False)
    injuries: Mapped[str | None] = mapped_column(Text, nullable=True)
    current_routine: Mapped[str | None] = mapped_column(Text, nullable=True)
    
    # JSON Multi-Select Fields
    goals: Mapped[list[str]] = mapped_column(JSON, nullable=False)
    equipment_available: Mapped[list[str]] = mapped_column(JSON, nullable=False)
    
    # Coaching
    preferred_duration: Mapped[CoachingDuration] = mapped_column(SQLEnum(CoachingDuration), nullable=False)
    fee_acknowledgement: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    
    # Status & Internal Fields
    booking_status: Mapped[BookingStatus] = mapped_column(SQLEnum(BookingStatus), default=BookingStatus.pending, nullable=False)
    trial_outcome: Mapped[TrialOutcome] = mapped_column(SQLEnum(TrialOutcome), default=TrialOutcome.pending, nullable=False)
    scheduled_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), index=True, nullable=True)
    calendar_event_id: Mapped[str | None] = mapped_column(String, nullable=True)
    meeting_link: Mapped[str | None] = mapped_column(String, nullable=True)
    attendance: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    coach_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    follow_up_date: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    payment: Mapped["Payment"] = relationship("Payment", back_populates="booking", cascade="all, delete-orphan", uselist=False)
    availability_preference: Mapped["AvailabilityPreference"] = relationship("AvailabilityPreference", back_populates="booking", cascade="all, delete-orphan", uselist=False)

    @property
    def full_phone_number(self) -> str:
        return f"{self.country_code}{self.national_number}"
