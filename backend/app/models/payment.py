from sqlalchemy import String, Integer, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base
import uuid
from app.models.enums import PaymentStatus
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.booking import Booking

class Payment(Base):
    __tablename__ = "payments"
    
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    booking_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("bookings.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    razorpay_order_id: Mapped[str | None] = mapped_column(String, index=True, nullable=True)
    razorpay_payment_id: Mapped[str | None] = mapped_column(String, nullable=True)
    amount_paid: Mapped[int] = mapped_column(Integer, default=4900, nullable=False)
    status: Mapped[PaymentStatus] = mapped_column(SQLEnum(PaymentStatus), default=PaymentStatus.pending, nullable=False)
    
    booking: Mapped["Booking"] = relationship("Booking", back_populates="payment")
