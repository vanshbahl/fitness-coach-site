import { ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface SpotlightGridProps {
  children: ReactNode;
  className?: string;
}

export function SpotlightGrid({ children, className }: SpotlightGridProps) {
  // The grid simply wraps the cards and handles general layout.
  return (
    <div className={cn("group relative", className)}>
      {children}
    </div>
  );
}

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({ children, className, spotlightColor = "rgba(255,255,255,0.06)" }: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "relative rounded-3xl border border-white/5 bg-zinc-950 overflow-hidden group/card",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 40%
            )
          `,
        }}
      />
      
      {/* Main content layer */}
      <div className="relative z-10 h-full w-full bg-zinc-950/80 backdrop-blur-3xl rounded-[inherit]">
        {children}
      </div>
    </div>
  );
}
