# Component Library

A reusable inventory of standard UI components for the Quick Strength Frontend.

### 1. Wizard Layout
- **Purpose**: The main container for the onboarding flow.
- **Props**: `currentStep`, `totalSteps`, `onBack`, `title`, `subtitle`.
- **Guidelines**: Must always keep the "Next" button sticky at the bottom of the viewport on mobile devices for easy thumb access.

### 2. Selectable Card (`SelectableCard.tsx`)
- **Purpose**: Used for Goals, Equipment, and Fitness Level selections.
- **States**: Default, Selected, Hover/Tap.
- **Props**: `title: string`, `icon: ReactNode`, `selected: boolean`, `onClick: () => void`.

### 3. Wizard Progress Bar (`ProgressBar.tsx`)
- **Purpose**: Show user how far along they are.
- **Usage Guidelines**: Pin to the top of the screen just below the header.

### 4. Input Fields (`shadcn Input/Textarea`)
- **States**: Default, Focus, Error, Disabled.
- **Usage Guidelines**: Must always include a `<Label>` for accessibility. Error messages should appear in red text directly beneath the input using `react-hook-form` validation states.

### 5. Sticky Bottom Action Bar (`StickyActionBar.tsx`)
- **Purpose**: Holds the primary CTA on mobile.
- **Guidelines**: Apply `fixed bottom-0 w-full p-4 bg-background/80 backdrop-blur-md border-t` to ensure the button is always accessible without scrolling.

### 6. Review Summary Card (`ReviewCard.tsx`)
- **Purpose**: Used in Step 7 to show previously entered data.
- **Props**: `label: string`, `value: string | string[]`, `onEdit: () => void`.
- **Usage**: Allows quick jump-back to previous steps if data is incorrect.
