# Animations & Motion

Motion in Quick Strength is governed by a strict "Zero Layout Shift" (ZLS) philosophy. Elements should appear, fade, or crossfade seamlessly without pushing other DOM elements out of place. 

We rely heavily on `framer-motion`.

## Standard Timing

The global easing curve provides a swift entrance with a smooth, lingering deceleration. This matches native Apple ecosystem animations.

```typescript
const CUSTOM_EASE = [0.22, 1, 0.36, 1];
```

## Entrance Animations (Scroll Reveal)

Most landing page sections utilize a standard fade-up entrance variant:

```typescript
const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: CUSTOM_EASE } 
  }
};
```

These are triggered using `whileInView` with a negative margin to ensure the animation fires just as the element crosses into the meaningful viewport space:
```tsx
<motion.div 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeUpVariant}
>
```

## State Changes & Crossfades

When swapping content (e.g., active athlete data), we avoid full DOM teardowns or horizontal sliding. Instead, we swap the React `key` to trigger a re-mount animation.

```tsx
<motion.div 
  key={activeIndex}
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: CUSTOM_EASE }}
>
```
*Note: We actively avoid `AnimatePresence` with `mode="wait"` for simple text swaps because it introduces a sequential delay (exit then enter) which can cause momentary empty space or layout jumps.*

## Reduced Motion

Accessibility is handled natively. Where appropriate (e.g., heavy parallax or slider interactions), we hook into the user's OS preferences:
```typescript
import { useReducedMotion } from "framer-motion";

const prefersReducedMotion = useReducedMotion();

<motion.button 
  whileHover={prefersReducedMotion ? {} : { scale: 1.04 }}
/>
```
