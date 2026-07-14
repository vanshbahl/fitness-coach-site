# Landing Page Components

This document breaks down the major React components that compose the Prototype v1 Landing Page (`src/features/landing/components/`).

---

## 1. FloatingNav (`src/components/layout/FloatingNav.tsx`)
- **Purpose**: Persists across the top of the viewport on scroll, providing quick access to the booking CTA and brand anchor.
- **Animations**: Uses Framer Motion's `useScroll` to reveal itself only after the user scrolls past the Hero section.
- **Responsive Behavior**: Pill-shaped layout that naturally scales down padding for mobile devices.

## 2. Hero (`src/features/landing/Hero.tsx`)
- **Purpose**: The primary conversion banner and entry point.
- **State**: Static component.
- **Animations**: Background image scaling (`1.1` to `1.0`) on mount. Fade-up staggering for the headline, subheadline, and primary CTA.
- **Responsive Behavior**: Full `100dvh` layout to guarantee it occupies the entire screen on mobile browsers with collapsible address bars.

## 3. WhyCalisthenics & WhyQuickStrength
- **Purpose**: Educational sections establishing the methodology and the platform's value proposition.
- **Animations**: Scroll-triggered fade-ups using Framer Motion `whileInView` with `margin: "-100px"`.
- **Responsive Behavior**: Transitions from a stacked mobile column to an alternating 2-column zig-zag layout on desktop.

## 4. MeetYourCoach (Founder Section)
- **Purpose**: Builds trust and personal connection with Abhay Pandey.
- **Animations**: The "Philosophy Stack" (timeline alternative) features cards floating upwards sequentially as the user scrolls.
- **Responsive Behavior**: 
  - Mobile: Image top, Philosophy Stack below.
  - Desktop: Large vertical portrait anchored left, with the philosophy cards elegantly spaced on the right with generous breathing room.

## 5. Results (`Results.tsx`)
- **Purpose**: Showcases client transformations.
- **Data Model**: Reads from a flattened static `ATHLETES` array.
- **State**: Tracks `activeIndex`.
- **Animations**: Native React key-swapping for the Spotlight text panel (opacity fade + translateY). The central image utilizes absolute positioning and opacity mapping to seamlessly **crossfade** (350ms) exactly as requested.
- **Responsive Behavior**: 
  - Mobile: Image -> Arrows -> Spotlight -> Stats.
  - Desktop: Prev Arrow -> Image -> Next Arrow -> Spotlight -> Stats.
- *(See `Results-Section.md` for a deeper dive)*.

## 6. FaqSection & FinalCTA
- **Purpose**: Handles objections and provides the final conversion push.
- **State**: FAQ manages accordion open/close states (handled via shadcn `Accordion`).
- **Animations**: Standard scroll fade-ups.
- **Responsive Behavior**: Max-width constraints ensure readability on ultra-wide monitors.
