"use client";
import { useState, useEffect } from "react";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import type { ChamberProps } from "~/types/chambers";
import { CarouselIndicator } from "~/components/utils/carousel-indicator";
import { MobileChamberCard } from "~/components/chambers/mobile-chamber-card";

interface RelatedChambersCarouselProps {
  chambers: ChamberProps[];
  imageUrl: string;
  onQuickView?: (chamber: ChamberProps) => void;
  containerClassName?: string;
}

export function RelatedChambersCarousel({
  chambers,
  imageUrl,
  onQuickView,
  containerClassName = "",
}: RelatedChambersCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const options: EmblaOptionsType = {
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 640px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className={`relative px-4 ${containerClassName}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {chambers.map((chamber) => (
            <div
              key={chamber.id}
              className="min-w-[90vw] flex-none px-2 sm:min-w-[50%] lg:min-w-[33.333%]"
            >
              <Link
                href={`/chambers/${chamber.name?.toLowerCase().replace(/\s+/g, "-")}`}
                className="block"
              >
                <div className="transform rounded-xl shadow-[0_4px_8px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
                  <MobileChamberCard
                    chamber={chamber}
                    onQuickView={onQuickView}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Indicator */}
      <div className="mt-4">
        <CarouselIndicator total={chambers.length} current={currentSlide} />
      </div>

      {/* Navigation Buttons - Hidden on mobile */}
      <div className="hidden sm:block">
        <Button
          variant="outline"
          size="icon"
          className="absolute -left-5 top-1/2 -translate-y-1/2 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute -right-5 top-1/2 -translate-y-1/2 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => emblaApi?.scrollNext()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
