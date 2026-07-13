export enum BookingStatus {
  PENDING = "PENDING",
  SCHEDULED = "SCHEDULED",
  CANCELLED = "CANCELLED"
}

export interface Booking {
  bookingId: string;
  status: BookingStatus;
  coach: string;
  selectedDate: string | null;
  selectedTime: string | null;
  duration: string;
  timezone: string;
  googleMeetUrl: string | null;
  calendarInviteSent: boolean;
  confirmationEmailSent: boolean;
}

export const defaultBooking: Booking = {
  bookingId: "mock-token-123",
  status: BookingStatus.PENDING,
  coach: "Abhay Pandey",
  selectedDate: null,
  selectedTime: null,
  duration: "45 Minutes",
  timezone: "India Standard Time (IST)",
  googleMeetUrl: null,
  calendarInviteSent: false,
  confirmationEmailSent: false,
};
