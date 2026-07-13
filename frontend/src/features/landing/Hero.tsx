import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Users, Star, Calendar } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Coach Abhay Pandey performing a front lever" 
          className="w-full h-full object-cover object-center opacity-80"
          // @ts-ignore - React 19 supports fetchPriority but TS might not depending on config
          fetchPriority="high"
        />
        {/* Gradient overlays to ensure text legibility and blend with background */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-24 flex flex-col items-start justify-end min-h-[100dvh]">
        
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2, // Wait slightly for Nav to enter
              },
            },
          }}
          className="max-w-2xl w-full"
        >
          {/* Eyebrow */}
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex items-center gap-3 mb-6">
            <span className="w-10 h-[2px] bg-primary rounded-full"></span>
            <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
              Elite Calisthenics Coaching
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tighter text-foreground leading-[1.05] mb-6"
          >
            Master Your Body.<br/>
            Command Respect.
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="text-lg sm:text-xl text-zinc-300 font-medium mb-10 max-w-lg leading-relaxed"
          >
            No fluff. No excuses. I build raw strength and elite movement for those serious about their potential.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
            <Button size="lg" className="h-14 px-8 text-lg rounded-xl group w-full sm:w-auto">
              Start Your Journey (₹49)
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl bg-transparent text-foreground border-white/20 hover:bg-white/5 hover:text-white w-full sm:w-auto">
              See Student Results
            </Button>
          </motion.div>

          {/* Social Proof Stats */}
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-white/10">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-1">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-xl sm:text-2xl font-bold text-foreground">500+</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-zinc-400">Athletes Trained</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-1">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-xl sm:text-2xl font-bold text-foreground">5</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-zinc-400">Years Experience</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-1">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary fill-primary" />
                <span className="text-xl sm:text-2xl font-bold text-foreground">4.9</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-zinc-400">Average Rating</span>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2 text-zinc-500"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 opacity-50" />
        </motion.div>
      </motion.div>

    </section>
  );
}
