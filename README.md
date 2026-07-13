<div align="center">
  <h1>⚡ Quick Strength</h1>
  <p><strong>Premium Fitness Coaching & Booking Platform</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Razorpay-02042B?logo=razorpay&logoColor=white" alt="Razorpay" />
  </p>
</div>

---

A modern fitness coaching platform built for **Abhay Pandey (Quick Strength)**. This application replaces manual Google Form workflows with a seamless, premium booking experience for one-on-one trial sessions, fully integrated with Razorpay and Google Calendar.

##  Features

###  User Features
- **Coach Discovery:** Learn about the coach, calisthenics benefits, and read testimonials.
- **Trial Booking:** Select available time slots directly from the coach's calendar.
- **Frictionless Payment:** Securely pay the ₹49 trial fee via Razorpay.
- **Automated Confirmations:** Receive instant email confirmations and Google Calendar invites.

###  Coach Dashboard Features
- **Booking Management:** View, filter, and track all upcoming trial sessions.
- **Payment Tracking:** Monitor payment statuses in real-time.
- **Session Operations:** Mark attendance, add session notes, and manage trial enrollments.
- **Automated Scheduling:** Zero manual intervention required for Google Calendar sync.

###  Future Features
- Client portal for tracking progress and workout plans.
- Recurring subscription payments for enrolled students.
- Rescheduling and cancellation workflows.
- Automated WhatsApp notifications.

---

##  Tech Stack

| Category | Technologies |
| --- | --- |
| **Frontend** | React 19, Vite, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion, TanStack Query |
| **Backend** | FastAPI, Python 3.13+, SQLAlchemy 2.0, Alembic, Pydantic v2 |
| **Database** | Supabase PostgreSQL |
| **Integrations** | Razorpay (Payments), Google Calendar API (Scheduling), Resend (Emails) |
| **Deployment** | Vercel (Frontend), Railway (Backend), Supabase (DB) |

---

##  Project Structure

```text
quick-strength/
├── frontend/             # React SPA (Vite + TS + Tailwind)
│   ├── public/
│   ├── src/
│   │   ├── components/   # Reusable UI components (shadcn)
│   │   ├── features/     # Domain-specific modules
│   │   ├── lib/          # Utilities and API clients
│   │   └── routes/       # React Router setup
│   └── package.json
├── backend/              # FastAPI Server
│   ├── alembic/          # Database migrations
│   ├── app/
│   │   ├── api/          # Route handlers
│   │   ├── core/         # Settings and config
│   │   ├── db/           # Session management & base models
│   │   ├── models/       # SQLAlchemy models
│   │   └── schemas/      # Pydantic validation schemas
│   ├── tests/            # Pytest test suite
│   ├── main.py           # Application entrypoint
│   └── requirements.txt
└── docs/                 # Complete architecture & design docs
```

---

##  Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/vanshbahl/fitness-coach-site.git
cd fitness-coach-site
```

### 2. Configure Environment Variables
Copy the example environment files for both frontend and backend and fill in your credentials.
```bash
# Backend
cd backend
cp .env.example .env

# Frontend (Once initialized)
cd ../frontend
cp .env.example .env
```

### 3. Start Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```
*The API will run at `http://localhost:8000`*

### 4. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
*The frontend will run at `http://localhost:5173`*

---

##  Environment Variables

<details>
<summary><b>Backend <code>.env</code> Example</b></summary>

```env
PROJECT_NAME="Quick Strength API"
VERSION="1.0.0"
BACKEND_CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
DATABASE_URL="postgresql+asyncpg://postgres:password@localhost:5432/quickstrength"

# Integrations (To be added)
# RAZORPAY_KEY_ID="rzp_test_xxxxxx"
# RAZORPAY_KEY_SECRET="xxxxxx"
# RESEND_API_KEY="re_xxxxxx"
# GOOGLE_CALENDAR_CREDENTIALS="..."
```
</details>

<details>
<summary><b>Frontend <code>.env</code> Example</b></summary>

```env
VITE_API_URL="http://localhost:8000/api/v1"
VITE_RAZORPAY_KEY_ID="rzp_test_xxxxxx"
```
</details>

---

##  Development Workflow

### Git Workflow
We follow a feature-branch workflow. All active development branches off `dev` and merges back into `dev` via Pull Requests. `main` strictly represents the production environment.

### Branch Naming
- `feature/description` (e.g., `feature/booking-form`)
- `fix/description` (e.g., `fix/payment-webhook`)
- `docs/description` (e.g., `docs/api-update`)

### Commit Style
Use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `refactor:` for refactoring code without adding functionality
- `chore:` for routine tasks (e.g., updating dependencies)

### Documentation
Keep the `/docs` folder updated when introducing architectural shifts or new API endpoints.

---

##  Roadmap

- [x] Phase 1: Project Setup & Foundation
- [ ] Phase 2: Landing Page (Public Website)
- [ ] Phase 3: Booking System Core
- [ ] Phase 4: Payments & Confirmation
- [ ] Phase 5: Admin Dashboard
- [ ] Phase 6: Testing & Refinement
- [ ] Phase 7: Deployment

---

##  Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p><strong>Quick Strength</strong></p>
  <p>Developed by <strong>Vector Studio</strong></p>
</div>
