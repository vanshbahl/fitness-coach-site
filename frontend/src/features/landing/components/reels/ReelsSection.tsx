import { useState } from "react";
import { useFeaturedMedia } from "@/hooks/api/featuredMedia";
import { SectionHeader } from "./SectionHeader";
import { ReelCarousel } from "./ReelCarousel";

export function ReelsSection() {
  const { data: mediaList, isLoading } = useFeaturedMedia();
  const [isMuted, setIsMuted] = useState(true);

  if (isLoading || !mediaList || mediaList.length === 0) {
    return null; // Do not render section if there's no data
  }

  return (
    <section className="py-24 relative overflow-hidden flex flex-col items-center">
      {/* Subtle fade-in animation container */}
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out fill-mode-both">
        <SectionHeader />
        
        <ReelCarousel 
          mediaList={mediaList} 
          isMuted={isMuted} 
          onToggleMute={() => setIsMuted((prev) => !prev)} 
        />
      </div>
    </section>
  );
}
