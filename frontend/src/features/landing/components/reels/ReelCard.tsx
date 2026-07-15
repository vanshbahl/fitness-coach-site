import { FeaturedMedia } from "@/types/featuredMedia";
import { useEffect, useRef } from "react";
import { MuteButton } from "./MuteButton";

interface ReelCardProps {
  media: FeaturedMedia;
  isActive: boolean;
  isAdjacent: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function ReelCard({ media, isActive, isAdjacent, isMuted, onToggleMute }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isActive) {
      // Small timeout ensures the video is ready to play after scrolling
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay may be blocked by browser
        });
      }
    } else {
      videoRef.current.pause();
    }
  }, [isActive]);

  const preloadStrategy = isActive ? "auto" : isAdjacent ? "metadata" : "none";

  return (
    <div 
      className={`w-[300px] sm:w-[320px] aspect-[9/16] shrink-0 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl relative snap-center transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-60 scale-95 hover:opacity-80'}`}
    >
      {media.video_url ? (
        <video 
          ref={videoRef}
          src={media.video_url}
          preload={preloadStrategy}
          muted={isMuted}
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center text-zinc-700">
          No Video
        </div>
      )}

      {/* Metadata Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-start">
        <h3 className="text-white font-semibold text-lg leading-tight mb-1">{media.title}</h3>
        {media.caption && (
          <p className="text-zinc-300 text-sm line-clamp-2 mb-3">{media.caption}</p>
        )}
        {media.instagram_url && (
          <a
            href={media.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${media.title} reel on Instagram`}
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 underline decoration-transparent hover:decoration-white underline-offset-4"
          >
            View on Instagram ↗
          </a>
        )}
      </div>

      {/* Mute toggle for native video only */}
      {media.video_url && (
        <MuteButton isMuted={isMuted} onToggle={onToggleMute} />
      )}
    </div>
  );
}
