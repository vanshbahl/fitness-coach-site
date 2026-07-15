from pydantic import BaseModel, Field, field_validator, ConfigDict
from pydantic_core.core_schema import ValidationInfo
from typing import List, Optional
from datetime import datetime
from uuid import UUID
import phonenumbers
from app.models.enums import Gender, FitnessLevel, TrainingLevel, CoachingDuration, BookingStatus, TrialOutcome

class BookingBase(BaseModel):
    # Personal Info
    name: str = Field(..., min_length=2, max_length=100)
    age: int = Field(..., ge=12, le=100)
    gender: Gender
    city: str = Field(..., min_length=2, max_length=100)
    country: str = Field(..., min_length=2, max_length=2)
    country_code: str = Field(..., min_length=1)
    national_number: str = Field(..., min_length=6, max_length=15)
    instagram_handle: Optional[str] = Field(None, max_length=50)
    
    # Body Metrics
    height_cm: int = Field(..., ge=100, le=250)
    weight_kg: float = Field(..., ge=30, le=200)
    
    # Fitness Profile
    fitness_level: FitnessLevel
    training_level: TrainingLevel
    previous_experience: bool
    injuries: Optional[str] = Field(None, max_length=500)
    current_routine: Optional[str] = Field(None, max_length=1000)
    
    # Multi-select
    goals: List[str] = Field(..., min_length=1)
    equipment_available: List[str] = Field(..., min_length=1)
    
    # Coaching
    preferred_duration: CoachingDuration
    fee_acknowledgement: bool
    
    @field_validator('instagram_handle')
    @classmethod
    def strip_at_symbol(cls, v: Optional[str]) -> Optional[str]:
        if v and v.startswith('@'):
            return v[1:]
        return v
        
    @field_validator('fee_acknowledgement')
    @classmethod
    def validate_fee_acknowledgement(cls, v: bool) -> bool:
        if not v:
            raise ValueError("Fee acknowledgement must be true.")
        return v
        
    @field_validator('national_number')
    @classmethod
    def validate_phone(cls, v: str, info: ValidationInfo) -> str:
        country = info.data.get('country')
        if not country:
            return v
        try:
            parsed = phonenumbers.parse(v, country)
            if not phonenumbers.is_valid_number(parsed):
                raise ValueError("Invalid phone number for the given country.")
        except phonenumbers.NumberParseException:
            # Fallback to basic generic validation if parse fails
            if not (6 <= len(v) <= 15 and v.isdigit()):
                raise ValueError("Invalid phone number format.")
        return v

class BookingCreate(BookingBase):
    # Availability
    preferred_days: List[str] = Field(..., min_length=1)
    preferred_times: List[str] = Field(..., min_length=1)
    timezone: str = Field(default="Asia/Kolkata")
    
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "name": "Virat Kohli",
                "age": 35,
                "gender": "male",
                "city": "Delhi",
                "country": "IN",
                "country_code": "+91",
                "national_number": "9876543210",
                "instagram_handle": "virat.kohli",
                "height_cm": 175,
                "weight_kg": 74.5,
                "fitness_level": "intermediate",
                "training_level": "Intermediate",
                "previous_experience": True,
                "injuries": "None",
                "current_routine": "Gym 4x a week",
                "goals": ["Build Strength", "Learn Calisthenics"],
                "equipment_available": ["Pull-up Bar", "Gym Access"],
                "preferred_duration": "3_months",
                "fee_acknowledgement": True,
                "preferred_days": ["Monday", "Wednesday", "Friday"],
                "preferred_times": ["Morning"],
                "timezone": "Asia/Kolkata"
            }
        }
    )

class BookingUpdate(BaseModel):
    # For updating status / internal fields by admin
    booking_status: Optional[BookingStatus] = None
    trial_outcome: Optional[TrialOutcome] = None
    scheduled_at: Optional[datetime] = None
    calendar_event_id: Optional[str] = None
    meeting_link: Optional[str] = None
    attendance: Optional[bool] = None
    coach_notes: Optional[str] = None
    follow_up_date: Optional[datetime] = None

class AvailabilityPreferenceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    preferred_days: List[str]
    preferred_times: List[str]
    timezone: str

class PaymentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    amount_paid: int
    status: str

class BookingResponse(BookingBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: UUID
    booking_status: BookingStatus
    trial_outcome: TrialOutcome
    scheduled_at: Optional[datetime]
    calendar_event_id: Optional[str]
    meeting_link: Optional[str]
    attendance: bool
    coach_notes: Optional[str]
    follow_up_date: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    
    full_phone_number: str
    
    availability_preference: Optional[AvailabilityPreferenceResponse] = None
    payment: Optional[PaymentResponse] = None

class BookingListResponse(BaseModel):
    bookings: List[BookingResponse]
