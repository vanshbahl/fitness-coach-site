import { motion } from "framer-motion";
import { Activity, Shield, Compass, X, Check } from "lucide-react";

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function WhyCalisthenics() {
  return (
    <section id="philosophy" className="relative w-full bg-black py-16 sm:py-20 md:py-24 px-6 sm:px-8 overflow-hidden">
      
      {/* Background Blueprint Geometry */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Large architectural circles */}
          <circle cx="50%" cy="50%" r="30%" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="50%" cy="50%" r="45%" fill="none" stroke="white" strokeWidth="0.5" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="0.5" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col">
        
        {/* Header */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={FADE_UP}
          className="flex flex-col items-center text-center mb-16 md:mb-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-orange-500 rounded-full" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
              The Philosophy
            </span>
            <span className="w-8 h-[2px] bg-orange-500 rounded-full" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white mb-6">
            Why Bodyweight Wins.
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl font-medium leading-relaxed">
            Your body is the most sophisticated piece of equipment you'll ever own. Learn to master it instead of depending on machines.
          </p>
        </motion.div>

        {/* Feature Panels */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER_CONTAINER}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24"
        >
          
          {/* Panel 1 */}
          <motion.div variants={FADE_UP} className="group relative bg-zinc-950/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 overflow-hidden flex flex-col h-[400px]">
            {/* Abstract Visual */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[2]">
                <path d="M10 20 L90 20 M30 20 L30 80 M70 20 L70 80 M50 50 L50 90" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="50" cy="35" r="12" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(249,115,22,0.1)] border border-white/5">
                <Activity className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Relative Strength</h3>
              <p className="text-zinc-400 leading-relaxed font-medium">
                Moving weight is impressive.<br/><br/>Moving yourself through space develops true functional strength and coordination.
              </p>
            </div>
          </motion.div>

          {/* Panel 2 */}
          <motion.div variants={FADE_UP} className="group relative bg-zinc-950/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 overflow-hidden flex flex-col h-[400px]">
            {/* Abstract Visual */}
            <div className="absolute -right-8 -bottom-8 w-64 h-64 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[1.5]">
                <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
                <path d="M50 10 L50 90 M10 50 L90 50" strokeWidth="1" />
                <circle cx="50" cy="50" r="15" className="stroke-orange-500" strokeWidth="2" />
                <circle cx="50" cy="50" r="25" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(249,115,22,0.1)] border border-white/5">
                <Shield className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Joint Longevity</h3>
              <p className="text-zinc-400 leading-relaxed font-medium">
                Bodyweight movement strengthens tendons, improves mobility and builds resilient joints that last.
              </p>
            </div>
          </motion.div>

          {/* Panel 3 */}
          <motion.div variants={FADE_UP} className="group relative bg-zinc-950/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 overflow-hidden flex flex-col h-[400px]">
            {/* Abstract Visual */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[1.5]">
                <circle cx="50" cy="50" r="45" />
                <ellipse cx="50" cy="50" rx="20" ry="45" />
                <ellipse cx="50" cy="50" rx="45" ry="15" />
                <line x1="50" y1="5" x2="50" y2="95" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(249,115,22,0.1)] border border-white/5">
                <Compass className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Freedom</h3>
              <p className="text-zinc-400 leading-relaxed font-medium">
                No machines.<br/>
                No memberships.<br/><br/>
                Train anywhere using only your body.
              </p>
            </div>
          </motion.div>

        </motion.div>

        {/* Comparison Component */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={FADE_UP}
          className="relative max-w-4xl mx-auto w-full bg-zinc-950 border border-white/5 rounded-3xl p-8 md:p-12 mb-16 md:mb-24 flex flex-col md:flex-row items-center gap-12 md:gap-0"
        >
          {/* Left: Traditional Gym */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left md:pr-12">
            <h4 className="text-xl font-bold text-zinc-500 mb-8 uppercase tracking-widest">Traditional Gym</h4>
            <ul className="flex flex-col gap-6">
              {[
                "Machines",
                "Isolation",
                "Membership Required",
                "Limited Locations"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-zinc-400 font-medium text-lg">
                  <X className="w-5 h-5 text-zinc-600 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Vertical Divider (Horizontal on mobile) */}
          <div className="hidden md:block w-[1px] h-48 bg-gradient-to-b from-transparent via-orange-500/50 to-transparent" />
          <div className="md:hidden w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

          {/* Right: Quick Strength Method */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left md:pl-12">
            <h4 className="text-xl font-bold text-white mb-8 uppercase tracking-widest">Quick Strength Method</h4>
            <ul className="flex flex-col gap-6">
              {[
                "Your Own Body",
                "Functional Movement",
                "Anywhere",
                "Long-Term Athleticism"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-white font-medium text-lg">
                  <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Section End Quote */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={FADE_UP}
          className="flex flex-col items-center text-center mt-12"
        >
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-10 leading-tight max-w-3xl">
            The strongest equipment you'll ever own is already attached to you.
          </h3>
          <div className="w-6 h-6 border-b-2 border-r-2 border-orange-500 transform rotate-45 opacity-50" />
        </motion.div>

      </div>
      
      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
