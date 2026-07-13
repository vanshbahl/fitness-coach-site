import { useState, useEffect } from "react";
import { Booking, BookingStatus, defaultBooking } from "../../models/booking";

const STORAGE_KEY = "qs_booking_data";

export function useBookingStore() {
  const [booking, setBooking] = useState<Booking>(defaultBooking);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setBooking(JSON.parse(saved));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBooking));
      }
    } catch (e) {
      console.error("Failed to load booking", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateBooking = (updates: Partial<Booking>) => {
    setBooking(prev => {
      const newBooking = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newBooking));
      return newBooking;
    });
  };

  const scheduleBooking = (date: string, time: string) => {
    updateBooking({
      selectedDate: date,
      selectedTime: time,
      status: BookingStatus.SCHEDULED,
      googleMeetUrl: "meet.google.com/mock-url-xyz",
      calendarInviteSent: true,
      confirmationEmailSent: true,
    });
  };

  return { booking, isLoaded, updateBooking, scheduleBooking };
}
