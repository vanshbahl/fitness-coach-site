import { motion, Variants } from "framer-motion";
import { CheckCircle2, MessageSquare, Video, Activity } from "lucide-react";

export function WhatYouGet() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative w-full bg-black py-24 sm:py-32 px-6 sm:px-8 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        
        {/* Sticky Header */}
        <div className="md:w-1/3 relative">
          <div className="sticky top-32">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
              What You'll Get
            </h2>
            <p className="text-lg text-zinc-400">
              The complete system for mastering your bodyweight, delivered through a premium coaching experience.
            </p>
          </div>
        </div>

        {/* Scrolling Cards */}
        <div className="md:w-2/3">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-4"
          >
            <motion.div variants={itemVariants} className="group relative bg-zinc-950 border border-white/5 p-8 rounded-3xl overflow-hidden hover:bg-zinc-900 transition-colors duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <CheckCircle2 className="w-32 h-32" />
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">Custom Training Blocks</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10 max-w-md">
                Periodized 4-week training blocks designed around your specific goals. Sets, reps, and tempos strictly defined.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="group relative bg-zinc-950 border border-white/5 p-8 rounded-3xl overflow-hidden hover:bg-zinc-900 transition-colors duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Video className="w-32 h-32" />
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <Video className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">Video Form Analysis</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10 max-w-md">
                Submit videos of your sets. I provide detailed, frame-by-frame breakdowns to correct biomechanics and prevent injury.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="group relative bg-zinc-950 border border-white/5 p-8 rounded-3xl overflow-hidden hover:bg-zinc-900 transition-colors duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <MessageSquare className="w-32 h-32" />
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <MessageSquare className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">Direct Priority Access</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10 max-w-md">
                Questions about nutrition? Dealing with wrist pain? You get direct messaging access for ongoing adjustments.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="group relative bg-zinc-950 border border-white/5 p-8 rounded-3xl overflow-hidden hover:bg-zinc-900 transition-colors duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Activity className="w-32 h-32" />
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <Activity className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">Mobility & Rehab</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10 max-w-md">
                Integrated mobility routines to bulletproof your shoulders and wrists—the two most vulnerable areas in bodyweight training.
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
