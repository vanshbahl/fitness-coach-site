interface CarouselIndicatorsProps {
  total: number;
  activeIndex: number;
}

export function CarouselIndicators({ total, activeIndex }: CarouselIndicatorsProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {Array.from({ length: total }).map((_, index) => (
        <div 
          key={index}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            index === activeIndex 
              ? 'w-6 bg-white' 
              : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
          }`}
        />
      ))}
    </div>
  );
}
