# Backend Architecture

## High-Level Architecture
The backend is a RESTful API serving the frontend SPA and connecting to a managed PostgreSQL database.

## Structure
- **Framework**: FastAPI (Python) for high performance and strict type validation.
- **Database ORM**: SQLAlchemy 2.0 with Alembic for migrations.
- **Data Validation**: Pydantic v2 schemas map directly to the interactive onboarding steps.
- **Strict Layered Design**: Business logic must never reside in FastAPI route handlers.
  1. **Routers Layer**: Exclusively handles HTTP requests, dependency injection, request validation via Pydantic, and returns formatted HTTP responses.
  2. **Service Layer**: Contains pure business logic. Orchestrates operations across multiple models, handles external API calls (e.g., Razorpay), and raises domain exceptions.
  3. **Database Layer**: Defines SQLAlchemy ORM structures and Pydantic validation schemas.
  4. **Core Layer**: Handles shared application configuration, custom exception definitions, and standardized API response formats.

## Request Lifecycle Flow
```mermaid
sequenceDiagram
    participant Client
    participant Router
    participant Service
    participant Database

    Client->>Router: HTTP POST /api/v1/bookings/initiate
    Note over Router: Validates Request (Pydantic)
    Router->>Service: booking_service.create_booking(data)
    Note over Service: Executes Business Logic
    Service->>Database: Creates ORM Model Instance
    Database-->>Service: Returns Saved Entity
    Service-->>Router: Returns Domain Object
    Note over Router: Formats API Response
    Router-->>Client: HTTP 200 OK (SuccessResponse)
```

## Data Flow: Interactive Booking
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant FastAPI
    participant Razorpay
    participant Calendar

    User->>Frontend: Navigates through 10-step wizard
    Frontend->>Frontend: Validates & saves progress in local state
    User->>Frontend: Reviews summary & proceeds to payment
    Frontend->>FastAPI: POST /api/bookings/initiate (Payload + booking_source)
    FastAPI->>Razorpay: Create Order (₹49)
    Razorpay-->>FastAPI: Order ID
    FastAPI-->>Frontend: Return Order ID
    Frontend->>Razorpay: Open Payment Modal
    User->>Razorpay: Completes Payment
    Razorpay-->>Frontend: Payment Success Token
    Frontend->>FastAPI: POST /api/bookings/verify
    FastAPI->>Calendar: Create Calendar Event & Meet Link
    FastAPI->>Resend: Send Confirmation Emails (User & Coach)
    FastAPI-->>Frontend: Success Response
    Frontend-->>User: Show Celebration & Meet Link
```

## Architectural Constraints
Keep architecture intentionally lightweight. **Do not** introduce Redis, Celery, RabbitMQ, Kafka, WebSockets, Background workers, or Microservices. The project should remain simple until scale demands otherwise.

## Deployment Architecture
- **Backend**: Deployed on **Railway**. Handles environment variables securely and scales easily.
- **Database**: **Supabase** (Managed PostgreSQL) for production, providing connection pooling (PgBouncer). Local development uses **SQLite** automatically via environment variables for zero-config onboarding.
