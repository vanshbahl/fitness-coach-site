import { motion } from "framer-motion";

interface TimeSlotsProps {
  selectedDate: string;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

const MOCK_TIMES = [
  "6:00 PM",
  "6:45 PM",
  "7:30 PM",
  "8:15 PM"
];

export function TimeSlots({ selectedTime, onSelectTime }: TimeSlotsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col"
    >
      <h3 className="text-sm font-semibold tracking-wider uppercase text-zinc-400 mb-4">Available Times</h3>
      
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {MOCK_TIMES.map((time) => {
          const isSelected = selectedTime === time;

          return (
            <button
              key={time}
              onClick={() => onSelectTime(time)}
              className={`
                relative h-14 rounded-2xl border transition-all active:scale-95 flex items-center justify-center font-medium
                ${isSelected 
                  ? "border-orange-500 bg-orange-500/10 text-white shadow-[0_0_20px_rgba(249,115,22,0.2)]" 
                  : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:border-white/20 hover:text-zinc-200"
                }
              `}
            >
              {time}
              
              {isSelected && (
                <motion.div
                  layoutId="selectedTimeIndicator"
                  className="absolute inset-0 rounded-2xl border-2 border-orange-500 pointer-events-none"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
