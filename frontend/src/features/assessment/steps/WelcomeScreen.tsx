import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { StepLayout } from "../components/StepLayout";

export function WelcomeScreen() {
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

      </StepLayout>
    </div>
  );
}
