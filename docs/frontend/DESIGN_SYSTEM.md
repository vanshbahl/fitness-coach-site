# Global Design System

## Core Aesthetic
Premium, Minimal, Apple/Linear inspired. Heavy use of whitespace, refined typography, and subtle micro-interactions.

### 1. Color Palette (Dark Theme Default)
- **Background**: `#09090b` (Deep Zinc)
- **Foreground**: `#fafafa` (Pure White)
- **Primary**: `#fafafa` (White for high contrast)
- **Primary Foreground**: `#18181b` (Dark Zinc)
- **Accent**: `#27272a` (Subtle gray for cards)
- **Destructive**: `#7f1d1d` (Deep red)

### 2. Typography
- **Font Family**: `Inter` (sans-serif)
- **Scale**:
  - `h1`: 2.5rem, tracking-tight, font-bold
  - `h2`: 2rem, tracking-tight, font-semibold
  - `h3`: 1.5rem, font-semibold
  - `p`: 1rem, text-muted-foreground, leading-relaxed
  - `small`: 0.875rem, font-medium

### 3. Spacing & Grid
- Base unit: 4px (Tailwind standard `0.25rem`).
- **Mobile padding**: `px-4` or `px-6` (16px or 24px) for screen edges.
- Vertical rhythm: Generous gaps (`gap-6`, `gap-8`) between form sections to reduce cognitive load.

### 4. Components Style
- **Border Radius**: `0.75rem` (12px) for cards, `0.5rem` (8px) for buttons.
- **Shadows**: Soft, diffused shadows on light mode; minimal inner borders (`border-white/10`) on dark mode.
- **Glass Effects**: `backdrop-blur-md bg-background/80` for sticky headers or bottom navigation bars.

### 5. Responsive Breakpoints
- **Mobile First**: Default layout is optimized for 375px - 430px (iPhone SE to Pro Max).
- **Tablet (`md`: 768px)**: Max-width containers center the wizard on screen.
- **Desktop (`lg`: 1024px)**: Wizard remains centered in a sleek card, avoiding extreme widening.
