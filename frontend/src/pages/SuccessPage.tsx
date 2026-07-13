import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { CheckCircle2, Home, Calendar } from "lucide-react";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-black text-white selection:bg-white selection:text-black flex flex-col overflow-hidden relative items-center justify-center pt-20 pb-20">
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

      <main className="relative z-10 w-full max-w-2xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Booking Confirmed</h1>
          <p className="text-zinc-400 text-lg">Your athlete profile and payment have been received.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md mx-auto mb-12"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">What's Next</h3>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-[calc(100%-24px)] before:w-0.5 before:bg-gradient-to-b before:from-emerald-500/50 before:to-transparent">
            {[
              { label: "Assessment Received", active: true },
              { label: "Payment Confirmed", active: true },
              { label: "Coach Reviews Profile", active: false },
              { label: "Google Meet Scheduled", active: false },
              { label: "Confirmation Email Sent", active: false }
            ].map((step, i) => (
              <div key={i} className="relative flex items-center gap-4">
                <div className={`w-6 h-6 flex items-center justify-center rounded-full border shrink-0 z-10 bg-black ${step.active ? "border-emerald-500" : "border-white/10"}`}>
                  {step.active ? (
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  ) : null}
                </div>
                <span className={`text-sm font-medium ${step.active ? "text-white" : "text-zinc-500"}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col gap-3 max-w-sm mx-auto"
        >
          <button
            onClick={() => navigate("/booking")}
            className="w-full h-14 rounded-2xl bg-white text-black font-bold text-base flex items-center justify-center hover:bg-zinc-200 transition-colors active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Calendar className="w-5 h-5 mr-2" />
            View Booking Status
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="w-full h-14 rounded-2xl bg-transparent border border-white/10 text-white font-medium text-base flex items-center justify-center hover:bg-white/5 transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </button>
        </motion.div>
      </main>
    </div>
  );
}
