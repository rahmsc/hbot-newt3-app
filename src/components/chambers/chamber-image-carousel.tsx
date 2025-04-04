"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ImageGalleryModal } from "./image-gallery-modal";
import { ChamberCard } from "./chambers-card";
import type { ChamberProps } from "~/types/chambers";

interface ChamberImageCarouselProps {
  images: string[];
  baseUrl: string;
  chamberName: string;
  chambers?: ChamberProps[]; // Optional chambers data
  displayMode?: "images" | "cards"; // Control display mode
  onQuickView?: (chamber: ChamberProps) => void;
}

export function ChamberImageCarousel({
  images,
  baseUrl,
  chamberName,
  chambers = [],
  displayMode = "images",
  onQuickView,
}: ChamberImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log("ChamberImageCarousel - Images:", images);
    console.log("ChamberImageCarousel - BaseUrl:", baseUrl);

    // Log the exact URLs being constructed
    images.forEach((image, index) => {
      console.log(`Image ${index} URL: ${baseUrl}${image}.png`);
    });
  }, [images, baseUrl]);

  // Skip rendering if no images
  if (!images || images.length === 0) return null;

  // If only one image/chamber and using image mode, render it without carousel controls
  if (images.length === 1 && displayMode === "images") {
    return (
      <>
        <div
          className="relative h-full w-full cursor-pointer"
          onClick={() => setIsGalleryOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsGalleryOpen(true);
            }
          }}
        >
          <Image
            src={`${baseUrl}${images[0]}.png`}
            alt={chamberName ?? "Chamber"}
            fill
            className="object-cover transition-all duration-500 hover:scale-[1.02]"
            priority
          />
        </div>

        <ImageGalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          images={images}
          baseUrl={baseUrl}
          initialIndex={0}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          altText={chamberName}
        />
      </>
    );
  }

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="relative h-full w-full">
        {displayMode === "images" ? (
          // Image carousel mode
          <div
            className="relative h-full w-full cursor-pointer"
            onClick={() => setIsGalleryOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsGalleryOpen(true);
              }
            }}
          >
            {images.map((image, index) => (
              <div
                key={`carousel-${image}-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  index
                }`}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  currentIndex === index
                    ? "opacity-100"
                    : "pointer-events-none opacity-0",
                )}
              >
                <Image
                  src={`${baseUrl}${image}.png`}
                  alt={`${chamberName ?? "Chamber"} - Image ${index + 1}`}
                  fill
                  className="object-cover transition-all duration-500 hover:scale-[1.02]"
                  priority={index === 0}
                  onError={(e) => {
                    console.error(
                      `Failed to load carousel image: ${baseUrl}${image}.png`,
                      e,
                    );
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          // Card carousel mode
          <div className="relative flex h-full w-full items-center justify-center">
            {chambers.map((chamber, index) => (
              <div
                key={`chamber-card-${chamber.id || index}`}
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                  currentIndex === index
                    ? "opacity-100"
                    : "pointer-events-none opacity-0",
                )}
              >
                <ChamberCard
                  chamber={chamber}
                  onQuickView={(chamber) => onQuickView?.(chamber)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Navigation controls - show for both modes */}
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full bg-white/80 shadow-sm backdrop-blur-sm hover:bg-white"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="absolute right-4 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full bg-white/80 shadow-sm backdrop-blur-sm hover:bg-white"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Indicator dots */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              type="button"
              key={`thumb-${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }`}
              onClick={(e) => goToImage(index, e)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentIndex === index
                  ? "w-6 bg-white"
                  : "w-2 bg-white/60 hover:bg-white/80",
              )}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Only open gallery modal when in image mode */}
      {displayMode === "images" && (
        <ImageGalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          images={images}
          baseUrl={baseUrl}
          initialIndex={currentIndex}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          altText={chamberName}
        />
      )}
    </>
  );
}
