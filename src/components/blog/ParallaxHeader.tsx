"use client";

import Image from "next/image";
import { Bookmark } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/contexts/auth-context";
import { useTrendingBookmark } from "~/hooks/use-trending-bookmark";

interface ParallaxHeaderProps {
  title: string;
  imageUrl: string;
  progress: number;
  blogId: number;
}

export default function ParallaxHeader({
  title,
  imageUrl,
  progress,
  blogId,
}: ParallaxHeaderProps) {
  const { user } = useAuth();
  const { isBookmarked, isLoading, toggleBookmark } = useTrendingBookmark(
    blogId,
    user?.id,
  );

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    void toggleBookmark();
  };

  return (
    <div className="fixed inset-0 h-[100vh] overflow-hidden">
      <div className="absolute inset-0 z-10 bg-black/50" />
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${progress * 10}%)`,
          opacity: 1 - progress * 0.5,
        }}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6 px-4">
          <h1
            className="max-w-4xl text-center text-4xl font-bold text-white md:text-6xl"
            style={{
              transform: `translateY(${progress * -50}px)`,
              opacity: 1 - progress,
            }}
          >
            {title}
          </h1>
          {user && (
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className={`flex items-center space-x-2 rounded-full bg-black/30 px-6 py-3 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/40 ${
                isBookmarked
                  ? "bg-[#2B5741] ring-2 ring-[#2B5741] hover:bg-[#2B5741]/90"
                  : ""
              }`}
              onClick={handleBookmarkClick}
              disabled={isLoading}
              style={{
                transform: `translateY(${progress * -50}px)`,
                opacity: 1 - progress,
              }}
            >
              <Bookmark
                className={`h-5 w-5 transition-colors sm:h-6 sm:w-6 ${
                  isBookmarked ? "fill-white stroke-white" : "stroke-white"
                }`}
                strokeWidth={2.5}
              />
              <span className="ml-2 text-sm font-medium sm:text-base">
                {isBookmarked ? "Saved" : "Save for Later"}
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
