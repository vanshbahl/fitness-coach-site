# API Documentation

## Base URL
`/api/v1`

## Authentication
- **Public Endpoints**: No authentication required.
- **Admin Endpoints**: Require a Bearer Token (JWT) passed in the `Authorization` header.

## Naming Conventions
- URLs should be kebab-case (e.g., `/trial-bookings`).
- JSON payloads should use snake_case (e.g., `razorpay_order_id`), handled automatically by FastAPI/Pydantic configurations.

---

## Public Endpoints

### 1. Get Available Slots
Fetch available time slots for trial bookings based on coach availability.
- **Method**: `GET`
- **Endpoint**: `/availability`
- **Query Params**: `date` (YYYY-MM-DD)
- **Response**:
  ```json
  {
    "date": "2023-11-01",
    "available_slots": ["07:00:00", "08:00:00", "18:00:00"]
  }
  ```

### 2. Initiate Booking
Create a pending booking and generate a Razorpay order.
- **Method**: `POST`
- **Endpoint**: `/bookings/initiate`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "experience_level": "Beginner",
    "goals": "Build muscle and learn handstands",
    "scheduled_at": "2023-11-01T07:00:00Z"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "booking_id": "uuid",
    "razorpay_order_id": "order_abc123",
    "amount": 4900,
    "currency": "INR"
  }
  ```

### 3. Verify Payment
Verify the Razorpay signature, update booking status, and trigger calendar/email tasks.
- **Method**: `POST`
- **Endpoint**: `/bookings/verify`
- **Request Body**:
  ```json
  {
    "booking_id": "uuid",
    "razorpay_order_id": "order_abc123",
    "razorpay_payment_id": "pay_xyz789",
    "razorpay_signature": "signature_hash"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "status": "success",
    "message": "Booking confirmed successfully"
  }
  ```

---

## Admin Endpoints (Requires JWT)

### 1. Admin Login
- **Method**: `POST`
- **Endpoint**: `/auth/login`
- **Request Body**: Form-data with `username` and `password`.
- **Response**: `{"access_token": "jwt", "token_type": "bearer"}`

### 2. Get All Bookings
- **Method**: `GET`
- **Endpoint**: `/admin/bookings`
- **Query Params**: `status`, `page`, `limit`
- **Response**: Array of booking objects.

### 3. Update Booking (Attendance/Notes/Status)
- **Method**: `PATCH`
- **Endpoint**: `/admin/bookings/{booking_id}`
- **Request Body**:
  ```json
  {
    "attendance": true,
    "admin_notes": "Great potential, wants to enroll.",
    "status": "enrolled"
  }
  ```
- **Response**: Updated booking object.
