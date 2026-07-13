# API Documentation

## Base URL
`/api/v1`

## Bookings

### POST `/bookings`
Creates a new trial booking assessment payload along with availability preferences.

**Request Body (JSON):**
```json
{
  "name": "Virat Kohli",
  "age": 35,
  "gender": "male",
  "city": "Delhi",
  "whatsapp_number": "+919876543210",
  "instagram_handle": "virat.kohli",
  "height_cm": 175,
  "weight_kg": 74.5,
  "fitness_level": "intermediate",
  "previous_experience": true,
  "goals": ["Build Strength", "Learn Calisthenics"],
  "equipment_available": ["Pull-up Bar"],
  "preferred_duration": "3_months",
  "fee_acknowledgement": true,
  "preferred_days": ["Monday", "Wednesday"],
  "preferred_times": ["Morning"],
  "timezone": "Asia/Kolkata"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": { ... booking details },
  "message": "Booking created successfully"
}
```

### GET `/bookings`
Retrieve a paginated list of all bookings.

**Response (200 OK):**
```json
{
  "success": true,
  "data": [ { ... booking details } ],
  "message": null
}
```

### GET `/bookings/{booking_id}`
Retrieve detailed assessment information for a specific booking ID.

**Response (200 OK):**
```json
{
  "success": true,
  "data": { ... booking details },
  "message": null
}
```

### PATCH `/bookings/{booking_id}`
Update internal admin fields or status for a specific booking ID.

**Request Body (JSON):**
```json
{
  "coach_notes": "VIP Client"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": { ... updated booking details },
  "message": "Booking updated successfully"
}
```

### DELETE `/bookings/{booking_id}`
Permanently delete a booking.

**Response (200 OK):**
```json
{
  "success": true,
  "data": null,
  "message": "Booking deleted successfully"
}
```

## Standard Responses

All API responses follow a standard envelope:

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

**Error:**
```json
{
  "success": false,
  "error": "ErrorType",
  "detail": "Detailed explanation of the error."
}
```
