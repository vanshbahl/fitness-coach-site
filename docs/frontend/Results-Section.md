# Results Section

The `Results.tsx` component is the centerpiece of the landing page, showcasing real client transformations. 

## Architectural History
Previously, this section was built using an experimental WebGL canvas (`ogl`) to render a 3D circular scrolling gallery. To reduce bundle weight, improve mobile performance, and eliminate layout shifting, it was completely rewritten into a native React "Editorial Slider."

## Data Model
Data is driven by a unified, flattened schema mapped to the `ATHLETES` constant array. 

```typescript
type Athlete = {
  id: string;
  image: string;
  name: string;
  duration: string;
  weightBefore: string;
  weightAfter: string;
  skillBefore: string;
  skillAfter: string;
  achievement: string;
  testimonial: string;
};
```
Everything on the page (image, name, metrics, testimonial) reads purely from the `activeIndex` of this dataset.

## The Image Slider
The image slider avoids the traditional "filmstrip" horizontal slide. Instead, it natively crossfades images on top of one another.
- Images are absolutely positioned within a container holding a strict aspect ratio (`4/5`).
- The `activeIndex` image has `opacity: 1` and `zIndex: 10`. 
- All other images map to `opacity: 0`.
- The transition takes `350ms`, providing an effortless Apple-like crossfade.
- Images render with native `<img>` tags. Unfocused images use `loading="lazy"`, but by simply existing in the DOM, they inherently preload before the user navigates to them.

## The Spotlight Details
The accompanying text details update simultaneously with the image.
- By binding `key={activeIndex}` to the `motion.div` wrapper, React forcefully unmounts the old text and mounts the new text instantly.
- The mounting animation `initial={{ opacity: 0, y: 12 }}` to `animate={{ opacity: 1, y: 0 }}` handles the transition without triggering any vertical layout collapses.
- Pure typography replaces traditional bounding boxes. Data is visually chunked using font weights and `1px` translucent dividers.

## Statistics Footer
A completely static `STATS` band anchors the bottom of the section. It fades in once as the user scrolls down, emphasizing brand trust (Athletes Coached, Retention, Ratings) independent of the slider logic.
