import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface WheelPickerProps {
  min: number;
  max: number;
  value: number;
  onChange: (val: number) => void;
  suffix?: string;
}

export function WheelPicker({ min, max, value, onChange, suffix = "" }: WheelPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<number[]>([]);
  const ITEM_HEIGHT = 48; // Must match CSS height

  useEffect(() => {
    const arr = [];
    for (let i = min; i <= max; i++) arr.push(i);
    setItems(arr);
  }, [min, max]);

  useEffect(() => {
    // Initial scroll to value
    if (containerRef.current && items.length > 0) {
      const index = items.indexOf(value);
      if (index !== -1) {
        containerRef.current.scrollTop = index * ITEM_HEIGHT;
      }
    }
  }, [items, value]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollY = containerRef.current.scrollTop;
    const activeIndex = Math.round(scrollY / ITEM_HEIGHT);
    const newValue = items[activeIndex];
    if (newValue !== undefined && newValue !== value) {
      onChange(newValue);
    }
  };

  return (
    <div className="relative w-full max-w-xs mx-auto h-[240px] flex justify-center items-center overflow-hidden">
      {/* Highlighting Center Window */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[48px] bg-white/5 border-y border-white/10 pointer-events-none" />
      
      {/* Top and Bottom Fade Masks */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-10" />

      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide py-[96px]" // padding top/bottom to allow first/last items to reach center
      >
        {items.map((num) => {
          const isSelected = value === num;
          return (
            <motion.div 
              key={num} 
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (!isSelected) {
                  const idx = items.indexOf(num);
                  if (containerRef.current) {
                    containerRef.current.scrollTo({ top: idx * ITEM_HEIGHT, behavior: 'smooth' });
                  }
                  onChange(num);
                }
              }}
              className={`h-[48px] snap-center flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isSelected ? "text-3xl font-bold text-white" : "text-xl font-medium text-zinc-500 scale-90 hover:text-zinc-300"
              }`}
            >
              {num} <span className="text-sm font-normal text-zinc-400 ml-1">{suffix}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
