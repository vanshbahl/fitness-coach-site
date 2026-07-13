# Development Tasks

## Phase 1: Setup
- [ ] Initialize GitHub repository
- [ ] Setup Frontend (`npm create vite@latest frontend -- --template react-ts`)
- [ ] Install Tailwind CSS v4 in frontend
- [ ] Initialize shadcn/ui in frontend
- [ ] Setup Backend Python virtual environment
- [ ] Install FastAPI, Uvicorn, SQLAlchemy, Alembic, Pydantic
- [ ] Setup Supabase project and obtain connection string
- [ ] Initialize Alembic in backend

## Phase 2: Frontend Landing Page
- [ ] Create base layout component (Navbar, Footer)
- [ ] Build Hero component
- [ ] Build About Coach component
- [ ] Build Benefits/Why Calisthenics component
- [ ] Build FAQ component
- [ ] Add Framer Motion animations to all sections

## Phase 3: Backend Core & Database
- [ ] Create `users` and `trial_bookings` SQLAlchemy models
- [ ] Generate and apply Alembic migrations
- [ ] Setup Google Calendar API credentials (Service Account)
- [ ] Create `GET /availability` endpoint reading from Google Calendar
- [ ] Create `POST /bookings/initiate` endpoint

## Phase 4: Frontend Booking Flow
- [ ] Build Slot Selection UI (Calendar/Date picker)
- [ ] Build User Details Form (React Hook Form + Zod)
- [ ] Integrate TanStack Query for API calls
- [ ] Handle state transitions (Date Select -> Form -> Payment)

## Phase 5: Payments & Emails
- [ ] Create Razorpay account and get API keys
- [ ] Implement Razorpay order creation in backend
- [ ] Integrate Razorpay script in frontend checkout
- [ ] Create `POST /bookings/verify` endpoint
- [ ] Implement Google Calendar event creation logic
- [ ] Implement Resend email confirmation logic
- [ ] Build Success/Thank You page on frontend

## Phase 6: Admin Dashboard
- [ ] Build Admin Login page
- [ ] Setup frontend routing protection (Private Routes)
- [ ] Build Admin Sidebar/Navigation
- [ ] Create `GET /admin/bookings` endpoint
- [ ] Build Bookings Table UI
- [ ] Create `PATCH /admin/bookings/{id}` endpoint
- [ ] Build Booking Actions (Mark attendance, update status)

## Phase 7: Deployment
- [ ] Provision Vercel project and link to GitHub
- [ ] Provision Railway project and link to GitHub
- [ ] Add environment variables to Railway (DB, Razorpay, Google, Resend)
- [ ] Add environment variables to Vercel (API URL)
- [ ] Perform end-to-end production test
