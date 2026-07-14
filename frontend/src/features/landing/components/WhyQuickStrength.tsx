import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ClipboardCheck, CalendarDays, MessageSquare, PlaySquare, TrendingUp } from "lucide-react";

const STEPS = [
  { 
    num: "01", 
    title: "Understand Before You Train", 
    desc: "Every athlete starts differently. Your assessment identifies your mobility, strength level, goals, limitations and training history before a single workout is prescribed.",
    icon: ClipboardCheck
  },
  { 
    num: "02", 
    title: "Built Around You", 
    desc: "No templates. Every progression, exercise, volume and intensity is designed specifically for your current ability and long-term goal.",
    icon: CalendarDays
  },
  { 
    num: "03", 
    title: "Constant Course Correction", 
    desc: "Progress isn't linear. Weekly coaching ensures your training evolves as your body improves.",
    icon: MessageSquare
  },
  { 
    num: "04", 
    title: "Master Every Rep", 
    desc: "Upload your training videos. Receive biomechanical feedback that improves efficiency, removes mistakes and prevents injuries.",
    icon: PlaySquare
  },
  { 
    num: "05", 
    title: "Progress That Never Plateaus", 
    desc: "Each completed block unlocks the next progression. The system evolves with you until advanced bodyweight skills become achievable.",
    icon: TrendingUp
  }
];

// Abstract SVGs for the right-side sticky panel
function StepIllustration({ step }: { step: number }) {
  const prefersReducedMotion = useReducedMotion();
  const t = prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" as const };
  const drawT = prefersReducedMotion ? { duration: 0 } : { duration: 1.2, ease: "easeOut" as const };

  switch(step) {
    case 0: // Clipboard
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[1.5]">
          <rect x="25" y="15" width="50" height="70" rx="4" />
          <line x1="40" y1="15" x2="60" y2="15" strokeWidth="3" />
          <motion.path 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={drawT}
            d="M40 35 L70 35 M40 50 L70 50 M40 65 L60 65" 
            strokeWidth="1" strokeDasharray="2 2" 
          />
          <motion.circle initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2, ...t }} cx="30" cy="35" r="2" className="fill-orange-500 stroke-none" />
          <motion.circle initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4, ...t }} cx="30" cy="50" r="2" className="fill-orange-500 stroke-none" />
          <motion.circle initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6, ...t }} cx="30" cy="65" r="2" className="fill-zinc-600 stroke-none" />
        </svg>
      );
    case 1: // Calendar
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[1.5]">
          <rect x="15" y="20" width="70" height="60" rx="4" />
          <line x1="15" y1="35" x2="85" y2="35" />
          <line x1="38" y1="35" x2="38" y2="80" strokeWidth="0.5" strokeDasharray="2 2" className="stroke-white/30" />
          <line x1="62" y1="35" x2="62" y2="80" strokeWidth="0.5" strokeDasharray="2 2" className="stroke-white/30" />
          
          <motion.rect 
            initial={{ width: 0 }}
            whileInView={{ width: 14 }}
            viewport={{ once: true }}
            transition={drawT}
            x="20" y="45" height="6" rx="2" className="fill-orange-500/20 stroke-orange-500" 
          />
          <rect x="42" y="60" width="16" height="6" rx="2" className="fill-white/10 stroke-white/50" />
          <rect x="66" y="50" width="14" height="6" rx="2" className="fill-white/10 stroke-white/50" />
          
          <motion.circle 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, ...t }}
            cx="27" cy="48" r="1.5" className="fill-orange-500 stroke-none" 
          />
        </svg>
      );
    case 2: // Progress chart
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[1.5]">
          <line x1="20" y1="80" x2="80" y2="80" strokeWidth="1" className="stroke-white/30" />
          <line x1="20" y1="20" x2="20" y2="80" strokeWidth="1" className="stroke-white/30" />
          
          <motion.path 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={drawT}
            d="M20 75 Q 35 75 40 60 T 60 40 T 80 25" 
            className="stroke-orange-500" strokeWidth="2" strokeLinejoin="round" 
          />
          
          <motion.circle initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.4, ...t }} cx="40" cy="60" r="2" className="fill-black stroke-white" />
          <motion.circle initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.6, ...t }} cx="60" cy="40" r="2" className="fill-black stroke-white" />
          <motion.circle initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.8, ...t }} cx="80" cy="25" r="2.5" className="fill-orange-500 stroke-none" />
        </svg>
      );
    case 3: // Video analysis
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[1.5]">
          <rect x="15" y="25" width="70" height="50" rx="4" />
          <motion.polygon 
            initial={{ scale: 0.8, opacity: 0.5 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={t}
            points="45,40 45,60 60,50" 
            className="fill-white" 
            style={{ transformOrigin: "50px 50px" }}
          />
          <motion.circle
            initial={{ scale: 0.5, opacity: 1 }}
            whileInView={{ scale: 1.5, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ ...drawT, duration: prefersReducedMotion ? 0 : 1.2 }}
            cx="50" cy="50" r="15" className="stroke-white" style={{ transformOrigin: "50px 50px" }}
          />
          <path d="M20 75 Q 50 30 80 75" className="stroke-orange-500" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="50" cy="52.5" r="2.5" className="fill-orange-500 stroke-none" />
        </svg>
      );
    case 4: // Trophy / progression
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[1.5]">
          <path d="M35 25 h30 v10 c0 15 -10 20 -15 25 c-5 -5 -15 -10 -15 -25 z" />
          <line x1="50" y1="60" x2="50" y2="75" />
          <rect x="40" y="75" width="20" height="5" rx="1" />
          <path d="M35 30 c-10 0 -10 15 0 15" />
          <path d="M65 30 c10 0 10 15 0 15" />
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={t}
            cx="50" cy="40" r="6"
            className="fill-orange-500/20 stroke-orange-500"
            style={{ transformOrigin: "50px 40px" }}
          />
        </svg>
      );
    default:
      return null;
  }
}

