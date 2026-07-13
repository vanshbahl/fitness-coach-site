import { useRef } from "react";
import { motion } from "framer-motion";

interface WeeklyCalendarProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

// Generate next 14 days
const generateDays = () => {
  const days = [];
  const today = new Date();
  
  // Weekday names
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    
    // Mock unavailable days (e.g. Sundays or a random day)
    const isAvailable = d.getDay() !== 0; // Sunday closed
    
    days.push({
      id: d.toISOString().split("T")[0], // YYYY-MM-DD
      dayName: weekDays[d.getDay()],
      dateNum: d.getDate(),
      isAvailable
    });
  }
  return days;
};

const MOCK_DAYS = generateDays();

export function WeeklyCalendar({ selectedDate, onSelectDate }: WeeklyCalendarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-zinc-400">Select Date</h3>
      </div>
      
      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 pb-4 -mx-6 px-6 sm:mx-0 sm:px-0 scrollbar-hide snap-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {MOCK_DAYS.map((day) => {
          const isSelected = selectedDate === day.id;
          
          return (
            <button
              key={day.id}
              onClick={() => day.isAvailable && onSelectDate(day.id)}
              disabled={!day.isAvailable}
              className={`
                relative flex flex-col items-center justify-center min-w-[72px] h-[88px] rounded-2xl border transition-all snap-start shrink-0
                ${isSelected 
                  ? "border-orange-500 bg-orange-500/10 text-white shadow-[0_0_20px_rgba(249,115,22,0.2)]" 
                  : day.isAvailable 
                    ? "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:border-white/20 active:scale-95" 
                    : "border-transparent bg-white/[0.02] text-zinc-700 cursor-not-allowed"
                }
              `}
            >
              <span className={`text-xs font-medium mb-1 ${isSelected ? "text-orange-400" : ""}`}>
                {day.dayName}
              </span>
              <span className={`text-2xl font-bold ${isSelected ? "text-white" : ""}`}>
                {day.dateNum}
              </span>

              {isSelected && (
                <motion.div
                  layoutId="selectedDateIndicator"
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
