# Development Roadmap

## Phase 1: Foundation
- [x] Initialize Git repository
- [x] Setup Frontend (React + Vite + Tailwind + shadcn)
- [x] Setup Backend (FastAPI + SQLAlchemy + Alembic)
- [x] Configure Database (Supabase PostgreSQL / SQLite)
- [x] Define global design tokens (colors, typography, spacing)

## Phase 2: Frontend Setup
- [x] Initialize React 19 + Vite + TypeScript project
- [x] Configure Tailwind CSS v4 and `shadcn/ui`
- [x] Set up Framer Motion for animations
- [x] Implement routing with React Router v7
- [x] Implement responsive app layout and theme provider
- [x] Build landing page (Hero, Floating Nav)
- [x] Build multi-step onboarding wizard
- [x] Form validation using Zod for each step

## Phase 3: Booking Backend
- [x] Develop `trial_bookings` database models and migrations
- [x] Create FastAPI endpoints to accept full assessment payload
- [x] Map frontend assessment data to Pydantic schemas

## Phase 4: Payment & Scheduling Integration
- [ ] Integrate Razorpay API on backend (Order Creation & Verification)
- [x] Build Payment UI (Payment occurs BEFORE slot confirmation)
- [x] Build Slot Selection UI
- [ ] Handle state transitions on payment success and slot confirmation

## Phase 5: Calendar, Meets & Email Flow
- [ ] Integrate Google Calendar API (create events, generate Meet link)
- [ ] Integrate Resend for Confirmation Emails (User & Coach)
- [ ] Build Success Screen with celebration animations

## Phase 6: Admin Dashboard (Lightweight V1)
- [ ] Implement JWT Authentication for Admin
- [ ] Build Dashboard Layout (Sidebar, Header)
- [ ] Build Data Table to view Bookings, Payment Status, Calendar Status, and Coach Notes
- [ ] Implement Admin actions (Search, Filters, View details)

## Phase 7: Deployment & Polish
- [ ] Mobile responsiveness audit and thumb-reach optimization
- [ ] Performance testing (Lighthouse)
- [ ] Deploy to Vercel (Frontend), Railway (Backend), and Supabase (DB)

## Future Enhancements (Version 2+)
- WhatsApp Notifications
- AI Workout Plans
- Student Portal & Dashboard
- Nutrition Plans
- Progress Tracking & Attendance
- Community Features
- Subscription Billing
- Referral System
- Mobile Application
- Analytics Dashboard
