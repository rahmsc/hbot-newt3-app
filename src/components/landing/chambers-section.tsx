"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { combinedChamberData } from "~/data/combinedChambersData";
import type { chambersDataProp } from "~/data/rebrandData";

import { ChamberCard } from "../chambers/chambers-card";
import { ChamberQuickView } from "../chambers/chambers-quick-view";
import TitlePill from "./title-pill";

export function ChambersSection() {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedChamber, setSelectedChamber] =
    useState<chambersDataProp | null>(null);

  // Initialize the carousel with autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": { slidesToScroll: 3 },
      },
    },
    [Autoplay()],
  );

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="container mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <TitlePill>Explore Chambers</TitlePill>
          <Link href="/chambers">
            <Button variant="default" className="gap-2 text-xl">
              View all
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {combinedChamberData.map((chamber) => (
                <div
                  key={chamber.id}
                  className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <ChamberCard
                    id={chamber.id}
                    name={chamber.name}
                    type={chamber.type}
                    pressure={chamber.pressure}
                    persons={chamber.persons}
                    brand={chamber.brand}
                    image={chamber.image}
                    description={chamber.description}
                    onQuickView={() => {
                      setSelectedChamber(chamber);
                      setIsQuickViewOpen(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 rounded-full"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full"
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {selectedChamber && (
          <ChamberQuickView
            isOpen={isQuickViewOpen}
            onClose={() => {
              setIsQuickViewOpen(false);
              setSelectedChamber(null);
            }}
            chamber={selectedChamber}
          />
        )}
      </div>
    </section>
  );
}
