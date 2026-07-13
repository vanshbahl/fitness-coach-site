# Database Design

## Overview
The database uses PostgreSQL. For the MVP, the schema is deliberately kept simple, focusing on managing the trial booking lifecycle. 

## Tables

### 1. `users`
Stores information about the coach/admin and potentially future enrolled students. For MVP, mostly used for admin authentication.
- `id` (UUID, Primary Key)
- `email` (String, Unique, Indexed)
- `hashed_password` (String)
- `role` (Enum: `admin`, `client`) - default `client`
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### 2. `trial_bookings`
The core table for the MVP. Tracks the entire lifecycle of a trial session from initiation to completion.
- `id` (UUID, Primary Key)
- `name` (String) - Client's full name
- `email` (String) - Client's email address
- `phone` (String) - Client's WhatsApp/Contact number
- `experience_level` (String) - e.g., Beginner, Intermediate
- `goals` (Text) - Client's fitness goals
- `scheduled_at` (Timestamp, Indexed) - Date and time of the booked slot
- `status` (Enum: `pending`, `paid`, `completed`, `cancelled`, `enrolled`) - default `pending`
- `razorpay_order_id` (String, Nullable, Indexed)
- `razorpay_payment_id` (String, Nullable)
- `amount` (Integer) - Stored in paise (e.g., 4900 for ₹49)
- `calendar_event_id` (String, Nullable) - Google Calendar event ID
- `attendance` (Boolean) - default `false`
- `admin_notes` (Text, Nullable)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## Relationships
- Currently, `trial_bookings` acts mostly as a standalone entity since users don't create accounts to book a trial (guest checkout style). 
- In the future, a `client_id` (Foreign Key to `users.id`) can be added to `trial_bookings` when building the client portal.

## Indexes
- `idx_bookings_scheduled_at`: To quickly fetch upcoming sessions for the dashboard.
- `idx_bookings_order_id`: To quickly look up a booking when Razorpay webhooks or verification endpoints are hit.
- `idx_users_email`: For fast authentication lookups.

## Future Expansion
- `subscriptions`: To handle recurring payments for enrolled students.
- `workout_plans` / `progress_logs`: For the client portal.
- `availability_overrides`: To manage coach availability dynamically via the database instead of just reading Google Calendar free/busy.
