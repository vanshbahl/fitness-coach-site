import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function TrainingPhilosophy() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 sm:gap-24 px-6 sm:px-12 md:px-32 w-[300vw] min-w-[max-content]">
          
          <div className="w-[85vw] sm:w-[60vw] md:w-[40vw] flex-shrink-0 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 leading-[1.1]">
              Discipline <br />
              <span className="text-zinc-600">Over Motivation.</span>
            </h2>
            <p className="text-lg sm:text-xl text-zinc-400 font-medium max-w-md">
              Motivation is fleeting. It relies on how you feel. Discipline is binary—you either do the work or you don't.
            </p>
          </div>

          <div className="w-[85vw] sm:w-[60vw] md:w-[40vw] flex-shrink-0 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 leading-[1.1]">
              Physics <br />
              <span className="text-zinc-600">Over Fads.</span>
            </h2>
            <p className="text-lg sm:text-xl text-zinc-400 font-medium max-w-md">
              No gimmicks. We rely on leverage, torque, and progressive overload. Gravity never lies.
            </p>
          </div>

          <div className="w-[85vw] sm:w-[60vw] md:w-[40vw] flex-shrink-0 flex flex-col justify-center pr-[20vw]">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 leading-[1.1]">
              Mastery <br />
              <span className="text-zinc-600">Over Mediocrity.</span>
            </h2>
            <p className="text-lg sm:text-xl text-zinc-400 font-medium max-w-md">
              It takes years to build an elite physique. Fall in love with the boredom of consistency.
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
