import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { Home, X, FastForward } from "lucide-react";
import { FloatingNextButton } from "./FloatingNextButton";
import { ProgressStepper } from "./ProgressStepper";
import { DevRestartButton } from "../../../components/DevRestartButton";

interface AssessmentLayoutProps {
  children: ReactNode;
  currentStep: number;
  direction?: number;
  isSaving?: boolean;
  isValid?: boolean;
  onNext?: () => void;
  onBack?: () => void;
  hasUnlockedReview?: boolean;
  onDevSkip?: () => void;
}

export function AssessmentLayout({
  children,
  currentStep,
  direction = 1,
  isSaving = false,
  isValid = true,
  onNext,
  onBack,
  hasUnlockedReview = false,
  onDevSkip
}: AssessmentLayoutProps) {
  const navigate = useNavigate();
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const handleHomeClick = () => {
    if (currentStep > 0 && currentStep < 10) {
      setShowLeaveModal(true);
    } else {
      navigate("/");
    }
  };

  const confirmLeave = () => {
    setShowLeaveModal(false);
    navigate("/");
  };

  return (
    <motion.div className="min-h-[100dvh] bg-black text-white selection:bg-white selection:text-black flex flex-col overflow-hidden relative">

      {/* Premium Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Ambient Floating Gradients */}
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

      {/* Back to Home Navigation */}
      <div className="absolute top-0 inset-x-0 z-50 p-6 flex items-center pointer-events-none">
        <div className="w-full max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={handleHomeClick}
            className="pointer-events-auto flex items-center gap-2 h-9 px-2 -ml-2 text-zinc-500 hover:text-white transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg"
            aria-label="Back to home"
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline font-medium text-sm">Home</span>
          </button>

          <div className="pointer-events-auto flex items-center gap-2">
            {import.meta.env.DEV && onDevSkip && currentStep < 10 && (
              <button
                onClick={onDevSkip}
                className="flex items-center gap-1.5 h-8 px-3 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-500/20 transition-colors border border-emerald-500/20"
                title="Developer Shortcut: Skip to Review"
              >
                <FastForward className="w-3.5 h-3.5" />
                Dev Skip
              </button>
            )}
            <DevRestartButton />
          </div>
        </div>
      </div>

      <main className="flex-1 w-full flex flex-col relative z-10 h-[100dvh] overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="w-full max-w-2xl mx-auto px-6 sm:px-8 pt-20 pb-4">
          <ProgressStepper currentStep={currentStep} totalSteps={11} />
        </div>

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
            className="flex-1 w-full max-w-2xl mx-auto px-6 sm:px-8 flex flex-col pt-8 pb-[calc(88px+env(safe-area-inset-bottom,0px)+24px)]"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Fixed Footer Container outside scroll area */}
      {onNext && currentStep >= 0 && (
        <FloatingNextButton
          onNext={onNext}
          onBack={onBack}
          disabled={!isValid || isSaving}
          label={currentStep === 0 ? "Begin Assessment" : currentStep === 10 ? "Review Session" : hasUnlockedReview ? "Save & Return" : "Continue"}
          savingLabel={currentStep === 0 ? "Welcome" : "Saved"}
          isSaving={isSaving}
        />
      )}

      {/* Ambient Emerald Glow from bottom */}
      <AnimatePresence>
        {isSaving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed -bottom-[30vh] left-1/2 -translate-x-1/2 w-[150vw] h-[50vh] max-w-[1200px] bg-emerald-500 rounded-[100%] blur-[120px] mix-blend-screen pointer-events-none z-0"
          />
        )}
      </AnimatePresence>

      {/* Bottom Scroll Blur */}
      <div className="fixed bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-30 backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black,transparent)]" />

      {/* Leave Confirmation Modal */}
      <AnimatePresence>
        {showLeaveModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowLeaveModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Leave Assessment?</h3>
                  <button 
                    onClick={() => setShowLeaveModal(false)}
                    className="p-1 text-zinc-500 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  Your progress has been automatically saved. You can return and complete this at any time.
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setShowLeaveModal(false)}
                    className="w-full h-12 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors"
                  >
                    Continue Assessment
                  </button>
                  <button
                    onClick={confirmLeave}
                    className="w-full h-12 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors border border-white/10"
                  >
                    Leave for now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
