import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FloatingNav() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Custom easeOut for premium feel
      className="fixed top-0 inset-x-0 z-50 px-4 pt-6 pb-4 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-background/60 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 shadow-2xl pointer-events-auto">
        <div className="font-bold tracking-tighter text-xl uppercase text-foreground">
          Quick Strength
        </div>
        <Button size="sm" className="rounded-full font-semibold h-10 px-5">
          Book Trial
        </Button>
      </div>
    </motion.nav>
  );
}
