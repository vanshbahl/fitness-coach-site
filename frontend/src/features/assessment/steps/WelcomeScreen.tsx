import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { StepLayout } from "../components/StepLayout";

interface WelcomeScreenProps {
  onNext: () => void;
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col justify-center min-h-[60vh]">
      <StepLayout 
        title="Let's Build Your Athlete Profile"
        subtitle="Complete this short assessment so I can understand exactly where you're starting from."
      >
        <div className="flex flex-col gap-5 mt-8 max-w-sm mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10"
          >
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span className="font-semibold text-white">11 Guided Questions</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10"
          >
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span className="font-semibold text-white">~90 Seconds</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10"
          >
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span className="font-semibold text-white">₹49 Trial Session via Google Meet</span>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 w-full max-w-sm mx-auto"
        >
          <button
            onClick={onNext}
            className="w-full h-16 rounded-2xl bg-white text-black font-bold text-lg flex items-center justify-center hover:bg-zinc-200 transition-colors active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Begin Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </motion.div>
      </StepLayout>
    </div>
  );
}
