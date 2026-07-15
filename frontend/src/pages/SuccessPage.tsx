import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Home, Calendar, Clock, Video, Globe } from "lucide-react";
import { DevRestartButton } from "../components/DevRestartButton";
import { useBookingStatus } from "../hooks/api/booking";
import coachPlaceholder from "../assets/coach-placeholder.png";

export enum SessionStatus {
  CONFIRMED = "CONFIRMED",
  RESCHEDULED = "RESCHEDULED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED"
}

const getStatusConfig = (status: SessionStatus) => {
  switch (status) {
    case SessionStatus.CONFIRMED:
      return { label: "Confirmed", color: "emerald" };
    case SessionStatus.RESCHEDULED:
      return { label: "Rescheduled", color: "blue" };
    case SessionStatus.CANCELLED:
      return { label: "Cancelled", color: "red" };
    case SessionStatus.COMPLETED:
      return { label: "Completed", color: "zinc" };
    default:
      return { label: "Confirmed", color: "emerald" };
  }
};

export default function SuccessPage() {
  const navigate = useNavigate();
  const bookingId = localStorage.getItem("qs_booking_id");
  const { data: booking, isLoading } = useBookingStatus(bookingId);

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] bg-black text-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Formatting helpers for date and time
  const dateObj = booking?.selectedDate || booking?.scheduled_at ? new Date((booking.selectedDate || booking.scheduled_at) as string) : null;
  const formattedDate = dateObj 
    ? dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) 
    : "Date unavailable";
  const formattedTime = booking?.selectedTime || "Time unavailable";
  const timezone = booking?.timezone || "Asia/Kolkata";
  const coachName = booking?.coach || "Abhay Pandey";
  
  // Future-proofing: Derive the SessionStatus based on actual backend data
  // Currently assuming CONFIRMED for the success page flow
  const sessionStatus = SessionStatus.CONFIRMED;
  const statusConfig = getStatusConfig(sessionStatus);

  return (
    <div className="min-h-[100dvh] bg-black text-white selection:bg-white selection:text-black flex flex-col overflow-hidden relative items-center justify-center pt-24 pb-24 overflow-y-auto scrollbar-hide">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-2%", "2%", "0%"], y: ["0%", "2%", "-2%", "0%"], opacity: [0.03, 0.05, 0.03] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[20%] w-[90vw] h-[90vw] rounded-full bg-emerald-500/10 blur-[150px] mix-blend-screen"
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.015] mix-blend-overlay pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <main className="relative z-10 w-full max-w-xl px-6 sm:px-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex flex-col items-center text-center mb-10"
        >
          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <svg className="w-10 h-10 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <motion.path 
                initial={{ pathLength: 0 }} 
                animate={{ pathLength: 1 }} 
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} 
                d="M20 6L9 17l-5-5" 
              />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">You're All Set.</h1>
          <div className="text-zinc-400 text-base leading-relaxed max-w-sm flex flex-col gap-4">
            <p>
              <b>Your trial session has been successfully scheduled.</b> We've reserved your selected time slot.
            </p>
            <p>
              You'll receive a confirmation email shortly containing:
            </p>
            <ul className="text-left text-sm space-y-1 mx-auto w-fit pl-2 border-l border-emerald-500/30">
              <li>• Google Meet link</li>
              <li>• Calendar invitation</li>
              <li>• Session details</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden"
        >
          <div className={`absolute top-0 left-0 w-1.5 h-full bg-${statusConfig.color}-500`} />
          
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full bg-${statusConfig.color}-500/10 flex items-center justify-center border border-${statusConfig.color}-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]`}>
                <Calendar className={`w-4 h-4 text-${statusConfig.color}-500`} />
              </div>
              <h3 className={`text-sm font-bold uppercase tracking-widest text-${statusConfig.color}-500`}>Scheduled Trial Session</h3>
            </div>
          </div>
          
          <div className="pb-6 border-b border-white/10 mb-6 flex flex-col gap-2">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Session Status</span>
              <div className={`flex items-center gap-2 text-${statusConfig.color}-500 font-semibold text-sm bg-${statusConfig.color}-500/10 border border-${statusConfig.color}-500/20 w-fit px-3 py-1.5 rounded-full`}>
                <span className={`w-2 h-2 rounded-full bg-${statusConfig.color}-500 animate-pulse`} />
                {statusConfig.label}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-1.5">Selected Date</p>
              <div className="flex items-center gap-2 text-zinc-300 font-medium">
                <Calendar className="w-4 h-4 text-zinc-400" />
                {formattedDate}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-1.5">Selected Time</p>
              <div className="flex items-center gap-2 text-zinc-300 font-medium">
                <Clock className="w-4 h-4 text-zinc-400" />
                {formattedTime}
              </div>
            </div>
            <div className="sm:col-span-2">
              <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-1.5">Timezone</p>
              <div className="flex items-center gap-2 text-zinc-300 font-medium">
                <Globe className="w-4 h-4 text-zinc-400" />
                {timezone}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5">
            <div className="flex items-center gap-4">
              <img 
                src={coachPlaceholder} 
                alt={coachName} 
                className="w-12 h-12 rounded-full object-cover border border-white/10 bg-zinc-900" 
              />
              <div>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">Coach</p>
                <h4 className="font-bold text-white text-[15px] leading-tight">{coachName}</h4>
              </div>
            </div>
            <div className="text-right">
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">Platform</p>
                <div className="flex items-center justify-end gap-1.5 font-semibold text-zinc-300 text-[13px]">
                  <Video className="w-3.5 h-3.5" />
                  Google Meet
                </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 mb-10"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">What Happens Next</h3>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-[calc(100%-24px)] before:w-0.5 before:bg-gradient-to-b before:from-emerald-500/50 before:via-white/10 before:to-transparent">
            {[
              { 
                title: "Assessment Completed", 
                desc: "Your assessment has been successfully submitted.", 
                status: "done" 
              },
              { 
                title: "Session Scheduled", 
                desc: "Your selected time slot has been reserved.", 
                status: "done" 
              },
              { 
                title: "Confirmation Email", 
                desc: "You'll receive your Google Meet link and calendar invitation shortly.", 
                status: "active" 
              },
              { 
                title: "Join Your Session", 
                desc: "Join using the link in your confirmation email at the scheduled time.", 
                status: "pending" 
              }
            ].map((step, i) => (
              <div key={i} className="relative flex gap-4">
                <div className={`w-6 h-6 mt-0.5 flex items-center justify-center rounded-full border shrink-0 z-10 bg-black ${step.status === 'active' ? "border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]" : step.status === 'done' ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-white/10"}`}>
                  {step.status === 'active' ? (
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  ) : step.status === 'done' ? (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  ) : null}
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-bold ${step.status === 'pending' ? 'text-zinc-400' : 'text-white'}`}>
                    {step.title}
                  </span>
                  <span className="text-[13px] text-zinc-500 mt-1 whitespace-pre-line leading-relaxed">
                    {step.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col gap-6 w-full"
        >
          <button
            onClick={() => navigate("/")}
            className="w-full h-14 rounded-2xl bg-white text-black font-bold text-base flex items-center justify-center hover:bg-zinc-200 transition-colors active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </button>
          
          <div className="flex justify-center mt-4">
            <DevRestartButton />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
