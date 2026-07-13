# Development Tasks

## Phase 1: Setup & UX Foundation
- [x] Initialize frontend and backend repositories
- [x] Setup DB infrastructure
- [ ] Define Tailwind configuration (premium colors, fonts)
- [ ] Create global Framer Motion variants for step transitions

## Phase 2: Onboarding Frontend (The Wizard)
- [ ] Setup global form state for multi-step data retention
- [ ] Build `ProgressBar` component
- [ ] Build `VisualSlider` component (Height/Weight)
- [ ] Build `SelectableCard` component (Goals, Fitness Level)
- [ ] Build `InteractiveChip` component (Time preferences)
- [ ] Implement Step 1: Welcome & Intro
- [ ] Implement Step 2: Personal Information (Inputs)
- [ ] Implement Step 3: Body Metrics (Sliders)
- [ ] Implement Step 4: Goals (Multi-select cards)
- [ ] Implement Step 5: Fitness Level (Single-select cards)
- [ ] Implement Step 6: Equipment (Multi-select visual cards)
- [ ] Implement Step 7: Preferred Time (Chips)
- [ ] Implement Step 8: Coaching Preference
- [ ] Implement Step 9: Current Routine (Textarea)
- [ ] Implement Step 10: Review & Summary Screen

## Phase 3: Backend & Database
- [ ] Create `trial_bookings` SQLAlchemy model mapping to wizard fields
- [ ] Setup Pydantic validation for the massive JSON payload
- [ ] Generate Alembic migration for the new table
- [ ] Create `GET /availability` endpoint
- [ ] Create `POST /bookings/initiate` endpoint

## Phase 4: Payments & Final Steps
- [ ] Integrate Razorpay backend SDK
- [ ] Add Razorpay script to frontend checkout step
- [ ] Create `POST /bookings/verify` endpoint
- [ ] Build Step 11: Payment Modal Trigger
- [ ] Build Step 12: Success Screen (Confirmation of Calendar Invite & Email)

## Phase 5: Dashboard & Admin
- [ ] Build Admin Login
- [ ] Build Dashboard to view Bookings, Status, and Assessment Data (No CRM logic)
- [ ] Build minimal status toggle features

## Phase 6: Optimization
- [ ] Ensure all tap targets are min 44x44px for thumb use
- [ ] Audit input fields to prevent iOS zoom-in (font size >= 16px)
- [ ] Pre-fetch available slots in the background while user fills steps
