import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBooking, getBooking, scheduleSlot } from "../../services/booking.service";
import { getAvailableSlots } from "../../services/slot.service";
import { CreateBookingPayload, ScheduleSlotPayload } from "../../types/api";

export const bookingKeys = {
  all: ["bookings"] as const,
  details: () => [...bookingKeys.all, "detail"] as const,
  detail: (id: string) => [...bookingKeys.details(), id] as const,
};

export const slotKeys = {
  all: ["slots"] as const,
  booking: (bookingId: string) => [...slotKeys.all, bookingId] as const,
};

export function useCreateBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (payload: CreateBookingPayload) => createBooking(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(bookingKeys.detail(data.id), data);
    },
  });
}

export function useBookingStatus(bookingId: string | null) {
  return useQuery({
    queryKey: bookingKeys.detail(bookingId as string),
    queryFn: () => getBooking(bookingId as string),
    enabled: !!bookingId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useScheduleSlot() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ bookingId, payload }: { bookingId: string; payload: ScheduleSlotPayload }) => 
      scheduleSlot(bookingId, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(bookingKeys.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
    },
  });
}

export function useAvailableSlots(bookingId: string | null) {
  return useQuery({
    queryKey: slotKeys.booking(bookingId as string),
    queryFn: () => getAvailableSlots(bookingId as string),
    enabled: !!bookingId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
