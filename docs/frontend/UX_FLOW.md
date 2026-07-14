# UX Flow & Blueprint

## Core Philosophy
The booking experience is an interactive onboarding wizard. It must feel like setting up a premium app (e.g., Apple Fitness, Nike Training Club). It must be fast, thumb-friendly, and require zero pinch-to-zoom on mobile.

## Mobile UX Considerations
- **Bottom-heavy design**: Primary actions (Next/Continue) should stick to the bottom of the screen.
- **Auto-advance**: Where possible (e.g., single-select cards), automatically advance to the next step to reduce clicks.
- **Large Tap Targets**: All selectable cards and chips must have a minimum height of 48px.
- **No Keyboard Traps**: Minimize text input. Rely heavily on visual sliders, chips, and cards. Only prompt for the keyboard when strictly necessary.
- **Progress Tracking**: A continuous, smooth progress bar fixed at the top.

---

## Screen-by-Screen Breakdown

### Step 0: Welcome
- **Visuals**: Full-screen immersive layout. Background image or looping video of Abhay coaching.
- **Copy**: "Transform Your Physique with Quick Strength."
- **Action**: Large, vibrating/pulsing "Start Your Assessment" button.
- **Animation**: Fade in text, slide up button.

### Step 1: Demographics
- **Fields**: Age, Gender, Previous Training Experience.
- **UX**: 
  - Age uses a `WheelPicker` (min 16, max 100).
  - Gender uses a `SegmentedControl`.
  - Previous Experience uses `OptionCard` (Yes/No).
- **Validation**: All fields are required.

### Step 2: Goals
- **UX**: A 2-column grid of `SelectableCard` components.
- **Content**: Icons + Text (e.g., "Learn Calisthenics", "Build Strength", "Get Lean").
- **Interaction**: Multi-select. Tapping toggles a glowing border/background.
- **Action**: "Continue" button appears only after at least one is selected.

### Step 3: Equipment Available
- **UX**: Grid of visual cards with subtle iconography.
- **Content**: Pull-up Bar, Resistance Bands, Yoga Mat, Gym Access, Bodyweight Only, etc.
- **Interaction**: Multi-select. "Continue" appears after at least one is selected.

### Step 4: Availability
- **UX**: Two wrap-flex containers of `InteractiveChip` components (pill-shaped toggles).
- **Content**:
  - Preferred Days (Monday, Tuesday, etc., or Flexible).
  - Preferred Times (Morning, Afternoon, Evening).
- **Interaction**: Multi-select. Both days and times must have at least one selection.

### Step 5: Body Metrics
- **Fields**: Height (cm), Weight (kg).
- **UX**: Uses `WheelPicker` interactive horizontal scroll sliders for a tactile, premium feel.

### Step 6: Medical & Background
- **UX**: Clean, auto-expanding `<textarea>` components.
- **Fields**: 
  - Current Routine (What does your week look like?)
  - Injuries (Past or current).
- **Action**: Optional fields, easy to skip. Auto-validates as true.

### Step 7: Contact Info
- **Fields**: Name, WhatsApp Number, Instagram Handle, City.
- **UX**: Stacked, clean input fields with floating labels. Auto-focus on Name. Use numeric keypad for WhatsApp.
- **Validation**: Name (min 2 chars), WhatsApp (valid regex), City (min 2 chars) are required. Instagram is optional (auto-strips `@`).

### Step 8: Commitment Level
- **UX**: Single select card indicating the structure of the trial and acknowledging the standard monthly fee (to pre-qualify leads).
- **Options**: 1 Month, 3 Months, 6 Months, Long Term.
- **Interaction**: Auto-advance on selection.

### Step 9: Review & Submit
- **UX**: A beautiful, condensed summary of their assessment organized into intuitive sections (`Demographics`, `Contact Info`, `Body Metrics`, `Goals & Equipment`, `Availability`, `Commitment`).
- **Interaction**: Edit buttons route the user back to the exact step to fix information. 
- **Action**: "Proceed to Checkout" button which triggers the API submission and transitions to the payment flow.

### Step 10: Secure Payment (Checkout Loading & Redirect)
- **UX**: A smooth transitional loader (`CheckoutLoadingPage`) with micro-animations ("Creating Booking", "Preparing Secure Payment"). 
- **Action**: Triggers the Razorpay pop-up or redirects to payment success flow.

### Step 11: Booking Status & Success
- **Visuals**: Full-screen success state. Lottie animation (confetti or checkmark) or polished UI.
- **Copy**: "Welcome to the team, [Name]! Your trial is confirmed."
- **Action 1**: Display booked session details.
- **Action 2**: "Schedule Session" (If in pending status).
- **Animation**: Staggered fade up of elements.
