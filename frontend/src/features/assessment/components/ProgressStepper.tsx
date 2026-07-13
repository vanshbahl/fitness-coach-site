import { motion, AnimatePresence } from "framer-motion";

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressStepper({ currentStep, totalSteps }: ProgressStepperProps) {
  // Step 0 is the welcome screen, no stepper needed there.
  if (currentStep === 0) return null;

  return (
    <div className="w-full flex flex-col items-center gap-3 pt-6 pb-2 z-20">
      <div className="flex items-center w-full max-w-[200px] sm:max-w-xs justify-between gap-3">
        <div className="w-4 flex justify-center overflow-hidden relative h-4">
          <AnimatePresence mode="popLayout">
            <motion.span 
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-[10px] font-bold tracking-widest text-white absolute"
            >
              {String(Math.max(1, currentStep)).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>
        
        <div className="flex-1 flex items-center h-[2px] bg-white/10 rounded-full relative">
          <motion.div 
            className="absolute top-0 left-0 bottom-0 bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
          {/* Tip Glow (Bug 8) */}
          <motion.div
            key={`glow-${currentStep}`}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full blur-[6px] mix-blend-screen pointer-events-none"
            initial={{ left: `${((currentStep - 1) / totalSteps) * 100}%`, opacity: 0 }}
            animate={{ 
              left: `${(currentStep / totalSteps) * 100}%`,
              opacity: [0, 0.8, 0]
            }}
            transition={{ 
              left: { type: "spring", stiffness: 100, damping: 20 },
              opacity: { duration: 0.8, ease: "easeInOut" }
            }}
          />
        </div>

        <span className="text-[10px] font-bold tracking-widest text-zinc-700">
          {String(totalSteps).padStart(2, "0")}
        </span>
      </div>

      <p className="text-[10px] font-medium text-zinc-500">
        Estimated time: ~{Math.max(10, 90 - (currentStep * 8))}s
      </p>
    </div>
  );
}