export function WhyQuickStrength() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="system" className="relative w-full bg-black border-t border-white/5">
      
      {/* Background Engineering Aesthetic */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="eng-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="1 4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#eng-grid)" />
          {/* Large structural circles */}
          <circle cx="50%" cy="50%" r="40%" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5" />
          <circle cx="50%" cy="50%" r="20%" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 8" />
          {/* Axis lines */}
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="0.5" opacity="0.5" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="0.5" opacity="0.5" />
          {/* Tiny orange nodes */}
          <circle cx="50%" cy="50%" r="2" className="fill-orange-500/50" />
          <circle cx="50%" cy="10%" r="2" className="fill-orange-500/50" />
          <circle cx="90%" cy="50%" r="2" className="fill-orange-500/50" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* =========================================
            DESKTOP LAYOUT (Sticky Split)
            ========================================= */}
        <div className="hidden lg:flex relative w-full items-start">
          
          {/* Left Side: Scrolling Content */}
          <div className="w-1/2 pt-16 md:pt-24 pb-8 pr-16 md:pr-24">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16 md:mb-24"
            >
              <h2 className="text-6xl font-extrabold tracking-tighter text-white mb-6 leading-[1.05]">
                The Quick<br />Strength System
              </h2>
              <p className="text-xl text-zinc-400 font-medium leading-relaxed max-w-md">
                Elite results don't come from random workouts. They come from a coaching system built around your body, your schedule, and your progression.
              </p>
            </motion.div>

            <div className="flex flex-col relative">
              {STEPS.map((step, idx) => (
                <motion.div 
                  key={idx}
                  onViewportEnter={() => setActiveStep(idx)}
                  viewport={{ margin: "-49% 0px -49% 0px" }}
                  className={`py-12 md:py-20 flex flex-col transition-opacity duration-500 ${activeStep === idx ? 'opacity-100' : 'opacity-30'}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-sm font-bold tracking-[0.2em] text-zinc-500">
                        {step.num}
                      </span>
                      {activeStep === idx ? (
                        <motion.div 
                          layoutId="active-step-indicator"
                          className="h-[2px] bg-orange-500 rounded-full w-12"
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      ) : (
                        <div className="h-[2px] bg-transparent w-12" />
                      )}
                    </div>
                    <h3 className={`text-4xl font-bold tracking-tight mb-6 transition-colors duration-500 ${activeStep === idx ? 'text-white' : 'text-zinc-500'}`}>
                      {step.title}
                    </h3>
                    <p className="text-xl text-zinc-400 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
          </div>

          {/* Right Side: Sticky Illustration */}
          <div className="w-1/2 sticky top-0 h-[100dvh] flex items-center justify-center pl-12">
            <div className="relative w-full max-w-md aspect-square rounded-[3rem] bg-zinc-950/50 backdrop-blur-3xl border border-white/5 flex items-center justify-center p-16 shadow-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full absolute inset-0 p-24"
                >
                  <StepIllustration step={activeStep} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>


        {/* =========================================
            MOBILE LAYOUT (Stacked Premium Cards)
            ========================================= */}
        <div className="flex lg:hidden flex-col py-16 w-full max-w-lg mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-[1.05]">
              The Quick<br />Strength System
            </h2>
            <p className="text-lg text-zinc-400 font-medium leading-relaxed">
              Elite results don't come from random workouts. They come from a coaching system built around your body, your schedule, and your progression.
            </p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {STEPS.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col bg-zinc-950/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold tracking-[0.2em] text-zinc-500">
                      {step.num}
                    </span>
                    <div className="w-8 h-[2px] bg-orange-500 rounded-full" />
                  </div>
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed font-medium">
                  {step.desc}
                </p>

                {/* Minimal Illustration inside mobile card */}
                <div className="w-full h-40 mt-8 rounded-2xl bg-black/50 border border-white/5 relative overflow-hidden flex items-center justify-center p-8">
                  <StepIllustration step={idx} />
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>

      {/* =========================================
          TRANSITION TO FOUNDER (Breathing Room)
          ========================================= */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full flex flex-col items-center justify-center py-24 md:py-32 px-6 relative z-10"
      >
        <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-white text-center leading-[1.05] max-w-4xl">
          Great coaching isn't just a workout plan.<br/>
          <span className="text-zinc-600">It's a system built around you.</span>
        </h3>
        <div className="w-[1px] h-16 md:h-20 bg-gradient-to-b from-orange-500 to-transparent mt-12 md:mt-16" />
      </motion.div>
      
    </section>
  );
}
