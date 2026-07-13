# Component Library

A reusable inventory of standard UI components for the Quick Strength Frontend.

### 1. Wizard Layout
- **Purpose**: The main container for the onboarding flow.
- **Props**: `currentStep`, `totalSteps`, `onBack`, `title`, `subtitle`.
- **Guidelines**: Must always keep the "Next" button sticky at the bottom of the viewport on mobile devices for easy thumb access.

### 2. Selectable Card (`SelectableCard.tsx`)
- **Purpose**: Used for Goals, Equipment, and Fitness Level selections.
- **States**: Default, Selected, Hover/Tap.
- **Props**: `title: string`, `icon: ReactNode`, `selected: boolean`, `onClick: () => void`.

### 3. Wizard Progress Bar (`ProgressBar.tsx`)
- **Purpose**: Show user how far along they are.
- **Usage Guidelines**: Pin to the top of the screen just below the header.

### 4. Input Fields (`shadcn Input/Textarea`)
- **States**: Default, Focus, Error, Disabled.
- **Usage Guidelines**: Must always include a `<Label>` for accessibility. Error messages should appear in red text directly beneath the input using `react-hook-form` validation states.

### 5. Sticky Bottom Action Bar (`StickyActionBar.tsx`)
- **Purpose**: Holds the primary CTA on mobile.
- **Guidelines**: Apply `fixed bottom-0 w-full p-4 bg-background/80 backdrop-blur-md border-t` to ensure the button is always accessible without scrolling.

### 6. Review Summary Card (`ReviewCard.tsx`)
- **Purpose**: Used in Step 7 to show previously entered data.
- **Props**: `label: string`, `value: string | string[]`, `onEdit: () => void`.
- **Usage**: Allows quick jump-back to previous steps if data is incorrect.

### 7. Floating Navigation (`FloatingNav.tsx`) [IMPLEMENTED]
- **Purpose**: A minimal, glassy navigation bar that slides down on load.
- **Features**: Highly blurred background `backdrop-blur-xl`, primary CTA for "Book Trial".

### 8. Landing Page Hero (`Hero.tsx`) [IMPLEMENTED]
- **Purpose**: Immersive, premium introduction to Quick Strength.
- **Features**: 
  - Framer Motion staggered fade-up for high-impact typography.
  - Dark overlay gradients ensuring text legibility over photography.
  - High-hierarchy primary CTAs and social proof stats.

### 8.1 Landing Page Hero Refinements (v2)
- **Whitespace & Focus**: Reduced container `max-w` to `5xl` to force a tighter, more cinematic typography column on desktop.
- **Cinematic Photography**: Significantly reduced gradient opacity (e.g. from `/80` to `/40`) allowing the raw image to dominate the background.
- **Motion Polish**: Lowered the stagger delay to `0.1s` and tweaked the spring/easeOut curve `[0.16, 1, 0.3, 1]` for an invisible, high-end entry. Reduced y-travel to `15px`.
- **CTA Hierarchy**: Shifted the primary CTA to "Start Your Assessment", backed by three elegant `bg-white/5` chips (11 Steps, ~90 Seconds, ₹49) replacing the harsh pricing focus.
- **Conversion Journey**: Embedded the `Assessment -> Trial -> Training` mental model strictly using typography beneath the CTA to ground user expectations instantly.

### 7.1 Floating Navigation Refinements (v2)
- **Blur Density**: Increased to `backdrop-blur-2xl` and thinned the background opacity to `40%` for a highly premium, glassy aesthetic.
- **Desktop Expandability**: Introduced minimal text links (`#philosophy`, `#results`, `#faq`) that only render on desktop.

