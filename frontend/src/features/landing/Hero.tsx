import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Clock, Activity, CheckCircle2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Optimized for cinematic feel without excessive movement
  const FADE_UP_VARIANTS = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <section 
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col justify-end overflow-hidden bg-black selection:bg-white selection:text-black"
      aria-label="Hero section"
    >
      {/* 2. Reduced White Overlay & Cinematic Photography */}
      {/* Forced pure black gradients to prevent Light Mode white fog washing out the image */}
      <div className="absolute inset-0 z-0 bg-black">
        <img 
          src={heroBg} 
          alt="" 
          className="w-full h-full object-cover object-[60%_center] md:object-center opacity-80"
          // @ts-ignore
          fetchPriority="high"
        />
        {/* Subtle Vignette - darkens edges without blurring */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />
        
        {/* Extremely subtle ambient orange glow */}
        <motion.div
          animate={{ opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] sm:w-[50vw] sm:h-[50vw] bg-orange-500 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
        />
      </div>

      {/* 5. Hero Composition - Max width constraints and balanced typography */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 pt-40 pb-20 flex flex-col justify-end min-h-[100dvh]">
        
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1, 
              },
            },
          }}
          className="max-w-2xl w-full"
        >
          {/* Eyebrow */}
          <motion.div variants={FADE_UP_VARIANTS} className="flex items-center gap-3 mb-6 mt-16 sm:mt-0">
            <span className="w-8 h-[2px] bg-orange-500 rounded-full"></span>
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-zinc-300 uppercase">
              Elite Calisthenics Coaching
            </p>
          </motion.div>

          {/* 1. Text Readability & Typography Hierarchy */}
          <motion.h1 
            variants={FADE_UP_VARIANTS}
            className="text-[11vw] sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tighter text-white leading-[1.05] mb-6"
          >
            Master Your Body.<br className="hidden sm:block" />
            <span className="block text-zinc-200 font-bold mt-1 sm:mt-0">Command Respect.</span>
          </motion.h1>

          <motion.p 
            variants={FADE_UP_VARIANTS}
            className="text-base sm:text-lg text-zinc-200 font-medium mb-10 leading-relaxed max-w-md sm:max-w-lg"
          >
            No fluff. No excuses. I build raw strength and elite movement for those serious about their potential.
          </motion.p>

          {/* 6. CTA Refinement */}
          <motion.div variants={FADE_UP_VARIANTS} className="flex flex-col gap-6 mb-12">
            <Link 
              to="/assessment"
              className="h-14 px-8 flex items-center justify-center text-base sm:text-lg font-semibold rounded-xl group w-full sm:w-auto self-start bg-white text-black hover:-translate-y-0.5 hover:scale-[1.02] shadow-[0_4px_20px_rgba(249,115,22,0.12)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.22)] transition-all duration-250 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Start your assessment"
            >
              Start Your Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            {/* 7. Metadata Chips - Linear style, elegant typography, high contrast text */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] font-medium text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white/60" />
                <span>11 Guided Steps</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/60" />
                <span>~90 Seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-white/60" />
                <span>₹49 Trial Session</span>
              </div>
            </div>

            {/* 8. Assessment Journey - Improved styling and spacing */}
            <div className="flex items-center gap-3 mt-4" aria-label="Onboarding journey steps">
              <div className="flex items-center px-3 py-1.5 rounded-md bg-white/10 text-white text-[11px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/5">
                Assessment
              </div>
              <div className="w-6 h-[1px] bg-white/20"></div>
              <div className="text-zinc-500 text-[10px] font-semibold tracking-widest uppercase">
                Trial
              </div>
              <div className="w-6 h-[1px] bg-white/20"></div>
              <div className="text-zinc-500 text-[10px] font-semibold tracking-widest uppercase">
                Training
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
