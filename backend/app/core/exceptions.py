from fastapi import HTTPException, status

class QuickStrengthException(HTTPException):
    def __init__(self, status_code: int, detail: str):
        super().__init__(status_code=status_code, detail=detail)

class BookingNotFound(QuickStrengthException):
    def __init__(self):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")

class SlotUnavailable(QuickStrengthException):
    def __init__(self):
        super().__init__(status_code=status.HTTP_409_CONFLICT, detail="The selected time slot is no longer available")

class PaymentFailed(QuickStrengthException):
    def __init__(self):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail="Payment verification failed")

class ValidationError(QuickStrengthException):
    def __init__(self, message: str):
        super().__init__(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=message)
