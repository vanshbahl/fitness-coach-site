# Next Session Handoff

## Current Project Status
- **Overall Completion:** ~65%
- **Phase:** Phase 3 (Backend Integration)
- **Status:** The frontend is successfully submitting and fetching live data from the FastAPI SQLite database.

## Completed Today
- Finalized Phase 1-2 Frontend flows.
- Connected the `createBooking` and `getBooking` React Query mutations directly to FastAPI via Axios.
- Validated SQLite persistence (`POST /api/v1/bookings` correctly returns `201 Created` and stores the row).
- Updated documentation across the board.

## Known Issues
- `import.meta.env` throws an error if running Node scripts against frontend files natively (this does not affect the Vite browser build, which works flawlessly).
- No major regressions or bugs currently exist.

## Remaining Mocked Services (Frontend Service Layer)
The following backend endpoints do not exist yet and are gracefully mocked via `Promise/setTimeout` in `src/services/`:
1. Slot retrieval logic (`GET /api/v1/availability`)
2. Booking Scheduling (`POST /api/v1/bookings/{id}/schedule`)
3. Razorpay Payment Gateway integration.
4. Google Meet / Google Calendar Event Generation.
5. Email Confirmations (Resend).

## Recommended Order for Next Session
1. Build the Slot Availability backend logic.
2. Build the Scheduling endpoint (`POST /api/v1/bookings/{id}/schedule`).
3. Integrate Razorpay on the backend.
4. Implement Google Calendar link generation.

## Suggested First Task For Tomorrow
**Create the Scheduling API Endpoint**
- **Action:** Open `app/api/v1/bookings.py` and implement a new `POST /{booking_id}/schedule` endpoint.
- **Goal:** Allow users to update their pending booking with the `selected_date` and `selected_time` payload. Remove the `scheduleSlot` mock in the frontend once complete.

## Potential Risks
- **Timezone Complexity:** Ensure `Asia/Kolkata` is universally applied on the backend when determining available slots.
- **Concurrent Slot Booking:** When the actual slot endpoint is built, we need a locking mechanism or validation check to prevent double bookings if two users pick the exact same slot.

## Important Architectural Decisions
- **Graceful Degradation:** The frontend strictly relies on the Service Layer (`src/services/`). Components MUST NOT invoke Axios. This proved invaluable today when hooking up the real backend, as zero React components required modification.
- **SQLAlchemy Enums:** We used strictly mapped Enums in the Database. When parsing payloads from the frontend, fallbacks MUST be implemented in the frontend service layer before the request is dispatched to avoid 422 Unprocessable Entity errors.
