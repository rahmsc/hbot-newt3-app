"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { cn } from "~/lib/utils";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  thumbnailBlur?: string;
  alt?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}

export function VideoPlayer({
  src,
  poster,
  thumbnailBlur,
  alt = "Video content",
  className,
  autoPlay = false,
  muted = true,
  loop = true,
  controls = true,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPoster, setShowPoster] = useState(!autoPlay);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      togglePlay();
    }
  };

  return (
    <div className={cn("group relative", className)}>
      {/* Thumbnail/Poster Image */}
      {showPoster && poster && (
        <div className="absolute inset-0 z-10">
          <Image
            src={poster}
            alt={alt}
            fill
            className="rounded-lg object-cover"
            placeholder={thumbnailBlur ? "blur" : "empty"}
            blurDataURL={thumbnailBlur}
            priority
          />
        </div>
      )}

      {/* Video Element */}
      <video
        src={src}
        className="h-full w-full rounded-lg object-cover"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
        onLoadedData={() => {
          setIsLoaded(true);
          setShowPoster(false);
        }}
        onPlay={() => setShowPoster(false)}
        onPause={() => setShowPoster(false)}
      />

      {/* Custom Controls Overlay */}
      {!controls && (
        <button
          type="button"
          className={cn(
            "absolute inset-0 z-20 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            isLoaded ? "cursor-pointer" : "cursor-wait",
          )}
          onClick={() => {
            togglePlay();
            setShowPoster(false);
          }}
          onKeyDown={handleKeyDown}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {!isPlaying && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
              <Play className="h-8 w-8 text-black" />
            </div>
          )}
          {isPlaying && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
              <Pause className="h-8 w-8 text-black" />
            </div>
          )}
        </button>
      )}

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-gray-100">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-500" />
        </div>
      )}
    </div>
  );
}
