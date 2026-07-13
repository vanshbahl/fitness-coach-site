import { motion } from "framer-motion";
import { Booking } from "../../../models/booking";

interface BookingSummaryProps {
  booking: Booking;
  selectedDate: string;
  selectedTime: string;
}

export function BookingSummary({ booking, selectedDate, selectedTime }: BookingSummaryProps) {
  // Format date slightly
  const dateObj = new Date(selectedDate);
  const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8"
    >
      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Booking Summary</h3>
      
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
        <div>
          <dt className="text-sm font-medium text-zinc-500 mb-1">Coach</dt>
          <dd className="font-semibold text-white">{booking.coach}</dd>
        </div>
        
        <div>
          <dt className="text-sm font-medium text-zinc-500 mb-1">Session</dt>
          <dd className="font-semibold text-white">1-on-1 Trial</dd>
        </div>
        
        <div>
          <dt className="text-sm font-medium text-zinc-500 mb-1">Platform</dt>
          <dd className="font-semibold text-white">Google Meet</dd>
        </div>
        
        <div>
          <dt className="text-sm font-medium text-zinc-500 mb-1">Duration</dt>
          <dd className="font-semibold text-white">{booking.duration}</dd>
        </div>
        
        <div>
          <dt className="text-sm font-medium text-zinc-500 mb-1">Timezone</dt>
          <dd className="font-semibold text-white">{booking.timezone}</dd>
        </div>
        
        <div>
          <dt className="text-sm font-medium text-zinc-500 mb-1">Selected Time</dt>
          <dd className="font-semibold text-orange-400">{formattedDate} at {selectedTime}</dd>
        </div>
      </dl>
    </motion.div>
  );
}
