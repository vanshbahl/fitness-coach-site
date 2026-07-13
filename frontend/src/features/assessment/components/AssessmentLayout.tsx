import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";
import { FloatingNextButton } from "./FloatingNextButton";

interface AssessmentLayoutProps {
  children: ReactNode;
  currentStep: number;
  onReset?: () => void;
  direction?: number;
  isSaving?: boolean;
  isValid?: boolean;
  onNext?: () => void;
  onBack?: () => void;
}

export function AssessmentLayout({ 
  children, 
  currentStep, 
  onReset,
  direction = 1,
  isSaving = false,
  isValid = true,
  onNext,
  onBack
}: AssessmentLayoutProps) {
  return (
    <div className="min-h-[100dvh] bg-black text-white selection:bg-white selection:text-black flex flex-col overflow-hidden relative">
      
      {/* Premium Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Ambient Floating Gradients (Bug 7) */}
        <motion.div 
          animate={{ 
            x: ["0%", "-2%", "2%", "0%"],
            y: ["0%", "2%", "-2%", "0%"],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[30%] -left-[20%] w-[90vw] h-[90vw] rounded-full bg-orange-500/10 blur-[150px] mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            x: ["0%", "2%", "-2%", "0%"],
            y: ["0%", "-2%", "2%", "0%"],
            opacity: [0.02, 0.04, 0.02]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[50%] -right-[30%] w-[80vw] h-[80vw] rounded-full bg-white/20 blur-[180px] mix-blend-screen"
        />
        
        {/* Barely visible noise texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.015] mix-blend-overlay pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Back to Home Navigation (Bug 1) */}
      <div className="absolute top-0 inset-x-0 z-50 p-6 flex items-center pointer-events-none">
        <div className="w-full max-w-2xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="pointer-events-auto flex items-center gap-1 h-9 px-2 -ml-2 text-zinc-500 hover:text-white transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg"
            aria-label="Back to home"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline font-medium text-sm">Back</span>
          </Link>

          {/* Dev Tool: Reset Form aligned properly */}
          {import.meta.env.DEV && onReset && (
            <button 
              onClick={onReset}
              className="pointer-events-auto flex items-center h-9 px-3 rounded-lg text-xs font-medium text-zinc-400 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Restart
            </button>
          )}
        </div>
      </div>
      
      <main className="flex-1 w-full flex flex-col relative z-10 h-[100dvh] overflow-y-auto overflow-x-hidden scrollbar-hide">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={{
              enter: (dir: number) => ({ opacity: 0, x: dir * 20, scale: 0.98 }),
              center: { opacity: 1, x: 0, scale: 1 },
              exit: (dir: number) => ({ opacity: 0, x: dir * -20, scale: 0.98 })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full max-w-2xl mx-auto px-6 sm:px-8 flex flex-col pt-12 pb-[calc(88px+env(safe-area-inset-bottom,0px)+24px)]"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Fixed Footer Container outside scroll area */}
      {onNext && currentStep > 0 && (
        <FloatingNextButton 
          onNext={onNext} 
          onBack={onBack} 
          disabled={!isValid || isSaving}
          label={currentStep === 10 ? "Proceed to Payment" : "Continue"}
          isSaving={isSaving}
        />
      )}

      {/* Success Emerald Glow (Bug 5) */}
      <AnimatePresence>
        {isSaving && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-[-10vh] left-1/2 -translate-x-1/2 w-[100vw] sm:w-[80vw] h-[60vh] max-w-[800px] bg-emerald-500 rounded-full blur-[150px] mix-blend-screen pointer-events-none z-20"
          />
        )}
      </AnimatePresence>

      {/* Bottom Scroll Blur (Bug 6) */}
      <div className="fixed bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-30 backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black,transparent)]" />
    </div>
  );
}
