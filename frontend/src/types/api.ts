export enum BookingStatus {
  PENDING = "PENDING",
  SCHEDULED = "SCHEDULED",
  CANCELLED = "CANCELLED"
}

export interface BookingResponse {
  id: string;
  status: BookingStatus;
  coach: string;
  selectedDate: string | null;
  selectedTime: string | null;
  duration: string;
  timezone: string;
  googleMeetUrl: string | null;
  calendarInviteSent: boolean;
  confirmationEmailSent: boolean;
  createdAt: string;
  updatedAt: string;
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
