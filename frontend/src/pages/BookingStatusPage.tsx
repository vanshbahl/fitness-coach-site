import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { Clock, Calendar as CalendarIcon, Video, ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { useBookingStatus } from "../hooks/api/booking";
import { BookingStatus } from "../types/api";
import { DevRestartButton } from "../components/DevRestartButton";

export default function BookingStatusPage() {
  const bookingId = localStorage.getItem("qs_booking_id");
  const { data: booking, isLoading, isError } = useBookingStatus(bookingId);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] bg-black text-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="min-h-[100dvh] bg-black text-white flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-xl font-bold mb-2">Booking Not Found</h2>
          <p className="text-zinc-400 mb-6">We couldn't load your booking details.</p>
          <button onClick={() => navigate("/")} className="px-6 py-3 bg-white text-black font-bold rounded-xl">Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-black text-white selection:bg-white selection:text-black flex flex-col overflow-hidden relative pb-20">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "2%", "-2%", "0%"], y: ["0%", "-2%", "2%", "0%"], opacity: [0.02, 0.04, 0.02] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] w-[80vw] h-[80vw] rounded-full bg-orange-500/10 blur-[180px] mix-blend-screen"
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.015] mix-blend-overlay pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </Link>
          <span className="text-sm font-bold tracking-widest uppercase text-white">Booking Status</span>
          <DevRestartButton />
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-2xl mx-auto px-6 sm:px-8 pt-12">
        
        {booking.status === BookingStatus.PENDING ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 text-amber-500">
                  <Clock className="w-4 h-4" />
                </div>
                <h1 className="text-2xl font-bold">Pending Scheduling</h1>
              </div>
              <p className="text-zinc-400">
                Coach Abhay has reviewed your athlete profile. You can now select a time for your Google Meet session.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8"
            >
              <button
                onClick={() => navigate(`/booking/${booking.id}/schedule`)}
                className="w-full h-14 rounded-2xl bg-white text-black font-bold text-base flex items-center justify-center hover:bg-zinc-200 transition-colors active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Schedule Session
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h1 className="text-2xl font-bold">Scheduled</h1>
              </div>
              <p className="text-zinc-400">
                Your trial session with {booking.coach} is confirmed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-10 bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Booking Details</h3>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 shrink-0">
                    <Video className="w-5 h-5 text-zinc-300" />
                  </div>
                  <div>
                    <p className="font-medium text-white">1-on-1 Trial Assessment</p>
                    <p className="text-sm text-zinc-500 mt-1">Google Meet • {booking.duration}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 shrink-0">
                    <CalendarIcon className="w-5 h-5 text-zinc-300" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{booking.selectedDate} at {booking.selectedTime}</p>
                    <p className="text-sm text-zinc-500 mt-1">{booking.timezone}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-white/10 before:to-transparent"
            >
              <div className="relative flex items-center gap-4 group">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-emerald-500 bg-black shrink-0 z-10">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                </div>
                <span className="text-sm font-medium text-white">Calendar Invite Sent</span>
              </div>
              <div className="relative flex items-center gap-4 group">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-emerald-500 bg-black shrink-0 z-10">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                </div>
                <span className="text-sm font-medium text-white">Confirmation Email Sent</span>
              </div>
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
}
