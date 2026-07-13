# Quick Strength Design System

This document is the definitive visual source of truth for the Quick Strength project. It dictates every aesthetic decision to guarantee a premium, mobile-first experience that inspires trust, discipline, and immediate conversion. 

---

## 1. Brand Personality

### Brand Attributes
- **Premium**: High-end coaching, not a budget gym membership.
- **Athletic**: Focused on performance, movement, and physical mastery (calisthenics).
- **Motivating**: Inspires action through clarity and bold design choices.
- **Clean**: Zero clutter. Every pixel serves the conversion goal.
- **Confident**: Unapologetic, authoritative, and direct.

### Emotional Goals
When a user opens the web app, they should instantly feel:
- **Trust** in Abhay’s authority and expertise.
- **Commitment** to their own fitness journey.
- **Urgency** to complete the booking before spots close.

### Brand Voice
- **Direct**: Use active verbs (e.g., "Start Your Journey", "Select Your Goal").
- **Authoritative**: Do not use "please" or overly soft language.
- **Minimal**: Let the design and Abhay's results do the talking.

### Visual Personality
- **Aesthetic**: Gymshark meets Linear. Highly polished, stark contrast, and heavily reliant on purposeful whitespace (or negative space in dark mode). It is never generic, noisy, or chaotic.

---

## 2. Color System

Quick Strength uses a **Dark-Mode-First** high-contrast monochrome palette. The absence of overwhelming color forces the user to focus entirely on the content, imagery, and the primary call-to-action (CTA). 

### The Palette

- **Background (`--background`)**: `#09090b` (Deep Zinc)
  - *Purpose*: The infinite canvas. Absorbs light and makes typography pop.
- **Foreground (`--foreground`)**: `#fafafa` (Pure White)
  - *Purpose*: Primary text color for maximum readability against the dark background.
- **Primary / CTA (`--primary`)**: `#fafafa` (Pure White)
  - *Purpose*: The main action color. Primary buttons are solid white with dark text. It screams "click me".
- **Primary Foreground (`--primary-foreground`)**: `#09090b` (Deep Zinc)
  - *Purpose*: Text inside primary buttons.
- **Secondary / Cards (`--secondary` / `--card`)**: `#18181b` (Zinc 900)
  - *Purpose*: Surfaces resting slightly above the background. Used for unselected cards, inputs, and bottom action bars.
- **Border / Outline (`--border`)**: `#27272a` (Zinc 800)
  - *Purpose*: Defines boundaries without drawing attention. Used on unselected chips and input borders.
- **Accent / Selected (`--accent`)**: `#ffffff` (Pure White border/glow)
  - *Purpose*: When a user taps a goal or equipment card, the border transitions from Zinc 800 to Pure White to indicate selection clearly.
- **Success (`--success`)**: `#10b981` (Emerald 500)
  - *Purpose*: Used strictly for the final success checkmark and payment confirmation.
- **Warning (`--warning`)**: `#f59e0b` (Amber 500)
  - *Purpose*: Used for missing required fields before submission.
- **Danger / Destructive (`--destructive`)**: `#ef4444` (Red 500)
  - *Purpose*: Used for destructive actions (e.g., "Cancel Booking" in the admin dashboard) and hard validation errors.

*Note: Avoid trendy gradients. If a gradient is used, it must be a subtle black-to-transparent fade over imagery to ensure text legibility.*

---

## 3. Typography

Typography is the loudest element of the Quick Strength brand. It must be legible, athletic, and modern.

### Font Selections
- **Primary Font**: `Inter` (Sans-serif)
  - *Why*: Inter provides Swiss-style neutrality, perfect tracking for mobile readability, and a highly premium feel when scaled up. It avoids the "clunky" feel of generic athletic block fonts while maintaining authority.

### Type Scale
- **Display (`text-5xl`)**: 3rem (48px), `font-extrabold`, `tracking-tighter`, `leading-none`.
  - *Usage*: The main hero hook ("Transform Your Physique").
- **H1 (`text-3xl`)**: 1.875rem (30px), `font-bold`, `tracking-tight`, `leading-tight`.
  - *Usage*: Wizard Step titles ("What is your primary goal?").
- **H2 (`text-2xl`)**: 1.5rem (24px), `font-semibold`, `tracking-tight`.
  - *Usage*: Section headers in the review screen.
- **Body Large (`text-lg`)**: 1.125rem (18px), `font-medium`, `text-zinc-300`.
  - *Usage*: Subtitles under wizard headers.
- **Body (`text-base`)**: 1rem (16px), `font-normal`, `leading-relaxed`.
  - *Usage*: Standard paragraph text, input values, and card descriptions.
- **Small (`text-sm`)**: 0.875rem (14px), `font-medium`, `text-zinc-400`.
  - *Usage*: Validation messages, helper text, and fine print.

---

## 4. Spacing System

A premium feel is achieved through generous, mathematical whitespace.
- **Base Unit**: 4px (Tailwind standard).
- **Mobile Safe Areas**: Always account for iOS notches and the home indicator (`pb-safe`, `pt-safe`).
- **Screen Padding (`px-4` to `px-6`)**: Mobile screens will have 16px to 24px of horizontal padding.
- **Section Spacing (`gap-8` or `gap-12`)**: 32px to 48px between logical sections to prevent cognitive overload.
- **Component Spacing (`gap-4`)**: 16px between inputs in a form.

---

## 5. Border Radius

Consistency in rounding defines the "sharpness" of the brand. Quick Strength is slightly rounded for a modern app feel, but not fully circular (which feels playful/unserious).
- **Cards, Modals, Bottom Sheets**: `16px` (`rounded-2xl`)
- **Buttons, Inputs, Selectable Chips**: `8px` (`rounded-lg`)
- **Pill Buttons (e.g., Time selection)**: `9999px` (`rounded-full`)

