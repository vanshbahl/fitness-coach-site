# Development Roadmap

## Prototype v1 ✅

- **Git & Infrastructure**: Initialize Git repository and project structure.
- **Frontend Architecture**: Setup React 19 + Vite + TypeScript.
- **Styling**: Configure Tailwind CSS v4 and global design tokens.
- **Landing Page**: Build out premium marketing sections (Hero, Philosophy, Founder, Results, FAQ, CTA).
- **Assessment Wizard**: Construct 9-step funnel with Zod form validation and persistent state.
- **Booking Flow UI**: Implement interactive Date/Time picker and mock Payment Preview.
- **Backend Setup**: Initialize FastAPI + SQLAlchemy + Alembic.
- **Database Architecture**: SQLite (local) and mapped PostgreSQL schema models for Bookings.
- **API Integration**: Hook frontend assessment submissions to backend via Axios and React Query.

## Prototype v1.1

- **Payments Integration**: Connect Razorpay API for backend Order Creation & Verification.
- **State Handling**: Manage transitions effectively on payment success/failure.
- **Deployment Environments**: 
  - Deploy Frontend to Vercel.
  - Deploy Backend to Railway.
  - Setup Production PostgreSQL Database on Supabase or Neon.
- **Performance**: Audit and optimize LCP, bundle sizes, and thumb-reach targets on mobile devices.

## Prototype v2

- **Google Calendar Integration**: Automatically create events and generate Meet links upon confirmed bookings.
- **Automated Emails**: Integrate Resend to send confirmation and reminder emails to the User & Coach.
- **Success Screen**: Build celebration animations post-checkout.
- **Admin Dashboard (V1)**: 
  - JWT Authentication for Abhay.
  - Protected Dashboard Layout (Sidebar, Header).
  - Data Tables to view Bookings, Payment Status, Calendar Status, and Coach Notes.
  - Basic Search and Filters.

## Production

- **WhatsApp Notifications**: SMS/WhatsApp reminders for upcoming trial sessions.
- **Analytics Dashboard**: Conversion metrics, booking rates, and traffic sources for the Coach.
- **AI Workout Plans**: Generate initial plan templates based on onboarding data.
- **Student Portal**: Dashboard for active clients to track workouts, nutrition, and attendance.
- **Subscription Billing**: Recurring billing setup for enrolled students.
- **Community Features**: Private groups or referral systems to grow the client base.
- **Mobile Application**: Explore React Native packaging for a dedicated Coach/Client iOS application.
