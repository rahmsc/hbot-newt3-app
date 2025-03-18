"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import type { ChamberProps } from "~/types/chambers";
import { CarouselIndicator } from "~/components/utils/carousel-indicator";
import { MobileChamberCard } from "~/components/chambers/mobile-chamber-card";

interface ChamberCarouselProps {
  chambers: ChamberProps[];
  imageUrl: string;
  variant?: "default" | "product-page" | "landing";
  showQuickView?: boolean;
  onQuickView?: (chamber: ChamberProps) => void;
  containerClassName?: string;
}

export function ChamberCarousel({
  chambers,
  imageUrl,
  variant = "default",
  showQuickView = false,
  onQuickView,
  containerClassName = "",
}: ChamberCarouselProps) {
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
              {variant === "landing" ? (
                <MobileChamberCard
                  chamber={chamber}
                  onQuickView={
                    showQuickView && onQuickView ? onQuickView : undefined
                  }
                />
              ) : (
                <Link
                  href={`/chambers/${chamber.name?.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block transition-all hover:-translate-y-1"
                >
                  <div className="overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg">
                    <div className="relative aspect-square">
                      <Image
                        src={`${imageUrl}${chamber.id}.png`}
                        alt={chamber.name ?? ""}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-['Space_Mono'] text-xs uppercase tracking-wider text-gray-600">
                        {chamber.type} | {chamber.ata} ATA
                      </p>
                      <h3 className="mt-1 text-lg font-bold tracking-wide">
                        {chamber.name}
                      </h3>
                      <div className="mt-3 flex gap-2">
                        <span className="rounded-full bg-[#2B5741] px-3 py-1 text-xs font-medium text-white">
                          {chamber.capacity}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
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
