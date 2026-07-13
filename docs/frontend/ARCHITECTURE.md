# Frontend Architecture

## High-Level Architecture
Quick Strength follows a decoupled, modern web architecture pattern comprising a statically hosted Single Page Application (SPA) designed as an onboarding wizard.

## Structure
- **Framework**: React 19 with Vite.
- **State Management**: 
  - **Local State**: Context API or Zustand to maintain the onboarding wizard state across steps without losing data.
  - **Form Validation**: React Hook Form paired with Zod, validating step-by-step.
  - **Server State**: TanStack Query for data fetching and mutations.
- **Styling**: Tailwind CSS v4 + shadcn/ui. Heavily customized for a premium, minimal aesthetic. 
- **Animations**: Framer Motion handles step transitions, micro-interactions, progress bar fills, and the final celebration screen.

## Deployment Architecture
- **Frontend**: Deployed on **Vercel**. Provides edge caching and instant PR previews.
