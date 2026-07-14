import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

interface FloatingConfirmButtonProps {
  onConfirm: () => void;
  disabled: boolean;
}

const SEQUENCE = [
  "✓ Session Reserved",
  "Creating Google Meet...",
  "Preparing Calendar Invite...",
  "Finalizing Booking..."
];

export function FloatingConfirmButton({ onConfirm, disabled }: FloatingConfirmButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [sequenceIndex, setSequenceIndex] = useState(0);

  useEffect(() => {
    if (!isConfirming) return;

    if (sequenceIndex < SEQUENCE.length - 1) {
      const timer = setTimeout(() => {
        setSequenceIndex(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onConfirm();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isConfirming, sequenceIndex, onConfirm]);

  const handleConfirmClick = () => {
    if (disabled || isConfirming) return;
    setIsConfirming(true);
    setSequenceIndex(0);
  };

  return (
    <>
      <div className="fixed bottom-[env(safe-area-inset-bottom,0px)] left-0 right-0 p-4 sm:p-6 z-40 pointer-events-none">
        <div className="max-w-2xl mx-auto flex items-center justify-between pointer-events-auto">
          <motion.div 
            layout
            className="relative flex items-center w-full"
          >
            <motion.button
              layout
              onClick={handleConfirmClick}
              disabled={disabled || isConfirming}
              className={`
                w-full h-14 sm:h-16 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white overflow-hidden
                ${disabled 
                  ? "bg-white/10 text-zinc-500 cursor-not-allowed" 
                  : isConfirming 
                    ? "bg-emerald-500 text-black shadow-[0_0_30px_rgba(16,185,129,0.3)]" 
                    : "bg-white text-black hover:bg-zinc-200 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                }
              `}
            >
              <AnimatePresence mode="wait">
                {isConfirming ? (
                  <motion.div
                    key={sequenceIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center"
                  >
                    {sequenceIndex === 0 && <Check className="w-5 h-5 mr-2" />}
                    {SEQUENCE[sequenceIndex]}
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    Confirm Trial Session
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Blur */}
      <div className="fixed bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-30 backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black,transparent)]" />
      
      {/* Ambient Emerald Glow when confirming */}
      <AnimatePresence>
        {isConfirming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed -bottom-[30vh] left-1/2 -translate-x-1/2 w-[150vw] h-[50vh] max-w-[1200px] bg-emerald-500 rounded-[100%] blur-[120px] mix-blend-screen pointer-events-none z-0"
          />
        )}
      </AnimatePresence>
    </>
  );
}
