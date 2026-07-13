from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import DateTime
from sqlalchemy.sql import func
from datetime import datetime

class Base(DeclarativeBase):
    """
    Base class for all SQLAlchemy 2.0 ORM models.
    Provides created_at and updated_at timestamp columns automatically.
    """
    
    # Auto-generated timestamps for auditing
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now()
    )
    
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now(), 
        onupdate=func.now()
    )

# Register models for Alembic autogenerate
from app.models import User, Booking, Payment, AvailabilityPreference

