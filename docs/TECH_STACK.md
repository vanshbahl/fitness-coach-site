# Technology Stack

## Frontend

### React 19 + Vite + TypeScript
- **Why**: React remains the industry standard for component-driven UI. React 19 introduces concurrent features and better performance. Vite offers vastly superior developer experience (instant server start, fast HMR) compared to Create React App or Webpack. TypeScript ensures type safety, reducing runtime errors.
- **Alternatives Considered**: Next.js (rejected as SSR is overkill for a single-coach landing page; a simple SPA is easier to host and reason about).

### Tailwind CSS v4 + shadcn/ui
- **Why**: Tailwind allows rapid, utility-first styling without context-switching. v4 brings performance improvements. shadcn/ui provides highly accessible, customizable UI primitives that look premium out-of-the-box, saving hours of building complex components (like Select, DatePicker, Modals) from scratch.
- **Alternatives Considered**: Material UI, Chakra UI (rejected due to bloat and opinionated design systems that are harder to customize to a unique premium brand).

### TanStack Query & React Hook Form & Zod
- **Why**: TanStack Query handles caching, retry logic, and synchronization of API data effortlessly. React Hook Form minimizes re-renders during form input. Zod provides strict schema validation that can be shared or mirrored with the backend.
- **Alternatives Considered**: Redux (rejected as overkill for server-state management), Formik (React Hook Form is more performant).

### Framer Motion
- **Why**: Essential for delivering a "premium" feel. It allows declarative, spring-based animations for scroll reveals, layout transitions, and interactive elements.

## Backend

### FastAPI (Python)
- **Why**: Extremely fast (built on Starlette and Pydantic), asynchronous by design, and automatically generates OpenAPI (Swagger) documentation. It's clean, modern, and perfectly suited for building REST APIs quickly.
- **Alternatives Considered**: Node.js/Express (rejected as FastAPI provides better out-of-the-box validation and documentation), Django (too heavy for a simple booking API).

### SQLAlchemy 2.0 & Alembic & Pydantic v2
- **Why**: SQLAlchemy 2.0 is the most robust Python ORM, supporting both sync and async paradigms. Alembic handles database migrations safely. Pydantic v2 offers incredibly fast data validation written in Rust, ensuring that data coming from the frontend is strictly typed before hitting the business logic.

## Database

### Supabase PostgreSQL
- **Why**: Managed PostgreSQL that is easy to set up, offers generous free tiers, includes an integrated connection pooler (essential for modern deployments), and provides a clean dashboard.
- **Alternatives Considered**: AWS RDS (too complex/expensive for MVP), MongoDB (relational data is better suited for bookings, users, and payments).

## Third-Party Integrations

### Razorpay
- **Why**: Industry standard for payments in India. Excellent API, webhooks, and React integration. Supports UPI, cards, and net banking seamlessly.

### Resend
- **Why**: Modern, developer-friendly email API. Significantly better developer experience and deliverability for transactional emails compared to older providers.
- **Alternatives Considered**: SendGrid, Mailgun.

### Google Calendar API
- **Why**: Direct integration with the coach's existing workflow. Automatically blocks time and sends invites to users.

## Version Control & Deployment
- **Git + GitHub**: Standard for source control.
- **Vercel**: Best-in-class deployment for Vite/React SPAs.
- **Railway**: Heroku-like simplicity for deploying the FastAPI backend via Docker or Nixpacks.
