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
  const [slidesPerView, setSlidesPerView] = useState(1);

  const options: EmblaOptionsType = {
    loop: true,
    align: "start",
    slidesToScroll: 1,
    dragFree: true,
    containScroll: "trimSnaps",
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

    const onResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlidesPerView(3);
      } else if (width >= 640) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    onResize();
    window.addEventListener("resize", onResize);

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      window.removeEventListener("resize", onResize);
    };
  }, [emblaApi]);

  // Calculate the number of indicators based on total slides and slides per view
  const totalIndicators = Math.ceil(chambers.length / slidesPerView);

  return (
    <div className={`relative px-4 ${containerClassName}`}>
      <div className="touch-pan-x overflow-hidden" ref={emblaRef}>
        <div className="flex cursor-grab active:cursor-grabbing">
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

      {/* Carousel Controls */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          className="text-[#2B5741] hover:text-emerald-800"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <CarouselIndicator total={totalIndicators} current={currentSlide} />

        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          className="text-[#2B5741] hover:text-emerald-800"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
