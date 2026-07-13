# Development Roadmap

## Phase 1: Foundation
- [x] Initialize Git repository
- [x] Setup Frontend (React + Vite + Tailwind + shadcn)
- [x] Setup Backend (FastAPI + SQLAlchemy + Alembic)
- [x] Configure Database (Supabase PostgreSQL / SQLite)
- [ ] Define global design tokens (colors, typography, spacing)

## Phase 2: Interactive Onboarding Wizard (Frontend)
- [ ] Build Wizard state management (Context/Zustand)
- [ ] Create base layout (mobile-first container, progress bar)
- [ ] Develop interactive UI components (Visual sliders, selectable cards, chips)
- [ ] Implement Step 1-10 UI components
- [ ] Add Framer Motion transitions between steps
- [ ] Form validation using Zod for each step

## Phase 3: Booking Backend
- [ ] Develop `trial_bookings` database models and migrations
- [ ] Create FastAPI endpoints to accept full assessment payload
- [ ] Map frontend assessment data to Pydantic schemas

## Phase 4: Payment Integration
- [ ] Integrate Razorpay API on backend (Order Creation & Verification)
- [ ] Build Step 11: Secure Payment UI
- [ ] Handle state transitions on payment success/failure

## Phase 5: Calendar & Success Flow
- [ ] Integrate Google Calendar API (read availability, create events)
- [ ] Implement Resend email confirmations
- [ ] Build Step 12: Success Screen with celebration animations and WhatsApp CTA

## Phase 6: Admin Dashboard
- [ ] Implement JWT Authentication for Admin
- [ ] Build Dashboard Layout (Sidebar, Header)
- [ ] Build interactive Data Table to view rich assessment data
- [ ] Implement Admin actions (Mark attendance, update status, view details)

## Phase 7: Deployment & Polish
- [ ] Mobile responsiveness audit and thumb-reach optimization
- [ ] Performance testing (Lighthouse)
- [ ] Deploy to Vercel (Frontend), Railway (Backend), and Supabase (DB)
