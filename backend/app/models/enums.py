import enum

class Gender(str, enum.Enum):
    male = "male"
    female = "female"
    other = "other"
    prefer_not_to_say = "prefer_not_to_say"

class FitnessLevel(str, enum.Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"

class TrainingLevel(str, enum.Enum):
    complete_beginner = "Complete Beginner"
    basic_beginner = "Basic Beginner"
    advanced_beginner = "Advanced Beginner"
    intermediate = "Intermediate"
    advanced = "Advanced"

class CoachingDuration(str, enum.Enum):
    one_month = "1_month"
    three_months = "3_months"
    six_months = "6_months"

class BookingStatus(str, enum.Enum):
    pending = "pending"
    paid = "paid"
    completed = "completed"
    cancelled = "cancelled"
    enrolled = "enrolled"

class PaymentStatus(str, enum.Enum):
    pending = "pending"
    success = "success"
    failed = "failed"
    refunded = "refunded"

class TrialOutcome(str, enum.Enum):
    pending = "pending"
    no_show = "no_show"
    not_interested = "not_interested"
    enrolled = "enrolled"

class UserRole(str, enum.Enum):
    admin = "admin"
