import { motion } from "framer-motion";
import { Video, Clock, Globe } from "lucide-react";

interface BookingHeroProps {
  coach: string;
  duration: string;
  timezone: string;
}

export function BookingHero({ coach, duration, timezone }: BookingHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6"
    >
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Choose Your Trial Session
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
          Your assessment is complete. Select a convenient time for your live 1-on-1 trial session with {coach}.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <Video className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-zinc-300">Google Meet</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <Clock className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-medium text-zinc-300">{duration}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <Globe className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-zinc-300">{timezone}</span>
        </div>
      </div>
    </motion.div>
  );
}
