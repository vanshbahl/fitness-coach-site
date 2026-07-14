import { useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import athletePlaceholder from "@/assets/athlete-placeholder.svg";

type Athlete = {
  id: string;
  image: string;
  name: string;
  duration: string;
  weightBefore: string;
  weightAfter: string;
  skillBefore: string;
  skillAfter: string;
  achievement: string;
  testimonial: string;
};

const ATHLETES: Athlete[] = [
  {
    id: "aarav",
    image: athletePlaceholder,
    name: "Aarav Sharma",
    duration: "16 Weeks",
    weightBefore: "82kg",
    weightAfter: "72kg",
    skillBefore: "0 Pull-Ups",
    skillAfter: "14 Pull-Ups",
    achievement: "First Muscle-Up",
    testimonial: "Training finally made sense. I stopped chasing motivation and built discipline instead."
  },
  {
    id: "rohan",
    image: athletePlaceholder,
    name: "Rohan Patel",
    duration: "24 Weeks",
    weightBefore: "78kg",
    weightAfter: "74kg",
    skillBefore: "0s Front Lever",
    skillAfter: "8s Front Lever",
    achievement: "Strict Muscle-Up + Front Lever",
    testimonial: "The progression system is flawless. I never felt rushed, but the results came faster than expected."
  },
  {
    id: "karan",
    image: athletePlaceholder,
    name: "Karan Singh",
    duration: "12 Weeks",
    weightBefore: "24% BF",
    weightAfter: "14% BF",
    skillBefore: "0 Pistol Squats",
    skillAfter: "5 Pistol Squats",
    achievement: "Complete Body Recomposition",
    testimonial: "I lost the fat and gained complete control over my bodyweight. Best investment I've ever made."
  }
];

const STATS = [
  { value: "250+", label: "Athletes Coached" },
  { value: "96%", label: "Retention" },
  { value: "4.9★", label: "Rating" },
  { value: "10,000+", label: "Training Hours" }
];

const CUSTOM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: CUSTOM_EASE } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function Results() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % ATHLETES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? ATHLETES.length - 1 : prev - 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const activeAthlete = ATHLETES[activeIndex];

  return (
    <section id="results" className="relative w-full bg-zinc-950 py-24 sm:py-32 flex flex-col justify-between overflow-hidden">
      
      {/* =========================================
          SECTION INTRO
          ========================================= */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 mb-16 sm:mb-24 z-10 text-center md:text-left">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          <span className="block text-sm font-bold tracking-[0.2em] text-orange-500 uppercase mb-4">
            Real Results
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tighter leading-[1.1]">
            Real people.<br/>
            Real transformations.
          </h2>
        </motion.div>
      </div>

      {/* =========================================
          EDITORIAL SLIDER HERO
          ========================================= */}
      <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
          
          {/* Desktop Prev Arrow */}
          <motion.button
            onClick={handlePrev}
            whileHover={prefersReducedMotion ? {} : { scale: 1.04, color: "#f97316" }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95, transition: { duration: 0.12 } }}
            className="hidden md:flex p-4 text-zinc-600 hover:text-orange-500 transition-colors focus:outline-none"
            aria-label="Previous athlete"
          >
            <ChevronLeft strokeWidth={1.5} className="w-12 h-12 lg:w-16 lg:h-16" />
          </motion.button>

          {/* Image Container */}
          <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[4/5] rounded-[24px] overflow-hidden bg-zinc-900 mx-auto shadow-2xl flex-shrink-0 cursor-grab active:cursor-grabbing">
            {ATHLETES.map((athlete, i) => (
              <motion.img
                key={athlete.id}
                src={athlete.image}
                loading={i === 0 ? "eager" : "lazy"}
                alt={`Transformation of ${athlete.name}`}
                initial={false}
                animate={{ opacity: i === activeIndex ? 1 : 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.1] sepia-[0.15]"
                style={{ 
                  pointerEvents: i === activeIndex ? "auto" : "none",
                  zIndex: i === activeIndex ? 10 : 0
                }}
                drag={prefersReducedMotion ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(_, info) => {
                  if (i !== activeIndex) return;
                  if (info.offset.x > 50) handlePrev();
                  if (info.offset.x < -50) handleNext();
                }}
              />
            ))}
          </div>

          {/* Desktop Next Arrow */}
          <motion.button
            onClick={handleNext}
            whileHover={prefersReducedMotion ? {} : { scale: 1.04, color: "#f97316" }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95, transition: { duration: 0.12 } }}
            className="hidden md:flex p-4 text-zinc-600 hover:text-orange-500 transition-colors focus:outline-none"
            aria-label="Next athlete"
          >
            <ChevronRight strokeWidth={1.5} className="w-12 h-12 lg:w-16 lg:h-16" />
          </motion.button>

          {/* Mobile Arrows */}
          <div className="flex md:hidden items-center justify-between w-full max-w-[280px] mx-auto mt-6">
            <motion.button
              onClick={handlePrev}
              whileTap={{ scale: 0.95 }}
              className="p-4 text-zinc-500 active:text-orange-500"
              aria-label="Previous athlete"
            >
              <ChevronLeft strokeWidth={1.5} className="w-12 h-12" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              whileTap={{ scale: 0.95 }}
              className="p-4 text-zinc-500 active:text-orange-500"
              aria-label="Next athlete"
            >
              <ChevronRight strokeWidth={1.5} className="w-12 h-12" />
            </motion.button>
          </div>

        </div>
      </div>

      {/* =========================================
          SPOTLIGHT DETAILS (EDITORIAL)
          ========================================= */}
      <div className="w-full max-w-4xl mx-auto px-4 lg:px-8 mb-24 z-10 flex flex-col justify-center items-center min-h-[360px]">
        <motion.div 
          key={activeIndex} 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: CUSTOM_EASE }}
          className="flex flex-col items-center text-center w-full"
        >
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase mb-2">
            {activeAthlete.name}
          </h3>
          <p className="text-sm font-bold text-orange-500 tracking-[0.2em] uppercase mb-8 sm:mb-12">
            {activeAthlete.duration}
          </p>
          
          <div className="w-full h-px bg-white/10 mb-8 sm:mb-10 max-w-2xl mx-auto" />
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-16 mb-8 sm:mb-10 w-full">
            <div className="flex items-center gap-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              <span className="text-zinc-500">{activeAthlete.weightBefore}</span>
              <span className="text-orange-500">→</span>
              <span>{activeAthlete.weightAfter}</span>
            </div>
            <div className="flex items-center gap-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              <span className="text-zinc-500">{activeAthlete.skillBefore}</span>
              <span className="text-orange-500">→</span>
              <span>{activeAthlete.skillAfter}</span>
            </div>
          </div>
          
          <p className="text-lg sm:text-2xl font-bold text-white tracking-wide mb-8 sm:mb-10">
            {activeAthlete.achievement}
          </p>
          
          <div className="w-full h-px bg-white/10 mb-8 sm:mb-10 max-w-2xl mx-auto" />
          
          <p className="text-lg sm:text-xl font-serif text-zinc-300 italic max-w-2xl mx-auto leading-relaxed">
            "{activeAthlete.testimonial}"
          </p>
        </motion.div>
      </div>

      {/* =========================================
          STATISTICS FOOTER
          ========================================= */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 mt-auto z-10 pb-8 sm:pb-16">
        <div className="w-full h-px bg-white/10 mb-12 sm:mb-16" />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8"
        >
          {STATS.map((stat, i) => (
            <motion.div key={i} variants={fadeUpVariant} className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tighter mb-3">
                {stat.value}
              </span>
              <span className="text-sm text-zinc-500 font-semibold tracking-wide uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
    </section>
  );
}
