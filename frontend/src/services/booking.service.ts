import { apiClient } from '../api/client';
import { BookingResponse, BookingStatus, CreateBookingPayload, ScheduleSlotPayload } from '../types/api';

// Map frontend duration enum to backend enum
const durationMap: Record<string, string> = {
  "1 Month": "1_month",
  "3 Months": "3_months",
  "6 Months": "6_months",
  "Long Term": "6_months", // Fallback if needed, though backend only has 1,3,6
};

// Extract fitness level from experience
const getFitnessLevel = (hasExperience?: boolean) => hasExperience ? "intermediate" : "beginner";

import { isDemoMode } from '../utils/demo';

const generateDemoBooking = (id: string): BookingResponse => ({
  id,
  status: BookingStatus.PENDING,
  coach: "Abhay Pandey",
  selectedDate: null,
  selectedTime: null,
  duration: "35 Minutes",
  timezone: "Asia/Kolkata",
  availability_preference: {
    preferred_days: ["Flexible"],
    preferred_times: ["Flexible"],
    timezone: "Asia/Kolkata",
  },
  googleMeetUrl: null,
  calendarInviteSent: false,
  confirmationEmailSent: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

/**
 * Creates a new booking from the assessment payload
 */
export const createBooking = async (payload: CreateBookingPayload): Promise<BookingResponse> => {
  if (isDemoMode) {
    return new Promise(resolve => setTimeout(() => {
      resolve(generateDemoBooking(`demo_${Math.random().toString(36).substring(7)}`));
    }, 800));
  }

  // Map frontend payload to exactly match backend BookingCreate schema
  const backendPayload = {
    name: payload.name || "Anonymous",
    age: payload.age || 25,
    gender: (payload.gender || "Male").toLowerCase(),
    city: payload.city || "Unknown",
    country: payload.country || "IN",
    country_code: payload.countryCode || "+91",
    national_number: payload.nationalNumber || "0000000000",
    instagram_handle: payload.instagram || null,
    height_cm: payload.heightCm || 175,
    weight_kg: payload.weightKg || 75.0,
    fitness_level: getFitnessLevel(payload.previousExperience),
    training_level: payload.trainingLevel || "Basic Beginner",
    previous_experience: payload.previousExperience || false,
    injuries: payload.injuries || "None",
    current_routine: payload.currentRoutine || "None",
    goals: payload.goals?.length ? payload.goals : ["General Fitness"],
    equipment_available: payload.equipment?.length ? payload.equipment : ["None"],
    preferred_duration: durationMap[payload.preferredDuration || ""] || "1_month",
    fee_acknowledgement: true, // Required by backend
    preferred_days: payload.preferredDays?.length ? payload.preferredDays : ["Flexible"],
    preferred_times: payload.preferredTime?.length ? payload.preferredTime : ["Flexible"],
    timezone: "Asia/Kolkata",
  };

  // Convert None to null for JSON
  if (backendPayload.instagram_handle === undefined) backendPayload.instagram_handle = null;
  
  // The backend returns a SuccessResponse wrapper { success, data, message }
  const response = await apiClient.post<any>('/bookings', backendPayload);
  return response.data.data;
};

/**
 * Gets a booking by ID
 */
export const getBooking = async (bookingId: string): Promise<BookingResponse> => {
  if (isDemoMode && bookingId.startsWith("demo_")) {
    return new Promise(resolve => setTimeout(() => {
      resolve(generateDemoBooking(bookingId));
    }, 400));
  }

  const response = await apiClient.get<any>(`/bookings/${bookingId}`);
  return response.data.data;
};

/**
 * Schedules a slot for a specific booking
 */
export const scheduleSlot = async (bookingId: string, payload: ScheduleSlotPayload): Promise<BookingResponse> => {
  if (isDemoMode && bookingId.startsWith("demo_")) {
    const booking = await getBooking(bookingId);
    return new Promise(resolve => setTimeout(() => {
      resolve({
        ...booking,
        status: BookingStatus.SCHEDULED,
        selectedDate: payload.date,
        selectedTime: payload.time,
        googleMeetUrl: "meet.google.com/demo-url-xyz",
        calendarInviteSent: true,
        confirmationEmailSent: true,
        updatedAt: new Date().toISOString(),
      });
    }, 1000));
  }

  // Replace with real API call
  // return (await apiClient.post<any>(`/bookings/${bookingId}/schedule`, payload)).data.data;
  
  // Since we are mocking this step, we fetch the real booking from the backend, 
  // then return a mocked version of it with scheduling applied.
  const booking = await getBooking(bookingId);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedBooking: BookingResponse = {
        ...booking,
        status: BookingStatus.SCHEDULED,
        selectedDate: payload.date,
        selectedTime: payload.time,
        googleMeetUrl: "meet.google.com/mock-url-xyz",
        calendarInviteSent: true,
        confirmationEmailSent: true,
        updatedAt: new Date().toISOString(),
      };
      
      resolve(updatedBooking);
    }, 1000);
  });
};
