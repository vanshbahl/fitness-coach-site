# Booking Domain Specification

This document is the single source of truth for the Quick Strength Booking Domain. It dictates how data is collected in the frontend onboarding wizard, validated via Pydantic schemas, and stored in the database via SQLAlchemy.

## 1. Enums

To ensure strict validation and data integrity, the following enumerations are defined:

- **Gender**: `male`, `female`, `other`, `prefer_not_to_say`
- **FitnessLevel**: `beginner`, `intermediate`, `advanced`
- **CoachingDuration**: `1_month`, `3_months`, `6_months`
- **BookingStatus**: `pending`, `paid`, `completed`, `cancelled`
- **PaymentStatus**: `pending`, `success`, `failed`, `refunded`
- **TrialOutcome**: `pending`, `no_show`, `not_interested`, `enrolled`

---

## 2. Multi-Select Fields

**Recommendation**: Use **SQLAlchemy `JSON`** (mapping to PostgreSQL `JSONB` and SQLite JSON strings).
**Why**: The architecture requires local development compatibility with SQLite. SQLite does not natively support PostgreSQL's `ARRAY` type. Using `JSON` provides a seamless abstraction that works across both databases without complex type casting.

Fields using JSON: `goals`, `equipment_available`, `preferred_days`, `preferred_times`.

---

## 3. Field Catalog

### Personal Information
| Field | Description | Req? | Data Type | DB Type | Validation | UI Component |
| --- | --- | --- | --- | --- | --- | --- |
| `name` | Client's full name | Yes | String | `String` | min_length=2 | Text Input |
| `age` | Client's age | Yes | Integer | `Integer` | 12 <= age <= 100 | Numeric Input |
| `gender` | Client's gender | Yes | Enum | `Enum(Gender)` | - | Radio Group / Chips |
| `city` | Client's city of residence | Yes | String | `String` | min_length=2 | Text Input |
| `whatsapp_number` | Contact number for WhatsApp | Yes | String | `String` | regex (10-15 digits) | Tel Input |
| `instagram_handle` | Client's IG username | No | String | `String` | Strip '@' if passed | Text Input |

### Body Metrics
| Field | Description | Req? | Data Type | DB Type | Validation | UI Component |
| --- | --- | --- | --- | --- | --- | --- |
| `height_cm` | Client's height in cm | Yes | Integer | `Integer` | 100 <= h <= 250 | Interactive Slider |
| `weight_kg` | Client's weight in kg | Yes | Float | `Float` | 30 <= w <= 200 | Interactive Slider |

### Fitness Profile
| Field | Description | Req? | Data Type | DB Type | Validation | UI Component |
| --- | --- | --- | --- | --- | --- | --- |
| `fitness_level` | Current fitness capability | Yes | Enum | `Enum(FitnessLevel)` | - | Card Selection |
| `previous_experience`| Has trained calisthenics? | Yes | Boolean | `Boolean` | - | Toggle / Chips |
| `injuries` | Any ongoing injuries? | No | String | `Text` | max_length=500 | Textarea |
| `current_routine` | Current workout routine | No | String | `Text` | max_length=1000 | Textarea |

### Goals
| Field | Description | Req? | Data Type | DB Type | Validation | UI Component |
| --- | --- | --- | --- | --- | --- | --- |
| `goals` | User's fitness goals | Yes | List[str] | `JSON` | min_items=1 | Card Selection |
*Options*: Learn Calisthenics, Build Strength, Get Lean, Improve Mobility, Learn Skills, Other.

### Equipment
| Field | Description | Req? | Data Type | DB Type | Validation | UI Component |
| --- | --- | --- | --- | --- | --- | --- |
| `equipment_available`| Access to equipment | Yes | List[str] | `JSON` | min_items=1 | Card Selection |
*Options*: Pull-up Bar, Resistance Bands, Yoga Mat, Parallel Bars, Gymnastic Rings, Open Space, Gym Access.

### Availability
| Field | Description | Req? | Data Type | DB Type | Validation | UI Component |
| --- | --- | --- | --- | --- | --- | --- |
| `preferred_days` | Ideal days to train | Yes | List[str] | `JSON` | min_items=1 | Chips |
| `preferred_times` | Ideal time of day | Yes | List[str] | `JSON` | min_items=1 | Chips |
| `timezone` | Client's local timezone | Yes | String | `String` | Valid IANA Timezone | Hidden auto-detect / Dropdown |

### Coaching
| Field | Description | Req? | Data Type | DB Type | Validation | UI Component |
| --- | --- | --- | --- | --- | --- | --- |
| `preferred_duration` | Ideal coaching duration | Yes | Enum | `Enum(CoachingDuration)` | - | Card Selection |
| `fee_acknowledgement`| Agrees to standard fee | Yes | Boolean | `Boolean` | Must be True | Checkbox / Toggle |

---

## 4. Internal Fields (Coach Dashboard Only)

| Field | Description | Default | DB Type |
| --- | --- | --- | --- |
| `booking_source` | Analytics tracking (instagram, youtube, website, referral, direct) | `website` | `String/Enum` |


These fields are never exposed directly to the public onboarding wizard. They are managed internally by the backend and the admin dashboard.

| Field | Description | Default | DB Type |
| --- | --- | --- | --- |
| `booking_status` | Overall status of the trial session | `pending` | `Enum(BookingStatus)` |
| `payment_status` | Status of the Razorpay transaction | `pending` | `Enum(PaymentStatus)` |
| `trial_outcome` | The result of the trial session | `pending` | `Enum(TrialOutcome)` |
| `razorpay_order_id`| Razorpay generated Order ID | `None` | `String` (Indexed) |
| `razorpay_payment_id`| Razorpay Payment token | `None` | `String` |
| `amount_paid` | Amount paid in paise (4900 = ₹49) | `4900` | `Integer` |
| `scheduled_at` | The selected slot datetime | `None` | `DateTime(timezone=True)` |
| `calendar_event_id`| Google Calendar Event identifier | `None` | `String` |
| `meeting_link` | Google Meet URL | `None` | `String` |
| `attendance` | Did the client attend the trial? | `False` | `Boolean` |
| `coach_notes` | Private notes by the coach | `None` | `Text` |
| `follow_up_date` | Date to follow up with lead | `None` | `DateTime(timezone=True)` |

---

## 5. Future Compatibility Notes

By structuring the MVP data this way, we inherently support future expansions:
- **Student Portal**: When accounts are introduced, a simple `client_id` (UUID foreign key) can attach this rich assessment profile to a persistent user account.
- **AI Recommendations**: Standardized JSON arrays (`goals`, `equipment_available`) allow future algorithms or AI logic to parse the data and auto-generate workout programs.
- **Multiple Coaches**: Adding a `coach_id` field later will easily support a marketplace/multi-coach model.
- **Analytics**: The highly structured enums (`trial_outcome`, `fitness_level`) allow for immediate BI dashboarding (e.g., "What percentage of advanced athletes convert to 6-month plans?").
