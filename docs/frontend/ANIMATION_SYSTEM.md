# Animation System

Animations must increase engagement but never slow down the 90-second onboarding goal. 

## 1. Page & Wizard Transitions
- **Type**: Sliding x-axis transitions.
- **Forward**: New step slides in from right (`x: 100%`), old step slides out to left.
- **Backward**: New step slides in from left (`x: -100%`), old step slides out to right.
- **Duration**: `0.3s`
- **Curve**: `easeOut`

## 2. Micro-interactions
- **Card Selection**: When a user selects a goal/equipment card, it scales down slightly (`scale: 0.98`) on tap, then returns to `1.0` with a subtle primary border highlight.
- **Button Feedback**: `whileTap={{ scale: 0.95 }}` on primary CTAs.
- **Input Focus**: Subtle ring expansion around the input field when focused.

## 3. Progress Animation
- **Progress Bar**: Fills smoothly over `0.4s` using a `spring` animation when moving to the next step.
- **Percentage Text**: Ticks up dynamically.

## 4. Loading & Success
- **Loading Skeletons**: Gentle pulse opacity (`0.4` to `1.0`) on placeholders.
- **Success Celebration**: Framer Motion confetti or staggered fade-in of success elements. Delay CTA appearance by `0.5s` to force the user to read the confirmation.

## 5. Reduced Motion
- Always wrap complex animations in `useReducedMotion()` from Framer Motion. If true, fallback to simple `opacity` fades.

## 6. Anti-Patterns
- **Do NOT**: Animate text typing for standard form labels.
- **Do NOT**: Use bounce animations on form submissions.
