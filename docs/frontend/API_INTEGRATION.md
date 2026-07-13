# Frontend API Architecture

This document describes the API layer architecture for the Quick Strength frontend, introduced in Phase 3.

## Layered Architecture

The frontend follows a strictly separated 3-layer architecture for data fetching.

### 1. The Transport Layer (`src/api/client.ts`)
- Utilizes **Axios** as the core HTTP client.
- Configured with `VITE_API_URL` to easily switch between local development and production.
- Contains a global **response interceptor** to normalize errors. All non-2xx responses are caught here and transformed into consistent error strings to simplify component-level handling.

### 2. The Service Layer (`src/services/*.service.ts`)
- Acts as a repository pattern abstracting all specific HTTP requests.
- Maps API payloads and responses to strict TypeScript interfaces (`src/types/api.ts`).
- **Current State:** The backend FastAPI endpoints for booking creation and retrieval (`POST /api/v1/bookings`, `GET /api/v1/bookings/{id}`) are fully implemented and connected. The service layer parses and transforms the frontend payloads into the strict formats required by the backend Pydantic schemas.
- **Mocked Endpoints:** Some features (like Slot selection, Calendar scheduling, and Payments) are still mocked inside the service layer (`slot.service.ts` and parts of `booking.service.ts`). When the real backend endpoints are ready, only the *internals* of these service files change (replacing the mock promise with an `apiClient.post` call). 

### 3. The Hook Layer (`src/hooks/api/*.ts`)
- Utilizes **TanStack React Query** to manage caching, background fetching, and loading states.
- React components NEVER call Axios or Service functions directly. They exclusively call these React Query hooks (e.g., `useCreateBooking()`, `useBookingStatus()`).
- The components react entirely to `isLoading`, `isError`, and `data` properties exposed by the hooks.

## Environment Variables
- `VITE_API_URL`: The base path for API requests.
  - Development: `http://localhost:8000/api/v1`
  - Production: `/api/v1`

## Future Extensions
- **Authentication**: When auth is introduced, JWT Bearer tokens will simply be injected in the `apiClient.interceptors.request.use()` block inside `src/api/client.ts`. No component refactoring will be necessary.
- **Admin Endpoints**: New services (e.g., `admin.service.ts`) should follow the identical pattern.
