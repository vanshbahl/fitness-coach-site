# UX Flow & Blueprint

## Core Philosophy
The booking experience is an interactive onboarding wizard. It must feel like setting up a premium app (e.g., Apple Fitness, Nike Training Club). It must be fast, thumb-friendly, and require zero pinch-to-zoom on mobile.

## Mobile UX Considerations
- **Bottom-heavy design**: Primary actions (Next/Continue) should stick to the bottom of the screen.
- **Auto-advance**: Where possible (e.g., single-select cards), automatically advance to the next step to reduce clicks.
- **Large Tap Targets**: All selectable cards and chips must have a minimum height of 48px.
- **No Keyboard Traps**: Minimize text input. Rely heavily on visual sliders, chips, and cards. Only prompt for the keyboard when strictly necessary (Name, Contact).
- **Progress Tracking**: A continuous, smooth progress bar fixed at the top.

---

## Screen-by-Screen Breakdown

### Step 1: Welcome
- **Visuals**: Full-screen immersive layout. Background image or looping video of Abhay coaching.
- **Copy**: "Transform Your Physique with Quick Strength."
- **Action**: Large, vibrating/pulsing "Start Your Assessment" button.
- **Animation**: Fade in text, slide up button.

### Step 2: Personal Information
- **Fields**: Name, Age, Gender, City, WhatsApp, Instagram.
- **UX**: Stacked, clean input fields with floating labels. Auto-focus on Name. Use numeric keypad for Age and WhatsApp.
- **Validation**: Require Name and WhatsApp.

### Step 3: Body Metrics
- **Fields**: Height (cm), Weight (kg).
- **UX**: Instead of typing numbers, use interactive horizontal scroll sliders with a large, bold number display in the center. Gives a tactile, premium feel.

### Step 4: Goals
- **UX**: A 2-column grid of `SelectableCard` components.
- **Content**: Icons + Text ("Learn Calisthenics", "Build Strength", "Get Lean").
- **Interaction**: Multi-select. Tapping toggles a glowing border/background.
- **Action**: "Continue" button appears only after at least one is selected.

### Step 5: Current Fitness Level
- **UX**: Vertical stack of wide cards.
- **Content**: 
  - *Beginner* (Just starting out)
  - *Intermediate* (Can do basic pull-ups/push-ups)
  - *Advanced* (Working on skills like muscle-ups)
- **Interaction**: Single-select. Selecting a card auto-advances to the next step.

### Step 6: Equipment Available
- **UX**: Grid of visual cards with subtle iconography.
- **Content**: Pull-up Bar, Resistance Bands, Yoga Mat, Gym Access, Bodyweight Only.
- **Interaction**: Multi-select.

### Step 7: Preferred Training Time
- **UX**: A wrap-flex container of `InteractiveChip` components (pill-shaped toggles).
- **Content**: Morning, Afternoon, Evening, Flexible.
- **Interaction**: Multi-select.

### Step 8: Coaching Preference
- **UX**: Single select card indicating the structure of the trial and acknowledging the standard monthly fee (to pre-qualify leads).
- **Interaction**: Auto-advance on selection.

### Step 9: Current Routine
- **UX**: A clean, auto-expanding `<textarea>`.
- **Copy**: "What does your current week of training look like?"
- **Action**: Optional field, easy to skip.

### Step 10: Review & Slot Selection
- **UX**: 
  - Top half: A beautiful, condensed summary of their assessment.
  - Bottom half: A horizontal scroll calendar to pick an available date, followed by time chips.
- **Action**: "Proceed to Payment (₹49)" button sticking to the bottom.

### Step 11: Secure Payment
- **UX**: Triggers the Razorpay pop-up. The UI beneath enters a skeleton/loading state indicating "Securing your slot...".

### Step 12: Success Screen
- **Visuals**: Full-screen success state. Lottie animation (confetti or checkmark).
- **Copy**: "Welcome to the team, [Name]! Your trial is confirmed."
- **Action 1**: "Add to Google Calendar" button.
- **Action 2**: "Join WhatsApp Community" (Primary CTA).
- **Animation**: Staggered fade up of elements.
