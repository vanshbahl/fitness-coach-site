import { motion } from "framer-motion";

interface SelectionChipProps {
  id: string;
  label: string;
  selected: boolean;
  onClick: (id: string) => void;
}

export function SelectionChip({ id, label, selected, onClick }: SelectionChipProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(id)}
      className={`px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white border ${
        selected 
          ? "bg-white text-black border-transparent shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
          : "bg-white/5 text-zinc-300 border-white/5 hover:border-white/20 hover:bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
      }`}
      aria-pressed={selected}
    >
      {label}
    </motion.button>
  );
}
