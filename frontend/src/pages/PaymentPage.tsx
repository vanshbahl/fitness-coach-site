import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { ShieldCheck, ArrowRight, Home, Loader2, Check } from "lucide-react";
import { Link } from "react-router";
import { STORAGE_KEY } from "../features/assessment/useAssessmentForm";
import coachPlaceholder from "../assets/coach-placeholder.png";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const assessmentData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  const fullName = assessmentData.name || "Athlete";

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate Razorpay mock process
    setTimeout(() => {
      // Clear assessment data to ensure clean state after payment
      localStorage.removeItem(STORAGE_KEY);
      navigate("/schedule");
    }, 2000);
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
          className="absolute top-[50%] -right-[30%] w-[80vw] h-[80vw] rounded-full bg-emerald-500/10 blur-[180px] mix-blend-screen"
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
            to="/"
            className="pointer-events-auto flex items-center gap-2 h-9 px-2 -ml-2 text-zinc-500 hover:text-white transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg"
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline font-medium text-sm">Home</span>
          </Link>
        </div>
      </div>

      <main className="flex-1 w-full max-w-2xl mx-auto px-6 sm:px-8 pt-24 pb-48 flex flex-col relative z-10 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Excellent work, {fullName}.</h1>
          <p className="text-zinc-400 text-[15px] sm:text-[16px] font-medium max-w-md">This session was prepared specifically for you.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 bg-white/[0.02] border border-white/10 rounded-[24px] p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
        >
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-5">Trial Summary</h3>
          <div className="space-y-4 text-[14px] text-zinc-300 mb-8 leading-relaxed">
            <p>Your assessment provides the exact baseline needed to evaluate your current strength.</p>
            <p>Abhay will analyze your metrics prior to the call. During your live session, you'll discuss roadblocks, clarify your goals, and outline a tailored protocol.</p>
            <p>This ensures your training is built strictly around your body's mechanics.</p>
          </div>
          
          {/* Premium Coach Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <img 
              src={coachPlaceholder} 
              alt="Abhay Pandey" 
              className="w-14 h-14 rounded-[12px] object-cover border border-white/10 bg-zinc-900 shrink-0" 
            />
            <div className="flex flex-col flex-1">
              <span className="font-bold text-white text-[15px] leading-tight">Abhay Pandey</span>
              <span className="text-zinc-500 text-[13px] font-medium mt-0.5">Founder • Quick Strength</span>
            </div>
            <div className="text-right flex flex-col shrink-0">
              <span className="font-semibold text-white text-[14px]">35 Minutes</span>
              <span className="text-zinc-500 text-[12px] font-medium mt-0.5">Google Meet</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 bg-white/[0.02] border border-white/10 rounded-[24px] p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-6">
            <div className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20">
              Trial Fee
            </div>
          </div>
          
          <div className="flex flex-col mb-8">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-5xl font-bold tracking-tighter text-white">₹49</span>
              <span className="text-zinc-500 font-medium text-[15px]">/ trial session</span>
            </div>
            <p className="text-[13px] text-zinc-400 leading-relaxed max-w-sm">
              A small commitment helps us reserve dedicated coaching time and reduce missed sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 pt-6 border-t border-white/5">
            {[
              "Secure Razorpay Payment",
              "Google Meet Included",
              "Calendar Invite Included",
              "No Hidden Charges"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <Check className="w-[14px] h-[14px] text-zinc-500 shrink-0" />
                <span className="text-[13px] text-zinc-300 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14"
        >
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-8">What Happens Next?</h3>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-white/10 before:to-transparent">
            {[
              "Secure Payment",
              "Choose Your Trial Session",
              "Google Calendar & Meet Invitation Created",
              "Confirmation Email Sent",
              "Join Your Live Trial Session"
            ].map((step, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-zinc-700 bg-zinc-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-2xl bg-white/[0.02] border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-md">
                  <span className="text-[14px] font-medium text-zinc-300">{step}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Floating CTA */}
      <div className="fixed bottom-[env(safe-area-inset-bottom,0px)] left-0 right-0 p-4 sm:p-6 z-40 pointer-events-none">
        <div className="max-w-2xl mx-auto flex items-center justify-between pointer-events-auto">
          {!isProcessing && (
            <button
              onClick={() => navigate("/assessment", { state: { returnToReview: true } })}
              className="h-14 sm:h-16 px-6 sm:px-8 rounded-[16px] bg-black/20 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-white font-medium hover:bg-black/40 transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex-shrink-0"
            >
              Back
            </button>
          )}
          
          <div className={`relative flex items-center ${isProcessing ? "w-full" : "ml-4 flex-1"}`}>
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full h-14 sm:h-16 rounded-[16px] bg-white text-black font-bold text-base sm:text-lg flex items-center justify-center hover:bg-zinc-200 transition-colors active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-80 disabled:pointer-events-none`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Connecting to Secure Gateway...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  Continue to Secure Payment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Blur */}
      <div className="fixed bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-30 backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black,transparent)]" />
    </div>
  );
}
