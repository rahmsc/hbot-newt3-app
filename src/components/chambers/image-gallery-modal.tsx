/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  baseUrl: string;
  initialIndex: number;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  altText: string;
}

export function ImageGalleryModal({
  isOpen,
  onClose,
  images,
  baseUrl,
  initialIndex,
  currentIndex,
  setCurrentIndex,
  altText,
}: ImageGalleryModalProps) {
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [setCurrentIndex, images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [setCurrentIndex, images.length]);

  // Handle keyboard navigation and escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, goToNext, goToPrevious]);

  if (!isOpen) return null;

  // Safety check
  if (!images || images.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
        <div className="rounded-lg bg-white p-4">
          <p>No images to display</p>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    );
  }

  // Ensure current index is valid
  const actualIndex = Math.min(Math.max(0, currentIndex), images.length - 1);
  const currentImage = images[actualIndex];
  const imgUrl = `${baseUrl}${currentImage}.png`;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      {/* Debug display */}
      <div className="absolute left-2 top-2 rounded bg-white/10 px-2 py-1 text-xs text-white">
        Showing image {actualIndex + 1} of {images.length}
      </div>

      <div className="relative flex w-full max-w-5xl flex-col items-center">
        {/* Close button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-10 h-10 w-10 rounded-full bg-black/20 text-white hover:bg-black/40"
          aria-label="Close gallery"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Super simple image display */}
        <div className="mb-4 flex h-[70vh] w-full justify-center">
          <img
            src={imgUrl}
            alt={`${altText} - chamber ${actualIndex + 1}`}
            className="max-h-full max-w-full rounded-xl object-contain"
          />
        </div>

        {/* Navigation controls */}
        <div className="flex w-full justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Thumbnail navigation */}
        <div className="mt-4 flex justify-center gap-2 px-2">
          {images.map((_, index) => (
            <button
              type="button"
              key={`thumb-${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }`}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentIndex === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/60 hover:bg-white/80",
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
