import { motion } from "framer-motion";
import { CheckCircle2, Video, Clock } from "lucide-react";
import { StepLayout } from "../components/StepLayout";

interface Step10Props {
}

export function Step10Preparation({ }: Step10Props) {
  return (
    <>
      <StepLayout title="You're Ready." subtitle="Based on your assessment, Abhay now has enough information to understand your goals.">
        <div className="flex flex-col items-center mt-12 pb-32 max-w-sm mx-auto w-full">
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="w-full bg-white/5 border border-white/20 rounded-3xl p-8 relative overflow-hidden text-center shadow-[0_0_50px_rgba(255,255,255,0.05)]"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-50" />
            
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Secure Your Trial</h3>
            <p className="text-zinc-400 text-sm mb-8">
              The final step is securing your 1-on-1 assessment session.
            </p>

            <div className="flex flex-col gap-4 text-left">
              <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl">
                <Video className="w-5 h-5 text-zinc-400" />
                <span className="text-zinc-300 font-medium">Google Meet (Online)</span>
              </div>
              <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl">
                <Clock className="w-5 h-5 text-zinc-400" />
                <span className="text-zinc-300 font-medium">~45 Minutes</span>
              </div>
              <div className="flex items-center justify-between bg-white/10 p-4 rounded-xl border border-white/10 mt-2">
                <span className="font-semibold text-white">One-time Fee</span>
                <span className="text-xl font-bold text-emerald-400">₹49</span>
              </div>
            </div>
          </motion.div>

        </div>
      </StepLayout>

    </>
  );
}
