# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Prototype v1] - Landing Page & Onboarding

Prototype v1 establishes the complete top-of-funnel architecture for Quick Strength, transforming generic form submissions into a premium, interactive booking experience.

### Added
- **Premium Landing Page**: End-to-end responsive marketing site featuring:
  - Floating sticky navigation.
  - Cinematic Hero section with dark glassmorphism.
  - "Why Calisthenics" and "Quick Strength System" feature breakdowns.
  - "Meet Abhay" Founder section modeled on Apple-esque vertical philosophy stacks.
  - What's Included, FAQ, and CTA components.
- **Editorial Results Slider**: A highly-polished, native React crossfading image gallery. Replaces earlier experimental timelines and WebGL prototypes with a timeless, typography-driven `Results` section.
- **Assessment Wizard**: A robust 9-step funnel featuring semantic progress labels, mobile-optimized morphing footers, and granular Zod validations.
- **Checkout UI**: Seamless Apple Calendar-inspired Slot Picker and Mock Payment Gateway integrations.
- **Backend API Foundation**: FastApi service established. Connected `POST /api/v1/bookings` to persist onboarding data into a local SQLite database using SQLAlchemy and Alembic.
- **API Architecture**: Axios client (`apiClient`) with global error interceptors, fully integrated with React Query (`@tanstack/react-query`).

### Removed
- **WebGL / ReactBits Gallery**: Completely purged from the repository in favor of the lighter, more performant native Framer Motion editorial slider.
- **Vertical Timeline**: Removed in favor of the floating "Philosophy Stack" to elevate the premium aesthetic of the Founder section.
- **Obsolete Documentation**: Audited and removed outdated documentation, establishing a unified source of truth across the repository.

---

## [Pre-Prototype Phase] - Project Initialization

### Added
- Monorepo structure defined (`/frontend` and `/backend`).
- Vite, React 19, TypeScript, and Tailwind CSS v4 environment initialized.
- FastAPI, SQLAlchemy, and Pydantic environment initialized.
- Global design tokens (fonts, colors, spacing) established in `index.css`.
