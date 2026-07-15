import { motion, useReducedMotion } from "framer-motion";
import { AdminNav } from "@/components/layout/AdminNav";

const MODULES = [
  "Bookings",
  "Availability Engine",
  "Customers",
  "Payments",
  "Analytics",
  "Settings"
];

export function AdminPortalPage() {
  const shouldReduceMotion = useReducedMotion();

  const FADE_UP_VARIANTS = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <main className="min-h-[100dvh] w-full bg-black selection:bg-white selection:text-black flex flex-col">
      <AdminNav />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 bg-black pointer-events-none">
        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/90 pointer-events-none" />
        
        {/* Extremely subtle ambient orange glow */}
        <motion.div
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] sm:w-[50vw] sm:h-[50vw] bg-orange-500 rounded-full blur-[180px] mix-blend-screen pointer-events-none"
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 pt-40 pb-20 flex-1 flex flex-col items-center text-center">
        
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
          className="w-full"
        >
          {/* Eyebrow */}
          <motion.div variants={FADE_UP_VARIANTS} className="flex justify-center items-center gap-3 mb-6 mt-8">
            <span className="w-8 h-[2px] bg-orange-500 rounded-full"></span>
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-zinc-400 uppercase">
              Quick Strength Operations
            </p>
            <span className="w-8 h-[2px] bg-orange-500 rounded-full"></span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={FADE_UP_VARIANTS}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white leading-[1.05] mb-8"
          >
            ADMIN PORTAL
          </motion.h1>

          {/* Description */}
          <motion.div variants={FADE_UP_VARIANTS} className="flex flex-col items-center gap-4 max-w-2xl mx-auto mb-20">
            <p className="text-base sm:text-lg text-zinc-300 font-medium leading-relaxed">
              The internal operations dashboard powering Quick Strength is currently under development.
            </p>
            <p className="text-sm sm:text-base text-zinc-500 font-medium leading-relaxed max-w-lg">
              It will soon provide everything required to manage coaching sessions, availability, customers and business operations.
            </p>
          </motion.div>

          {/* Skeleton Modules Grid */}
          <motion.div 
            variants={FADE_UP_VARIANTS}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left"
          >
            {MODULES.map((module, index) => (
              <div 
                key={index}
                className="group relative flex flex-col p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden"
              >
                {/* Subtle Shimmer Animation */}
                <motion.div 
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none"
                  animate={{ translateX: ["-100%", "200%"] }}
                  transition={{ 
                    duration: 3, 
                    ease: "linear", 
                    repeat: Infinity,
                    repeatDelay: 1,
                    delay: index * 0.2
                  }}
                />
                
                <h3 className="text-lg font-semibold text-zinc-400 tracking-tight mb-6">
                  {module}
                </h3>
                
                {/* Skeleton Lines */}
                <div className="flex flex-col gap-3 mt-auto">
                  <div className="h-2 w-full bg-white/[0.04] rounded-full" />
                  <div className="h-2 w-4/5 bg-white/[0.04] rounded-full" />
                  <div className="h-2 w-2/3 bg-white/[0.04] rounded-full" />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Footer CTA */}
          <motion.div variants={FADE_UP_VARIANTS} className="mt-24 flex justify-center">
            <div className="relative inline-flex flex-col items-center">
              <span className="text-sm font-semibold tracking-widest uppercase text-white mb-2">
                Launching Soon
              </span>
              <motion.div 
                className="h-[2px] bg-orange-500 rounded-full w-full"
                animate={{ scaleX: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
              />
            </div>
          </motion.div>
          
        </motion.div>
      </div>
    </main>
  );
}
