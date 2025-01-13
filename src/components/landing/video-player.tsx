"use client";
import { motion } from "framer-motion";
import { Maximize, Minimize,Pause, Play } from "lucide-react";
import { useRef,useState } from "react";

interface VideoPlayerProps {
  publicId: string;
  aspectRatio?: string;
}

export default function VideoPlayer({
  publicId,
  aspectRatio = "16:9",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await containerRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } catch (error) {
        console.error("Error entering fullscreen:", error);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (error) {
        console.error("Error exiting fullscreen:", error);
      }
    }
  };

  const videoSrc = `https://d144dqt8e4woe2.cloudfront.net/landing/${publicId}.mp4`;

  // Calculate padding based on aspect ratio
  const [widthRatio, heightRatio] = aspectRatio.split(":").map(Number);
  const paddingTop = `${((heightRatio ?? 9) / (widthRatio ?? 16)) * 100}%`;

  return (
    <div className="mx-auto max-w-3xl" ref={containerRef}>
      <div className="relative" style={{ paddingTop }}>
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="relative h-full w-full">
            <video
              ref={videoRef}
              className="absolute left-0 top-0 h-full w-full rounded-lg object-contain shadow-lg"
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={videoSrc} type="video/mp4" />
              <track
                kind="captions"
                src={`${videoSrc.replace(".mp4", ".vtt")}`}
                srcLang="en"
                label="English"
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={togglePlay}
                type="button"
                className="rounded-full bg-black bg-opacity-50 p-2 text-white transition-opacity duration-300 hover:bg-opacity-75"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </motion.div>
              </button>
              <button
                onClick={toggleFullscreen}
                type="button"
                className="rounded-full bg-black bg-opacity-50 p-2 text-white transition-opacity duration-300 hover:bg-opacity-75"
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isFullscreen ? (
                    <Minimize className="h-6 w-6" />
                  ) : (
                    <Maximize className="h-6 w-6" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
