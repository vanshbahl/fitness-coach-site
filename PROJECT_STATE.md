# Project Status

This document tracks the current state of Quick Strength, acting as the single source of truth for completed work, ongoing tasks, and existing technical debt.

## Current Prototype Version
**Prototype v1** (Landing Page + Onboarding Wizard MVP)

---

## 🟢 Completed (Prototype v1)

### Frontend (95%)
- **Architecture**: Vite + React 19 + TypeScript stack fully configured.
- **Design System**: Global tokens established (zinc palette, orange-500 accent, strictly defined typography scale).
- **Landing Page**: 
  - Floating Navigation & Hero Section.
  - "Why Calisthenics" & "Quick Strength System" educational segments.
  - "Meet Abhay" Founder section (Apple-inspired vertical philosophy stack).
  - Premium Editorial Results Slider (WebGL removed for native Framer Motion crossfades).
  - What's Included, FAQ, and Final CTA.
- **Assessment Wizard**: Multi-step funnel with semantic progress tracking, responsive footers, and complex Zod validations.
- **API Connectivity**: Axios client (`apiClient`) connected to React Query for robust data fetching.

### Backend (40%)
- **Architecture**: FastAPI application structure defined.
- **Database**: SQLAlchemy models mapped and Alembic migrations running against a local SQLite instance.
- **Endpoints**: `POST /api/v1/bookings` and `GET /api/v1/bookings` implemented to capture Assessment Wizard submissions.

---

## 🟡 In Progress

- **Data Hydration**: Replacing the final mocked service layers (Scheduling, Payments) with real FastAPI endpoints.
- **Mobile Polish**: Final QA of thumb-reach zones on iOS Safari.
- **Database Migration**: Preparing to transition from local SQLite to PostgreSQL (Supabase/Neon) for deployment.

---

## 🔴 Known Issues

- The current implementation of `useScheduleSlot` still resolves mock data because the backend Calendar integration is pending.
- Image assets (e.g., `hero-bg.png`) are currently high resolution and may need modern formats (WebP/AVIF) for faster LCP (Largest Contentful Paint) in production.

---

## ⚠️ Technical Debt

- **Form State Management**: The wizard relies heavily on React state; if the wizard grows, moving form state to a global context (or Zustand) may be required to prevent prop drilling.
- **Hardcoded Data**: The `Results` editorial slider and `MeetYourCoach` philosophy stack currently use hardcoded arrays. These should eventually be moved to a CMS or database if the coach wants to update them frequently.

---

## 🚀 Next Milestones

1. **Prototype v1.1**: Deploying Frontend to Vercel and Backend to Railway with a PostgreSQL database.
2. **Payments & Scheduling**: Razorpay and Google Calendar API integration.
3. **Admin Dashboard (V1)**: Secure login for the coach to view bookings and applicant statuses. *(A structural placeholder is currently implemented at `/admin`)*

---

## ☁️ Deployment Status

| Service | Environment | Provider | Status | URL |
|---------|-------------|----------|--------|-----|
| Frontend | Local | Vite | Active | `localhost:5173` |
| Backend | Local | Uvicorn | Active | `localhost:8000` |
| Database | Local | SQLite | Active | `local.db` |
| Frontend | Production | Vercel | Pending | - |
| Backend | Production | Railway | Pending | - |
| Database | Production | Supabase | Pending | - |
