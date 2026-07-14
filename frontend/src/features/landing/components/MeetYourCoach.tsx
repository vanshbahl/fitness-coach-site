import { useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import coachPlaceholder from "@/assets/coach-placeholder.png";

const CREDIBILITY_PILLS = [
  "Founder",
  "Calisthenics Coach",
  "Movement Specialist",
  "1-on-1 Coaching"
];

const PHILOSOPHY = [
  { year: "2022", text: "I became obsessed with movement." },
  { year: "2023", text: "Started coaching real people." },
  { year: "2024", text: "Built the Quick Strength Method." },
  { year: "TODAY", text: "Helping athletes master their own body." }
];

export function MeetYourCoach() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Parallax values for mouse movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth springs for the parallax
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // Map mouse position (-1 to 1) to subtle pixel offsets (max 8px)
  const xOffset = useTransform(springX, [-1, 1], [-8, 8]);
  const yOffset = useTransform(springY, [-1, 1], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate relative mouse position (-1 to 1)
    const x = (e.clientX - rect.left) / rect.width * 2 - 1;
    const y = (e.clientY - rect.top) / rect.height * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const fadeUp = prefersReducedMotion 
    ? { opacity: 0 } 
    : { opacity: 0, y: 20 };
    
  const fadeUpActive = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0 };

  return (
    <section 
      id="founder"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-black py-20 sm:py-28 px-6 sm:px-8 border-t border-white/5 overflow-hidden"
    >
      {/* Faint Background Grid & Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="absolute w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="coach-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#coach-grid)" />
        </svg>
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[100px] mix-blend-screen opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-16 lg:gap-32">
        
        {/* LEFT: Large Portrait Container */}
        <div className="w-full lg:w-1/2 flex justify-center lg:sticky lg:top-32">
          <div className="relative w-full max-w-lg aspect-[4/5] rounded-[3rem] p-[1px] bg-gradient-to-b from-white/10 to-transparent shadow-[0_0_80px_rgba(249,115,22,0.05)]">
            <div className="absolute inset-0 bg-orange-500/10 blur-[80px] rounded-[3rem] -z-10" />
            
            <div className="relative w-full h-full bg-zinc-950 rounded-[3rem] overflow-hidden group shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
              <motion.img
                src={coachPlaceholder}
                alt="Abhay Pandey - Quick Strength Founder"
                className="w-full h-full object-cover scale-[1.05] contrast-[1.05] saturate-[0.97]"
                style={{
                  x: prefersReducedMotion ? 0 : xOffset,
                  y: prefersReducedMotion ? 0 : yOffset,
                }}
                animate={prefersReducedMotion ? {} : { scale: [1.00, 1.03] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }}
              />
              
              {/* Cinematic Vignette & Shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/30 pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] rounded-[3rem] pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[3rem] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* RIGHT: Content & Story */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start pt-8 lg:pt-16">
          
          <motion.div
            initial={fadeUp}
            whileInView={fadeUpActive}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Content Wrapper for Ordering */}
            <div className="flex flex-col w-full">
              
              {/* Editorial Biography */}
              <div className="flex flex-col order-2 lg:order-1 mb-16 lg:mb-24">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white mb-8">
                  Abhay Pandey
                </h2>
                
                {/* Credibility Pills */}
                <div className="flex flex-wrap gap-3 mb-12 sm:mb-16">
                  {CREDIBILITY_PILLS.map((pill, i) => (
                    <motion.div
                      key={i}
                      whileHover={prefersReducedMotion ? {} : { y: -2, borderColor: "rgba(249,115,22,0.5)", backgroundColor: "rgba(249,115,22,0.05)" }}
                      className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs sm:text-sm font-semibold tracking-wide text-zinc-300 backdrop-blur-sm transition-colors duration-300"
                    >
                      {pill}
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col gap-8 text-xl sm:text-2xl text-zinc-300 leading-relaxed font-medium max-w-2xl">
                  <p>
                    I didn't start with elite genetics.
                  </p>
                  <p>
                    I started with consistency.
                  </p>
                  <p className="text-zinc-500">
                    I built my body through thousands of deliberate repetitions, stripping away everything that didn't contribute to true physical mastery.
                  </p>
                  <p className="text-lg sm:text-xl text-zinc-400 font-normal leading-loose mt-4">
                    Over the past 3 years, I've systematized bodyweight training. No guesswork. No endless routines that lead to plateaus. Just physics, progressive overload, and relentless execution. My coaching is built for those willing to put in the silent work required to build undeniable strength.
                  </p>
                </div>
              </div>
            
            {/* Philosophy Stack (Timeline Replacement) */}
            <div className="flex flex-col gap-6 sm:gap-8 mb-24 sm:mb-32 order-1 lg:order-2 w-full max-w-md lg:max-w-sm relative lg:mx-auto">
              {PHILOSOPHY.map((item, i) => {
                // Compose intentional, staggered horizontal offsets for desktop
                const offsets = ["lg:-ml-12", "lg:ml-12", "lg:-ml-24", "lg:ml-4"];
                
                return (
                  <motion.div 
                    key={i}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                    whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                    whileHover={prefersReducedMotion ? {} : { y: -3, backgroundColor: "rgba(24, 24, 27, 0.4)", borderColor: "rgba(255, 255, 255, 0.2)" }}
                    className={`relative p-6 sm:p-8 rounded-[2rem] bg-zinc-950/40 backdrop-blur-md border border-white/5 transition-colors duration-500 flex flex-col group ${offsets[i]}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {/* Tiny orange accent that glows on hover */}
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 transition-shadow duration-500 group-hover:shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
                      <span className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-lg sm:text-xl text-zinc-200 font-medium leading-relaxed">
                      "{item.text}"
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Oversized Quote / Poster */}
            <motion.div
              initial={fadeUp}
              whileInView={fadeUpActive}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full pb-8 order-3"
            >
              <h3 className="text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[0.95] text-balance uppercase">
                <span className="font-extrabold text-white block mb-1">Discipline</span>
                <span className="font-medium text-white/50 block mb-1">always beats</span>
                <span className="font-bold text-white/90 block">motivation.</span>
              </h3>
            </motion.div>

            </div>

          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
