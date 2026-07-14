import { motion } from "framer-motion";
import { BookingResponse } from "../../../types/api";
import coachPlaceholder from "../../../assets/coach-placeholder.png";

interface BookingSummaryProps {
  booking: BookingResponse;
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
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 mb-8">
        <img 
          src={coachPlaceholder} 
          alt="Abhay Pandey" 
          className="w-16 h-16 rounded-[14px] object-cover border border-white/10 bg-zinc-900" 
        />
        <div>
          <h4 className="font-bold text-white text-lg leading-tight">{booking?.coach || "Abhay Pandey"}</h4>
          <p className="text-zinc-500 text-sm font-medium mt-0.5">Founder • Quick Strength</p>
        </div>
      </div>
      
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
        <div>
          <dt className="text-sm font-medium text-zinc-500 mb-1">Session</dt>
          <dd className="font-semibold text-white">1-on-1 Trial Session</dd>
        </div>
        
        <div>
          <dt className="text-sm font-medium text-zinc-500 mb-1">Platform</dt>
          <dd className="font-semibold text-white flex flex-col">
            <span>Google Meet</span>
            <span className="text-xs font-normal text-zinc-500 mt-1 max-w-[200px] leading-snug">Your Google Meet link will be emailed immediately after confirmation.</span>
          </dd>
        </div>
        
        <div>
          <dt className="text-sm font-medium text-zinc-500 mb-1">Duration</dt>
          <dd className="font-semibold text-white">35 Minutes</dd>
        </div>
        
        <div>
          <dt className="text-sm font-medium text-zinc-500 mb-1">Timezone</dt>
          <dd className="font-semibold text-white flex flex-col">
            <span>Asia/Kolkata (IST)</span>
            <span className="text-xs font-normal text-zinc-500 mt-1">UTC +05:30</span>
          </dd>
        </div>
        
        <div className="sm:col-span-2 pt-2 border-t border-white/10">
          <dt className="text-sm font-medium text-zinc-500 mb-1">Selected Time</dt>
          <dd className="text-lg font-bold text-emerald-400">{formattedDate} at {selectedTime}</dd>
        </div>
      </dl>
    </motion.div>
  );
}
