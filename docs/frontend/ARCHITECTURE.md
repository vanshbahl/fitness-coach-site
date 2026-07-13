# Frontend Architecture

## High-Level Architecture
Quick Strength follows a decoupled, modern web architecture pattern comprising a statically hosted Single Page Application (SPA) designed as an onboarding wizard.

## Structure & Tech Stack
- **Framework**: React 19 with Vite.
- **State Management**: 
  - **Local State**: Context API or React Hook Form to maintain wizard state.
  - **Form Validation**: React Hook Form paired with Zod.
  - **Server State**: TanStack React Query (`useQuery`, `useMutation`) for data fetching, caching, and mutations.
  - **API Layer**: Axios intercepts and normalizes responses (`src/api/client.ts`). React Query hooks communicate with a dedicated Service Layer (`src/services/`), which encapsulates HTTP calls and DTO mappings.
- **Styling**: Tailwind CSS v4 + shadcn/ui. Heavily customized for a premium, minimal aesthetic. 
- **Animations**: Framer Motion handles step transitions, micro-interactions, progress bar fills, shared layout animations (`layoutId`), and the final celebration screens.

## Implemented Features (Phase 1-3)
The frontend currently encompasses the entire onboarding and booking journey:
- **Hero**: Premium dark aesthetics and glassmorphism.
- **Assessment Wizard V1 (Completed)**: Advanced validations, semantic progress indication, persistent application chrome, and dynamic state.
- **Persistent Footer Architecture**: Mobile-first safe-area aware bottom bar that morphs seamlessly into a loading state without remounting.
- **Motion System**: Robust shared layout animations providing visual continuity across routes.
- **Payment Flow (Frontend)**: Mocked payment preview and seamless transition screens.
- **Booking Status Dashboard**: Dynamic UI rendering pending/scheduled states.
- **Slot Booking**: Specialized UI for calendar date and time slot selection.

## Backend Connectivity (Phase 3)
- **Real Data**: The Assessment Wizard successfully creates bookings using `POST /api/v1/bookings` (Axios). The Booking Status page dynamically retrieves that booking via `GET /api/v1/bookings/{id}` directly from the local SQLite/FastAPI database.
- **Remaining Mocked Endpoints**: The Service Layer temporarily handles mocks for features not yet built on the backend. This includes Available Slots retrieval, Slot Scheduling (`POST /schedule`), Payment Gateway processing, Google Calendar integration, and automated emails.

## Deployment Architecture
- **Frontend**: Deployed on **Vercel**. Provides edge caching and instant PR previews.
