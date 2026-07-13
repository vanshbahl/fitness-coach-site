# Architecture

## High-Level Architecture
Quick Strength follows a decoupled, modern web architecture pattern comprising a statically hosted Single Page Application (SPA) designed as an onboarding wizard, a RESTful API backend, and a managed PostgreSQL database.

```mermaid
graph TD
    Client[Web Browser - Mobile First] -->|HTTPS| Frontend[Vercel: React SPA Wizard]
    Client -->|REST API| Backend[Railway: FastAPI]
    Backend -->|SQLAlchemy| DB[(Supabase PostgreSQL / SQLite)]
    Backend -->|API| Razorpay[Razorpay Gateway]
    Backend -->|API| Calendar[Google Calendar API]
    Backend -->|API| Resend[Resend Email API]
```

## Frontend Architecture (The Onboarding Wizard)
- **Framework**: React 19 with Vite.
- **State Management**: 
  - **Local State**: Context API or Zustand to maintain the onboarding wizard state across steps without losing data.
  - **Form Validation**: React Hook Form paired with Zod, validating step-by-step.
  - **Server State**: TanStack Query for data fetching (like fetching available slots) and mutations.
- **Styling**: Tailwind CSS v4 + shadcn/ui. Heavily customized for a premium, minimal aesthetic. 
- **Animations**: Framer Motion is critical here. It handles step transitions, micro-interactions, progress bar fills, and the final celebration screen.

## Backend Architecture
- **Framework**: FastAPI (Python) for high performance and strict type validation.
- **Database ORM**: SQLAlchemy 2.0 with Alembic for migrations.
- **Data Validation**: Pydantic v2 schemas map directly to the interactive onboarding steps.
- **Strict Layered Design**: Business logic must never reside in FastAPI route handlers.
  1. **Routers Layer (`app/api/v1/`)**: Exclusively handles HTTP requests, dependency injection, request validation via Pydantic, and returns formatted HTTP responses.
  2. **Service Layer (`app/services/`)**: Contains pure business logic. Orchestrates operations across multiple models, handles external API calls (e.g., Razorpay), and raises domain exceptions.
  3. **Database Layer (`app/models/`, `app/schemas/`)**: Defines SQLAlchemy ORM structures and Pydantic validation schemas.
  4. **Core Layer (`app/core/`)**: Handles shared application configuration, custom exception definitions, and standardized API response formats.

### Request Lifecycle Flow
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
    Frontend->>FastAPI: POST /api/bookings/initiate (Sends full assessment payload)
    FastAPI->>Razorpay: Create Order (₹49)
    Razorpay-->>FastAPI: Order ID
    FastAPI-->>Frontend: Return Order ID
    Frontend->>Razorpay: Open Payment Modal
    User->>Razorpay: Completes Payment
    Razorpay-->>Frontend: Payment Success Token
    Frontend->>FastAPI: POST /api/bookings/verify
    FastAPI->>Calendar: Create Calendar Event
    FastAPI-->>Frontend: Success Response
    Frontend-->>User: Show Celebration & WhatsApp Join Link
```

## Deployment Architecture
- **Frontend**: Deployed on **Vercel**. Provides edge caching and instant PR previews.
- **Backend**: Deployed on **Railway**. Handles environment variables securely and scales easily.
- **Database**: **Supabase** (Managed PostgreSQL) for production, providing connection pooling (PgBouncer). Local development uses **SQLite** automatically via environment variables for zero-config onboarding.