---

## 6. Shadows

In a dark-theme-first design, traditional drop shadows look muddy. We rely on borders and subtle glows.
- **Elevation 1 (Cards)**: No shadow. `bg-zinc-900` with a `1px border-zinc-800`.
- **Elevation 2 (Selected Card)**: `border-white`, with a very faint white ambient glow (`shadow-[0_0_15px_rgba(255,255,255,0.05)]`).
- **Floating Action Bar (Mobile Bottom)**: `shadow-[0_-10px_40px_rgba(0,0,0,0.8)]` to create depth above the scrolling content.
- **Modals/Dialogs**: `shadow-2xl` strictly using pure black `rgba(0,0,0,1)` to lift it off the backdrop blur.

---

## 7. Button System

Buttons must be massive, thumb-friendly, and completely unambiguous.

- **Mobile Sizing**: Minimum height of `56px` (`h-14`) for primary CTAs to ensure effortless one-handed tapping.
- **Primary**: Solid White background, Black text. `font-semibold`.
  - *Hover*: Scales down (`scale: 0.98`), opacity drops to `90%`.
  - *Pressed*: Scales down to `0.95`.
  - *Disabled*: `bg-zinc-800 text-zinc-500 cursor-not-allowed`.
- **Secondary**: `bg-zinc-900 border border-zinc-800 text-white`.
- **Ghost**: Transparent background, text only. Used for "Back" buttons or secondary links.
- **Loading**: Text is replaced by a crisp, spinning Lucide `Loader2` icon. The button remains its original width so the layout doesn't jump.

---

## 8. Card System

Cards are the primary interaction model for the wizard.
- **Selection Card (Goals/Equipment)**:
  - *Purpose*: Replaces standard checkboxes with large, tappable surface areas.
  - *Hierarchy*: Large icon (top left) + bold title + subtle description.
  - *Padding*: `p-4` or `p-6`.
  - *Unselected State*: `bg-zinc-900 border-zinc-800`.
  - *Selected State*: `border-white bg-zinc-800/50`. A small white checkmark circle appears in the top right.
- **Review Card**:
  - *Purpose*: Displays user data cleanly before payment.
  - *Layout*: Flex row. Label on the left (`text-zinc-400`), Value on the right (`text-white font-medium`).

---

## 9. Input System

Inputs must never feel like a tax document. They must feel like a modern messaging app.
- **Height**: `48px` (`h-12`) minimum for easy tapping.
- **Background**: `bg-zinc-900`.
- **Border**: `border-zinc-800`.
- **Focus State**: The border transitions instantly to `border-white` and a subtle `ring-1 ring-white/20` is applied.
- **Error State**: `border-red-500`, accompanied by a red error message below the input with a Lucide `AlertCircle` icon.
- **Mobile Keyboards**: 
  - Age, Height, Weight: `inputmode="numeric" pattern="[0-9]*"`.
  - Email: `type="email"`.
  - Phone: `type="tel"`.

---

## 10. Iconography

- **Library**: Lucide React.
- **Style**: Minimalist, line-based, unopinionated.
- **Stroke Width**: `1.5px` (slightly thinner than the default 2px for a sharper, more premium look).
- **Usage**: Used to support text (e.g., inside Selection Cards or on the "Back" button). Never use icons alone without context unless their meaning is universally absolute (like an 'X' to close).

---

## 11. Imagery

Photography sells the coaching program; the UI just facilitates the transaction.
- **Photography Style**: High contrast, low saturation, gritty but professional. Images of Abhay executing advanced calisthenics (front levers, planche, muscle-ups).
- **Backgrounds**: Images used as backgrounds must have a heavy black gradient overlay (`bg-gradient-to-t from-black via-black/80 to-transparent`) to ensure text layered on top remains WCAG compliant.
- **Rule**: Absolutely no stock photos. Authenticity is the primary conversion driver.

---

## 12. Responsive Rules

Desktop is an enhancement, but mobile is the priority.
- **375px - 430px (Mobile)**: The primary layout. Full width, sticky bottom CTAs, edge-to-edge imagery.
- **768px (Tablet)**: The UI maxes out its width (e.g., `max-w-md` or `max-w-lg`) and centers itself on the screen.
- **1024px+ (Desktop)**: The application behaves like a sleek modal or a centered card floating on a dark, slightly blurred background. It never stretches forms to fill a 27-inch monitor.

---

## 13. Accessibility

A premium brand does not exclude users.
- **Touch Targets**: Minimum `48px` height for all interactive elements.
- **Contrast**: Pure white text on deep zinc background far exceeds WCAG AAA contrast requirements.
- **Focus Indicators**: Every interactive element must have a visible focus state for keyboard navigation (crucial for desktop/admin use).
- **Reduced Motion**: Respect `prefers-reduced-motion`. If true, swap complex Framer Motion sliders for simple opacity crossfades.

---

## 14. Design Tokens (CSS Variables Mapping)

These variables must be populated in `src/styles/index.css`:

```css
@theme {
  /* Colors */
  --color-background: #09090b;
  --color-foreground: #fafafa;
  --color-primary: #fafafa;
  --color-primary-foreground: #18181b;
  --color-card: #18181b;
  --color-border: #27272a;
  --color-accent: #ffffff;
  --color-destructive: #ef4444;

  /* Border Radius */
  --radius-lg: 16px;
  --radius-md: 12px;
  --radius-sm: 8px;

  /* Spacing */
  --spacing-safe-bottom: env(safe-area-inset-bottom);
  --spacing-safe-top: env(safe-area-inset-top);
}
```
