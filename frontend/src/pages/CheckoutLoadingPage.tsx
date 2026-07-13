import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { Check, CircleDashed, Circle } from "lucide-react";

const STAGES = [
  "Assessment Complete",
  "Creating Booking",
  "Preparing Secure Payment",
  "Redirecting"
];

export default function CheckoutLoadingPage() {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(1);

  useEffect(() => {
    // Stage 1: Creating Booking (already set initially)
    const t1 = setTimeout(() => setCurrentStage(2), 1500);
    // Stage 2: Preparing Secure Payment
    const t2 = setTimeout(() => setCurrentStage(3), 3000);
    // Complete
    const t3 = setTimeout(() => navigate("/success"), 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [navigate]);

  return (
    <div className="min-h-[100dvh] bg-black text-white selection:bg-white selection:text-black flex flex-col overflow-hidden relative items-center justify-center">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.03, 0.08, 0.03], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] rounded-full bg-emerald-500/20 blur-[150px] mix-blend-screen"
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.015] mix-blend-overlay pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-sm px-8">
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500/30 before:to-transparent">
          {STAGES.map((stage, i) => {
            const isCompleted = i < currentStage;
            const isCurrent = i === currentStage;
            const isPending = i > currentStage;

            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isPending ? 0.4 : 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-center gap-4"
              >
                <div className="w-6 h-6 flex items-center justify-center shrink-0 z-10 bg-black rounded-full">
                  <AnimatePresence mode="popLayout">
                    {isCompleted ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
                      >
                        <Check className="w-3.5 h-3.5 text-black" />
                      </motion.div>
                    ) : isCurrent ? (
                      <motion.div
                        key="spinner"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, rotate: 360 }}
                        transition={{ rotate: { duration: 2, repeat: Infinity, ease: "linear" } }}
                        className="text-emerald-400"
                      >
                        <CircleDashed className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div key="pending" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Circle className="w-4 h-4 text-zinc-600" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <motion.span 
                  animate={{ 
                    color: isCompleted ? "#a1a1aa" : isCurrent ? "#ffffff" : "#52525b",
                    scale: isCurrent ? 1.05 : 1,
                  }}
                  className="font-medium transform-gpu origin-left"
                >
                  {stage}
                </motion.span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
