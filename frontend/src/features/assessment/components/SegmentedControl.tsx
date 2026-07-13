import { motion } from "framer-motion";

interface SegmentedControlProps {
  options: string[];
  value?: string;
  onChange: (val: string) => void;
}

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  return (
    <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1.5 w-full relative">
      {options.map((option) => {
        const isSelected = value === option;
        return (
          <motion.button
            key={option}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(option)}
            className={`flex-1 py-3 text-sm font-semibold transition-colors duration-300 relative z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-xl ${
              isSelected ? "text-black" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="segment-active"
                className="absolute inset-0 bg-white rounded-xl z-[-1] shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {option}
          </motion.button>
        );
      })}
    </div>
  );
}
