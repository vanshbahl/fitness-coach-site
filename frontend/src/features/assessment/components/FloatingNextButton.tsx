import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

interface FloatingNextButtonProps {
  onNext: () => void;
  onBack?: () => void;
  disabled?: boolean;
  label?: string;
  isSaving?: boolean;
  savingLabel?: string;
}

export function FloatingNextButton({ onNext, onBack, disabled = false, label = "Continue", isSaving = false, savingLabel = "Saved" }: FloatingNextButtonProps) {
  return (
    <div className="fixed bottom-[env(safe-area-inset-bottom,0px)] left-0 right-0 p-4 sm:p-6 z-40 pointer-events-none">
      <motion.div layout className="max-w-md mx-auto flex items-center justify-between gap-3 relative pointer-events-auto">
        <AnimatePresence initial={false}>
          {onBack && !isSaving && (
            <motion.button 
              layout
              initial={{ opacity: 0, scale: 0.8, width: 0, marginRight: 0 }}
              animate={{ opacity: 1, scale: 1, width: 56, marginRight: 12 }}
              exit={{ opacity: 0, scale: 0.8, width: 0, marginRight: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={onBack}
              className="h-14 rounded-[16px] bg-black/20 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-shrink-0 items-center justify-center text-white overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white hover:bg-black/40 transition-colors"
              aria-label="Go back"
            >
              <div className="flex items-center justify-center min-w-[56px]">
                <ArrowLeft className="w-6 h-6" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          layout
          onClick={onNext}
          disabled={disabled || isSaving}
          initial={false}
          animate={{
            backgroundColor: isSaving ? "#10b981" : disabled ? "#27272a" : "#ffffff",
            color: isSaving ? "#ffffff" : disabled ? "#71717a" : "#000000",
            borderColor: disabled ? "transparent" : "transparent"
          }}
          whileHover={disabled || isSaving ? {} : { 
            y: -2, 
            boxShadow: "0 8px 20px -4px rgba(249, 115, 22, 0.15), 0 0 12px rgba(249, 115, 22, 0.3)" 
          }}
          whileTap={disabled || isSaving ? {} : { scale: 0.985 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="flex-1 h-14 rounded-2xl font-bold text-lg flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white group shadow-[0_4px_14px_0_rgba(255,255,255,0.1),inset_0_-2px_0_rgba(0,0,0,0.05)] relative overflow-hidden"
        >
          {isSaving && (
             <motion.div 
               layoutId="emeraldGlow"
               className="absolute inset-0 bg-emerald-400 blur-xl opacity-40 z-0"
             />
          )}

          <AnimatePresence mode="wait">
            {isSaving ? (
              <motion.div
                key="saving"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 relative z-10"
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{savingLabel}</span>
              </motion.div>
            ) : (
              <motion.div
                key="continue"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.2 }}
                className="flex items-center relative z-10"
              >
                {label}
                {!disabled && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-[3px] transition-transform duration-300" />}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </div>
  );
}
