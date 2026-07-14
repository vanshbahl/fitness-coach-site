# Frontend Architecture

## Folder Structure

The Quick Strength frontend follows a domain-driven, feature-based architecture. This ensures high cohesion and scalability as the application grows.

```text
src/
├── api/                  # API client configuration and interceptors (Axios)
├── assets/               # Static media, icons, and placeholder images
├── components/           # Shared UI elements (buttons, inputs, layout wrappers)
├── features/             # Feature-based domains
│   ├── admin/            # (Future) Dashboard views
│   ├── booking/          # Assessment Wizard, Slot Picker, Mock Checkout
│   └── landing/          # Hero, Philosophy, Results, CTA sections
├── hooks/                # Custom React hooks
├── lib/                  # Utilities (Tailwind merge `cn`, formatting)
├── pages/                # Page-level components routing the features
└── styles/               # Global CSS (`index.css` with Tailwind v4 variables)
```

## Component Hierarchy

- **App Root (`main.tsx`)**: Injects React Query Provider, React Router, and global error boundaries.
- **Pages**:
  - `LandingPage`: Composes the marketing funnel (`Hero` → `WhyCalisthenics` → `MeetYourCoach` → `Results` → `FinalCTA`).
  - `BookingPage`: Wraps the multi-step `AssessmentWizard` and nested routing for checkout flow.
- **Features**: Highly encapsulated logic. For example, `src/features/landing/components/Results.tsx` owns its local state (the active athlete index) and handles its own layout, without relying on global state management.

## Animation Philosophy

The frontend architecture prioritizes **Zero Layout Shift (ZLS)**. 
Animations are used to enhance the premium feel, not distract the user. We heavily rely on Framer Motion.

- **Entrance**: Soft fade-ups (`y: 24, opacity: 0` to `y: 0, opacity: 1`) bound to scroll viewport intersections.
- **State Changes**: When data changes (e.g., slider index), we prefer native React key-swapping or opacity crossfading over heavy sliding translations to preserve 60fps performance on mobile.
- **Safe Area Considerations**: Footers and floating elements respect `safe-area-inset-bottom` for iOS devices.

## Responsive Strategy

1. **Mobile-First**: The UI is designed primarily for vertical viewports (`375px - 430px`), given that >90% of traffic originates from Instagram.
2. **Thumb Reachability**: Primary actions (e.g., CTA buttons, Slider arrows on mobile) are placed in the bottom 30% of the screen.
3. **Desktop Scaling**: Elements don't just stretch on desktop; they reorient. For example, the `Results` component switches from a vertical stack to a side-by-side Hero Image and Navigation control layout.

## Design Principles

- **Editorial & Minimal**: Emulate the aesthetic of Apple, Linear, and Stripe.
- **Typography Driven**: Hierarchy is achieved through font weight, tracking, and contrast rather than borders or heavy background boxes.
- **Black Canvas**: The background is heavily weighted in `zinc-950` and `black`, using a stark `orange-500` strictly for primary calls to action or micro-accents.
