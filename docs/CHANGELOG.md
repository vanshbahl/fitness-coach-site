# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [v0.4.1] - Maintenance & Documentation Audit
### Fixed
- Fixed critical onboarding UI bug where selecting 'No Experience' disabled the Continue button.
- Refactored `Step9Review` to properly separate Demographics from Contact Info, fixing an issue where editing Name/City routed the user to the incorrect step.
- Added missing Instagram and WhatsApp fields to the review screen.

### Changed
- Performed a comprehensive documentation audit across the repository.
- Updated UX flows, Database schemas, Roadmap, and Progress files to accurately mirror the current implementation.

---

## [v0.4.0] - End of Phase 3
### Added
- Real backend API connection using Axios and React Query.
- `src/api/client.ts` implementing a generic robust HTTP interceptor.
- Backend routing configured efficiently under `/api/v1/`.

### Changed
- Migrated Assessment Wizard data submission from the `booking.service.ts` mock directly to FastAPI via `POST /api/v1/bookings`.
- Booking Status page now streams live tracking data through `GET /api/v1/bookings/{id}`.
- Refactored `CreateBookingPayload` structure to map reliably to backend Pydantic schema (e.g. `BookingCreate`).
- Gracefully mocked `scheduleSlot` implementation inside `booking.service.ts` to hydrate on top of real backend `BookingResponse` data.

---

## [v0.3.0] - End of Phase 2
### Added
- Slot Booking Experience inspired by Apple Calendar and Linear.
- Interactive weekly calendar component for visually filtering dates.
- Granular Time Slot picker component.
- "Your Profile" summary screen dynamically aggregating all input data.
- Payment Preview screen showcasing mock Razorpay integration layout.

### Changed
- Expanded React Query integration (`useAvailableSlots`, `useScheduleSlot`).
- Refined navigation flow directly from Wizard Step 9 into Checkout.
- Re-architected backend layout introducing strictly typed API interfaces.

---

## [v0.2.0] - End of Phase 1
### Added
- End-to-end Assessment Wizard fully completed.
- Premium onboarding experience featuring immersive emerald glows, fluid morphing footers, and native mobile-first touch interfaces.
- Semantic Progress Indicator expanding to display textual context.
- Advanced Form Validations mapped meticulously via Zod and React Hook Form.
- Framer Motion integrated across the board for zero layout shift (ZLS) transitions.
- Hero Page implemented.

### Changed
- Overhauled initial navigation structure.
- Swapped numerical progress UI with semantic labels.

---

## [v0.1.0] - Initialization
### Added
- FastAPI and SQLAlchemy setup.
- Database architecture for SQLite and PostgreSQL mapped.
- Core Data Models established (`booking`, `availability`, `enums`).
- Initial Frontend Vite/React 19 foundation laid out.
