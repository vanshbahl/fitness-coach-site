import { SlotResponse } from '../types/api';

/**
 * Gets available slots for a given booking
 */
export const getAvailableSlots = async (_bookingId: string): Promise<SlotResponse[]> => {
  // Replace with real API call when backend is ready
  // return (await apiClient.get<SlotResponse[]>(`/bookings/${bookingId}/slots`)).data;

  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock some slots for today and tomorrow
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const todayStr = today.toISOString().split("T")[0];
      const tomorrowStr = tomorrow.toISOString().split("T")[0];

      const mockSlots: SlotResponse[] = [
        { id: "slot-1", date: todayStr, time: "6:00 PM", isAvailable: true },
        { id: "slot-2", date: todayStr, time: "6:45 PM", isAvailable: true },
        { id: "slot-3", date: todayStr, time: "7:30 PM", isAvailable: false },
        { id: "slot-4", date: tomorrowStr, time: "8:15 AM", isAvailable: true },
        { id: "slot-5", date: tomorrowStr, time: "9:00 AM", isAvailable: true },
      ];

      resolve(mockSlots);
    }, 800);
  });
};
