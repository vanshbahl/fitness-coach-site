import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { Home } from "lucide-react";
import { Link } from "react-router";

import { BookingHero } from "../features/booking/components/BookingHero";
import { WeeklyCalendar } from "../features/booking/components/WeeklyCalendar";
import { TimeSlots } from "../features/booking/components/TimeSlots";
import { BookingSummary } from "../features/booking/components/BookingSummary";
import { FloatingConfirmButton } from "../features/booking/components/FloatingConfirmButton";
import { DevRestartButton } from "../components/DevRestartButton";

import { useBookingStatus, useAvailableSlots, useScheduleSlot } from "../hooks/api/booking";

export default function ScheduleBookingPage() {
  const bookingId = localStorage.getItem("qs_booking_id");
  const { data: booking, isLoading: bookingLoading } = useBookingStatus(bookingId);
  const { data: availableSlots = [], isLoading: slotsLoading } = useAvailableSlots(bookingId);
  const scheduleMutation = useScheduleSlot();
  
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  if (bookingLoading || slotsLoading) {
    return (
      <div className="min-h-[100dvh] bg-black text-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!booking) return null;

  const handleConfirm = () => {
    if (selectedDate && selectedTime && bookingId) {
      scheduleMutation.mutate(
        { bookingId, payload: { date: selectedDate, time: selectedTime } },
        {
          onSuccess: () => navigate("/booking")
        }
      );
    }
  };

  return (
    <div className="min-h-[100dvh] bg-black text-white selection:bg-white selection:text-black flex flex-col overflow-hidden relative">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-2%", "2%", "0%"], y: ["0%", "2%", "-2%", "0%"], opacity: [0.03, 0.05, 0.03] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[30%] -left-[20%] w-[90vw] h-[90vw] rounded-full bg-orange-500/10 blur-[150px] mix-blend-screen"
        />
        <motion.div
          animate={{ x: ["0%", "2%", "-2%", "0%"], y: ["0%", "-2%", "2%", "0%"], opacity: [0.02, 0.04, 0.02] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[50%] -right-[30%] w-[80vw] h-[80vw] rounded-full bg-white/20 blur-[180px] mix-blend-screen"
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.015] mix-blend-overlay pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Navigation */}
      <div className="absolute top-0 inset-x-0 z-50 p-6 flex items-center pointer-events-none">
        <div className="w-full max-w-2xl mx-auto flex items-center justify-between">
          <Link
            to="/booking"
            className="pointer-events-auto flex items-center gap-2 h-9 px-2 -ml-2 text-zinc-500 hover:text-white transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg"
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline font-medium text-sm">Dashboard</span>
          </Link>
          <DevRestartButton />
        </div>
      </div>

      <main className="flex-1 w-full flex flex-col relative z-10 h-[100dvh] overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="w-full max-w-2xl mx-auto px-6 sm:px-8 pt-24 pb-[calc(88px+env(safe-area-inset-bottom,0px)+24px)] flex flex-col gap-10">
          
          <BookingHero coach={booking.coach} duration={booking.duration} timezone={booking.timezone} />

          <WeeklyCalendar 
            selectedDate={selectedDate} 
            availableSlots={availableSlots}
            onSelectDate={(date) => {
              setSelectedDate(date);
              setSelectedTime(null); // Reset time when date changes
            }} 
          />

          <AnimatePresence mode="popLayout">
            {selectedDate && (
              <TimeSlots 
                key="timeslots"
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                availableSlots={availableSlots}
                onSelectTime={setSelectedTime}
              />
            )}
            
            {selectedDate && selectedTime && (
              <BookingSummary
                key="summary"
                booking={booking}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
            )}
          </AnimatePresence>

        </div>
      </main>

      <FloatingConfirmButton 
        onConfirm={handleConfirm}
        disabled={!selectedDate || !selectedTime}
      />
    </div>
  );
}
