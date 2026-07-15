import { useState, useRef, useEffect } from "react";
import { FeaturedMedia } from "@/types/featuredMedia";
import { ReelCard } from "./ReelCard";
import { CarouselIndicators } from "./CarouselIndicators";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ReelCarouselProps {
  mediaList: FeaturedMedia[];
  isMuted: boolean;
  onToggleMute: () => void;
}

export function ReelCarousel({ mediaList, isMuted, onToggleMute }: ReelCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Total items = mediaList.length
  const totalItems = mediaList.length;

  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    
    // Determine active index based on scroll position
    const itemWidth = 320 + 24; // Card width (approx) + gap
    const newActiveIndex = Math.round(scrollLeft / itemWidth);
    
    if (newActiveIndex !== activeIndex) {
      setActiveIndex(Math.min(Math.max(newActiveIndex, 0), totalItems - 1));
    }
    
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    
    const itemWidth = 320 + 24;
    containerRef.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && canScrollLeft) {
        scrollToIndex(activeIndex - 1);
      } else if (e.key === "ArrowRight" && canScrollRight) {
        scrollToIndex(activeIndex + 1);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, canScrollLeft, canScrollRight]);

  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden group">
      
      {/* Desktop Navigation Arrows (hidden on mobile, appear on hover) */}
      <div className="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/50 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        {canScrollLeft && (
          <button 
            onClick={() => scrollToIndex(activeIndex - 1)}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all pointer-events-auto"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
      </div>
      
      <div className="hidden md:block absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/50 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        {canScrollRight && (
          <button 
            onClick={() => scrollToIndex(activeIndex + 1)}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all pointer-events-auto"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Snap Scrolling Container */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-[calc(50vw-150px)] sm:px-[calc(50vw-160px)] py-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {mediaList.map((media, index) => (
          <ReelCard 
            key={media.id}
            media={media}
            isActive={index === activeIndex}
            isAdjacent={Math.abs(index - activeIndex) === 1}
            isMuted={isMuted}
            onToggleMute={onToggleMute}
          />
        ))}
      </div>

      <CarouselIndicators total={totalItems} activeIndex={activeIndex} />
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}
