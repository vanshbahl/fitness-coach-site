# Development Roadmap

## Phase 1: Project Setup & Foundation
- Initialize Git repository.
- Setup Frontend (React + Vite + Tailwind + shadcn).
- Setup Backend (FastAPI + SQLAlchemy + Alembic).
- Configure Database (Supabase PostgreSQL).
- Define project folder structures and base configurations.

## Phase 2: Landing Page (Public Website)
- Build Hero Section with strong CTA.
- Build "About Coach" section.
- Build "Why Calisthenics" & "Benefits" sections.
- Build Testimonials and FAQ.
- Implement Framer Motion for scroll reveals and premium feel.

## Phase 3: Booking System Core
- Develop database models and migrations for Bookings.
- Create FastAPI endpoints for availability and booking initiation.
- Build Frontend Booking Form (React Hook Form + Zod validation).
- Integrate Google Calendar API (read free/busy time).

## Phase 4: Payments & Confirmation
- Integrate Razorpay API on backend (Create Order, Verify Signature).
- Integrate Razorpay Checkout on frontend.
- Handle payment success/failure edge cases.
- Setup Resend for automated transactional emails (Receipts & Confirmations).
- Setup automated Google Calendar event creation on payment success.

## Phase 5: Admin Dashboard
- Implement JWT Authentication for Admin.
- Build Dashboard Layout (Sidebar, Header).
- Build Bookings Data Table (view all, filter by status).
- Build Booking Detail view (mark attendance, add notes, convert to enrolled).

## Phase 6: Testing & Refinement
- End-to-end testing of the booking flow.
- Mobile responsiveness audit.
- Performance optimization (Lighthouse score).
- Error handling refinement (Toast notifications, user-friendly messages).

## Phase 7: Deployment
- Deploy Database to Supabase (Production environment).
- Deploy Backend to Railway.
- Deploy Frontend to Vercel.
- Configure custom domain and SSL.
- Setup environment variables for production.
