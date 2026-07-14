# Quick Strength

A modern, high-conversion fitness coaching platform designed to replace generic Google Forms with a premium, Apple-inspired booking experience.

## Project Overview

Quick Strength is the flagship platform for Abhay Pandey. It serves as an end-to-end client acquisition funnel that seamlessly transitions Instagram traffic into committed clients. Prototype v1 introduces a meticulously crafted landing page, a streamlined multi-step assessment wizard, and the foundation for backend API integration.

## Screenshots

*(Screenshots placeholder - Prototype v1 Landing Page & Assessment Wizard will be added here)*

## Tech Stack

**Frontend**
- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + custom design tokens
- **UI Components**: custom `shadcn/ui` base
- **Routing**: React Router v7
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion (Zero Layout Shift architecture)

**Backend**
- **Framework**: FastAPI
- **Database**: PostgreSQL (Supabase / Neon) & SQLite (Local Development)
- **ORM**: SQLAlchemy 2.0 + Alembic
- **Validation**: Pydantic v2

## Folder Structure

```text
quick-strength/
├── frontend/                 # React 19 + Vite Frontend
│   ├── src/
│   │   ├── api/              # Axios client and interceptors
│   │   ├── assets/           # Images, SVGs, and static media
│   │   ├── components/       # Shared UI (buttons, inputs, layout)
│   │   ├── features/         # Feature-based domains (landing, wizard, admin)
│   │   ├── pages/            # Page-level components
│   │   └── lib/              # Utility functions and type definitions
│   └── index.html            # Vite entry point
├── backend/                  # FastAPI Backend
│   ├── app/
│   │   ├── api/              # Route handlers
│   │   ├── core/             # Configuration and security
│   │   ├── db/               # SQLAlchemy models and migrations
│   │   └── schemas/          # Pydantic validation schemas
│   └── alembic/              # Database migration scripts
├── docs/                     # Project Documentation
│   └── frontend/             # Frontend-specific architecture and design docs
├── PROJECT_STATE.md          # Current project status and milestones
├── ROADMAP.md                # Future development plans
└── CHANGELOG.md              # Version history
```

## Installation

### Prerequisites
- Node.js 20+
- Python 3.10+
- Git

### Quick Start
Clone the repository:
```bash
git clone https://github.com/your-username/quick-strength.git
cd quick-strength
```

#### Frontend Setup
```bash
cd frontend
npm install
```

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
```

## Development

**Run Frontend (Port 5173)**
```bash
cd frontend
npm run dev
```

**Run Backend (Port 8000)**
```bash
cd backend
uvicorn app.main:app --reload
```

## Production Build

To build the frontend for production:
```bash
cd frontend
npm run build
```
This generates the optimized bundle in `frontend/dist/`.

## Deployment

- **Frontend**: Designed for edge deployment via **Vercel**.
- **Backend**: Designed for containerized deployment via **Railway** or **Render**.
- **Database**: Compatible with **Supabase** or **Neon**.

## Current Features (Prototype v1)

- **Premium Landing Page**: Mobile-first, fully responsive marketing page featuring Apple/Linear-inspired aesthetics.
- **Editorial Slider**: Interactive transformation gallery utilizing native Framer Motion crossfades.
- **Assessment Wizard**: Multi-step onboarding flow with Zod validation, semantic progress tracking, and morphing transitions.
- **Backend API Foundation**: FastAPI routes for `/api/v1/bookings` with local SQLite persistence.
- **Robust Error Handling**: Centralized Axios interceptors for API communication.

## Future Roadmap

See the full [ROADMAP.md](./ROADMAP.md) for upcoming features including Razorpay integration, Google Calendar syncing, and Admin Dashboards.

## Credits

Designed and developed for Abhay Pandey (Quick Strength).
