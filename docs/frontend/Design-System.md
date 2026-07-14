# Design System

The Quick Strength Design System is heavily inspired by modern, premium editorial interfaces (Apple, Linear, Stripe). It actively avoids typical "gym bro" aesthetics (neon accents, heavy shadows, clutter) in favor of deep blacks, sharp contrast, and purposeful typography.

## Color Palette

- **Background (Base)**: `zinc-950` / `black`
- **Text (Primary)**: `white`
- **Text (Secondary)**: `zinc-300` / `zinc-400`
- **Text (Muted/Technical)**: `zinc-500`
- **Accent (Primary Action)**: `orange-500` (`#f97316`)

*Note: The accent color is used sparingly. It should highlight data changes (e.g. `Before -> After`), primary CTA buttons, and subtle microinteraction states.*

## Typography

- **Headers**: Large, tightly tracked (`tracking-tighter` or `tracking-tight`), usually rendered in `font-extrabold`.
- **Labels/Eyebrows**: Rendered in uppercase with generous tracking (`tracking-[0.2em]`), `text-xs` or `text-sm`, often colored in the accent `orange-500` or muted `zinc-500`.
- **Testimonials/Quotes**: Utilizes a serif font (`font-serif`) in `italic` to provide a human, editorial contrast to the strict sans-serif UI.

## Shapes & Spacing

- **Border Radius**: 
  - Standard cards and images default to `24px` (`rounded-[24px]` or `rounded-3xl`).
  - Buttons and pills are fully rounded (`rounded-full`).
- **Spacing**: 
  - Sections are padded heavily on the Y-axis (`py-24 sm:py-32`) to give components room to breathe.
  - "Whitespace is a feature. Desktop should breathe."

## Glassmorphism

Used extremely sparingly. Applied mainly to the `FloatingNav` and the Wizard Footers to ensure background context is retained without losing legibility.
- Standard utility: `bg-white/5 backdrop-blur-md border border-white/10`.

## Microinteractions

- **Hover States**: Interactive elements (like slider arrows) slightly scale up (`scale: 1.04`) and transition color.
- **Tap States**: Buttons and arrows scale down immediately to `0.95` (`duration: 0.12s`) to provide satisfying, tactile feedback on mobile devices.
- **Image Treatments**: Placeholder imagery receives a unified CSS filter (`grayscale contrast-[1.1] sepia-[0.15]`) to ensure a timeless, warm monochromatic feel that aligns with the black/orange brand.