### 8.2 Final Hero Polish (v3)
- **Text Readability**: Guaranteed high contrast by shifting paragraphs and secondary headlines from `text-zinc-400` to `text-zinc-200`.
- **Cinematic Overlays**: Removed `from-background` (which caused a white fog in light mode) in favor of strictly `from-black` gradients. Layered a radial vignette (`bg-[radial-gradient(...)]`) to darken text areas while preserving center image clarity.
- **Composition**: Enforced a `max-w-5xl` column layout and used `text-[11vw] sm:text-6xl` scaling to prevent accidental text wrapping across 375px–430px bounds.
- **CTA**: Enhanced `Start Your Assessment` with active scaling (`active:scale-[0.98]`) and accessible focus rings.
- **Metadata Chips**: Stripped background bubbles entirely. Switched to elegant text-based alignments with faded icons (`text-white/60`).
- **Assessment Journey**: Added a glowing active state (`bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]`) to the "Assessment" step to communicate progress intent immediately.
- **Accessibility**: Validated contrast ratios, added `aria-label` to the section, hidden decorative scroll indicators, and implemented `useReducedMotion` checks for Framer Motion.

### 7.2 Final Navigation Polish (v3)
- **Mobile Navigation**: Built a `lucide-react` Hamburger Menu wrapper that triggers an `AnimatePresence` full-screen sheet with staggered item drop-ins and strict `overflow-hidden` body locking.
- **Desktop Navigation**: Thinned out the floating glass background from `bg-background/40` to a stark `bg-black/10` coupled with extreme blur (`backdrop-blur-2xl`), making it feel nearly invisible until scrolled. Hover states tightened to `text-white` snaps.

### 8.3 Production Freeze (v1)
- The Hero and Navigation components are officially marked as **Production Ready (v1)**.
- **Desktop Nav Polish**: Solidified visual separation by setting the unscrolled state to `bg-black/20 backdrop-blur-md` and the scrolled state to `bg-black/60 backdrop-blur-xl`.
- **Mobile Nav Contrast**: Replaced shadcn `variant="outline"` on mobile sheet buttons with raw HTML `<button>` elements to perfectly control dark-mode contrast overrides without generic variant interference, guaranteeing visibility across all themes.

### 8.4 Official Branding Implementation
- Replaced temporary "QUICK STRENGTH" text placeholders with official graphical assets (`qs-logo-txt.png` and `qs-logo-pic.png`).
- Centralized assets within `src/assets/branding/`.
- Implemented responsive conditional rendering: Desktop surfaces the full text logo, while Mobile surfaces the compact icon logo for improved safe-area spacing and thumb-friendly alignment.
- Added full text logo to the interior of the mobile menu overlay to anchor the navigation sheet visually.
- Enforced descriptive `alt` tags across all logo iterations for screen reader accessibility.

### 8.5 UX Strategy: Single CTA Pathway
- Removed all secondary 'Book Trial' actions from the navigation.
- Hero and Navigation CTAs are unified around the single 'Start Assessment' intent, eliminating cognitive load.
- Applied strict  across all instances.

### 8.5 UX Strategy: Single CTA Pathway
- Removed all secondary 'Book Trial' actions from the navigation.
- Hero and Navigation CTAs are unified around the single 'Start Assessment' intent, eliminating cognitive load.
- Applied strict aria-labels across all instances.

### 9.0 Assessment Wizard Architecture
- **AssessmentLayout**: Wraps the AnimatePresence logic for all steps.
- **ProgressStepper**: Custom visual animated step line replacing standard progress bars.
- **OptionCard / SelectionChip**: Premium visual tap targets for avoiding typing.
- **WheelPicker**: CSS scroll-snap implementation of iOS-style vertical pickers.
- **SegmentedControl**: Animated React pill toggle.
- **AssessmentWizard**: The main routing hub and FormProvider.

### 9.1 Premium Component State Updates
- **OptionCard**: Uses border-white/5 and inset shadows for a glassy look.
- **FloatingNextButton**: Implements Framer Motion whileTap for realistic depth compression.
- **EncouragementMessage**: Renders at the bottom of the viewport with a radial ambient background glow.
