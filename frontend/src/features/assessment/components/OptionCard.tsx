import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface OptionCardProps {
  id: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  selected: boolean;
  recommended?: boolean;
  onClick: (id: string) => void;
  type?: "checkbox" | "radio";
}

export function OptionCard({ id, title, description, icon: Icon, selected, recommended, onClick, type = "radio" }: OptionCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(id)}
      className={`relative w-full flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
        selected 
          ? "bg-white/10 border-white shadow-[0_0_20px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.2)]" 
          : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
      }`}
      aria-pressed={selected}
    >
      {/* Recommended Badge */}
      {recommended && (
        <span className="absolute -top-3 left-5 bg-white text-black text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">
          Recommended
        </span>
      )}

      {/* Icon Area */}
      {Icon && (
        <div className={`mt-0.5 p-2.5 rounded-xl transition-colors duration-300 ${selected ? "bg-white text-black" : "bg-white/5 text-zinc-400"}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}

      <div className="flex-1 flex flex-col pt-1">
        <span className={`text-base font-semibold transition-colors duration-300 ${selected ? "text-white" : "text-zinc-300"}`}>
          {title}
        </span>
        {description && (
          <span className="text-sm font-medium text-zinc-500 mt-1 leading-snug">
            {description}
          </span>
        )}
      </div>

      {/* Selection Indicator */}
      <div className="flex-shrink-0 pt-1.5 pl-2">
        <div className={`w-5 h-5 flex items-center justify-center transition-all duration-300 ${type === 'radio' ? 'rounded-full' : 'rounded-md'} border-2 ${selected ? 'border-white bg-white' : 'border-white/20 bg-transparent'}`}>
          {selected && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`bg-black ${type === 'radio' ? 'w-2 h-2 rounded-full' : 'w-2 h-2 rounded-[2px]'}`}
            />
          )}
        </div>
      </div>
    </motion.button>
  );
}
