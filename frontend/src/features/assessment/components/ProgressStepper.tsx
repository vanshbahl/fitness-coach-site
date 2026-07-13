import { motion, AnimatePresence } from "framer-motion";

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressStepper({ currentStep, totalSteps }: ProgressStepperProps) {
  // Step 0 is the welcome screen, no stepper needed there.
  if (currentStep === 0) return null;

  const CHAPTERS: Record<number, string> = {
    1: "Basics",
    2: "Goals",
    3: "Equipment",
    4: "Availability",
    5: "Metrics",
    6: "Health",
    7: "Contact",
    8: "Commitment",
    9: "Your Profile",
    10: "Payment"
  };

  return (
    <div className="w-full flex flex-col items-center gap-3 pt-6 pb-2 z-20">
      <div className="flex flex-col items-center w-full max-w-[200px] sm:max-w-xs gap-3">
        <div className="h-4 flex justify-center overflow-hidden relative w-full">
          <AnimatePresence mode="popLayout">
            <motion.span 
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-white absolute"
            >
              {CHAPTERS[currentStep] || "Progress"}
            </motion.span>
          </AnimatePresence>
        </div>
        
        <div className="w-full flex items-center gap-1 h-[2px] relative">
          {Array.from({ length: totalSteps }).map((_, i) => {
            const stepNum = i + 1;
            const isCompleted = stepNum <= currentStep;
            const isJustActivated = stepNum === currentStep;

            return (
              <motion.div
                key={stepNum}
                className="h-full flex-1 rounded-full relative"
                initial={false}
                animate={{
                  backgroundColor: isJustActivated 
                    ? ["#ffffff", "#f97316", "#ffffff"] 
                    : isCompleted 
                      ? "#ffffff" 
                      : "rgba(255,255,255,0.1)",
                  scaleY: isJustActivated ? [1, 2, 1] : 1,
                }}
                transition={{ duration: 0.6, times: [0, 0.4, 1], ease: "easeInOut" }}
              >
                <AnimatePresence>
                  {isJustActivated && (
                    <motion.div 
                      className="absolute inset-0 bg-orange-500 rounded-full blur-[4px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }} // blooms then disappears
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, times: [0, 0.4, 1], ease: "easeInOut" }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
