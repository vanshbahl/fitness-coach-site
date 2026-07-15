export enum BookingStatus {
  PENDING = "PENDING",
  SCHEDULED = "SCHEDULED",
  CANCELLED = "CANCELLED"
}

export interface AvailabilityPreference {
  preferred_days: string[];
  preferred_times: string[];
  timezone: string;
}

export interface BookingResponse {
  id: string;
  status?: BookingStatus; // legacy/demo
  booking_status?: BookingStatus; // backend
  coach?: string; // legacy/demo
  selectedDate?: string | null; // legacy/demo
  selectedTime?: string | null; // legacy/demo
  scheduled_at?: string | null; // backend
  duration?: string;
  timezone?: string;
  googleMeetUrl?: string | null; // legacy/demo
  meeting_link?: string | null; // backend
  calendarInviteSent?: boolean; // legacy
  confirmationEmailSent?: boolean; // legacy
  createdAt?: string;
  updatedAt?: string;
  created_at?: string; // backend
  updated_at?: string; // backend
  availability_preference?: AvailabilityPreference; // backend
}

export interface SlotResponse {
  id: string;
  date: string;
  time: string;
  isAvailable: boolean;
}

export interface CreateBookingPayload {
  // Add assessment payload types when ready
  age?: number;
  gender?: string;
  goals?: string[];
  equipment?: string[];
  preferredDays?: string[];
  preferredTime?: string[];
  heightCm?: number;
  weightKg?: number;
  previousExperience?: boolean;
  trainingLevel?: string;
  currentRoutine?: string;
  injuries?: string;
  name?: string;
  country?: string;
  countryCode?: string;
  nationalNumber?: string;
  instagram?: string;
  city?: string;
  preferredDuration?: string;
}

export interface ScheduleSlotPayload {
  date: string;
  time: string;
}

export interface ApiErrorResponse {
  success: boolean;
  error: string;
  detail: any;
}
