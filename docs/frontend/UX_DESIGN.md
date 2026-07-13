# Frontend UX Design

## Core Conversion Principle
Every screen is designed to answer: *"Does this increase the likelihood that the user completes the ₹49 booking?"* The website's responsibility ends once the trial session has been successfully booked.
The experience must feel like joining an exclusive coaching program, not filling out a form.

### 1. Landing Screen
- **Purpose**: Hook the Instagram visitor immediately and establish premium authority.
- **User Goal**: Understand what is being offered and initiate the booking.
- **Layout**: Hero image (Abhay working out), bold headline, social proof (stats/testimonials).
- **Visual Hierarchy**: Headline > Primary CTA > Social Proof.
- **Primary CTA**: "Start Your Journey (₹49)" (Sticky at the bottom on mobile).
- **Expected Emotion**: Inspired, excited, trusting.
- **Exit Conditions**: User clicks the primary CTA to enter the wizard (No subscriptions, No portals).

### 2. Wizard Step 1: Personal Info
- **Purpose**: Collect basic contact info smoothly.
- **User Goal**: Tell the coach who they are.
- **Layout**: Minimal form inputs with floating labels.
- **Primary CTA**: "Next"
- **Validation Rules**: Name (min 2), Age (12-100), WhatsApp (valid regex), City.
- **Expected Emotion**: Committed, invested.

### 3. Wizard Step 2: Body Metrics
- **Purpose**: Understand the user's starting point.
- **User Goal**: Provide height and weight.
- **Layout**: Visual sliders or sleek numerical inputs for Height (cm) and Weight (kg).
- **Primary CTA**: "Next"
- **Validation Rules**: Height (100-250cm), Weight (30-200kg).

### 4. Wizard Step 3: Fitness Profile
- **Purpose**: Assess experience and current routine.
- **User Goal**: Share workout history.
- **Layout**: Selectable chips for Fitness Level, text areas for routine/injuries.
- **Primary CTA**: "Next"

### 5. Wizard Step 4: Goals & Equipment
- **Purpose**: Understand what the user wants to achieve and where.
- **User Goal**: Select goals and available equipment.
- **Layout**: Multi-select visual cards with icons (e.g., Muscle Gain, Fat Loss, Home, Gym).
- **Primary CTA**: "Next"
- **Validation Rules**: At least 1 goal and 1 equipment type selected.

### 6. Wizard Step 5: Coaching Preferences
- **Purpose**: Set expectations on availability and duration.
- **User Goal**: Choose preferred times and plan length.
- **Layout**: Selectable pill buttons for Days/Times. Dropdown or large cards for Duration.
- **Primary CTA**: "Review My Profile"

### 7. Review & Payment Screen
- **Purpose**: Summarize the profile and collect the ₹49 fee.
- **User Goal**: Verify details and pay securely.
- **Layout**: Collapsed summary cards, clear total pricing (₹49), Razorpay trigger button.
- **Primary CTA**: "Pay ₹49 & Book Trial"
- **Validation Rules**: Must check the "Fee Acknowledgement" box.
- **Expected Emotion**: Ready, decisive.

### 8. Success Screen
- **Purpose**: Confirm booking and clarify that an email & calendar invite have been sent.
- **User Goal**: Feel accomplished and know the next steps.
- **Layout**: Full-screen celebration animation, clear confirmation text with Google Meet details.
- **Primary CTA**: "Return Home"
- **Expected Emotion**: Euphoric, accomplished.

### 9. 404 & Empty States
- **Purpose**: Gracefully handle missing data or pages.
- **Layout**: Minimal centered text with a subtle branded illustration.
- **Primary CTA**: "Return Home"

## Official CTA Progression
To eliminate cognitive load and prevent duplicate actions, the application follows a strict, single-path CTA progression. No stage reuses wording from another stage.

1. **Landing / Navigation**: `Start Your Assessment` / `Start Assessment`
2. **Inside Assessment**: `Next`
3. **Assessment End**: `Review Your Answers`
4. **Summary Screen**: `Continue to Payment`
5. **Payment Complete**: `Choose Trial Time`
6. **Slot Selection**: `Confirm Booking`
7. **Success Screen**: `Return Home` (Booking Confirmed)

## Assessment Philosophy
Text inputs are delayed until Step 7. Steps 1-6 rely entirely on WheelPickers, SelectionChips, and OptionCards to capture maximum momentum and reduce cognitive load. Progress is auto-saved locally so sessions are never lost.

## Release Candidate Polish
Introduced Apple/Linear style premium UX polish. The background now features an ambient, slow-moving blurred mesh with a static grain overlay. Component micro-interactions utilize Framer Motion spring physics for 0.98 scale compressions and haptic-style slides. The toast notification was moved to the bottom with an emerald radial glow to reward progression securely.

## Dynamic Feedback
Added contextual dynamic encouragement messages in the Assessment Wizard that react to user choices (e.g., beginner vs advanced experience, equipment limitations, and primary goals like weight loss).
