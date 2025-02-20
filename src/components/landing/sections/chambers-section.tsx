"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ChamberCard } from "~/components/chambers/chambers-card";
import { ChamberQuickView } from "~/components/chambers/chambers-quick-view";
import { Button } from "~/components/ui/button";
import type { ChamberProps } from "~/types/chambers";
import { createClient } from "~/utils/supabase/client";

export function ChambersSection() {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedChamber, setSelectedChamber] = useState<ChamberProps | null>(null);
  const [chambers, setChambers] = useState<ChamberProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      }),
    ],
  );

  useEffect(() => {
    async function fetchChambers() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("chambers")
        .select("*")
        .order("id");

      if (!error && data) {
        setChambers(data);
      }
      setIsLoading(false);
    }

    void fetchChambers();
  }, []);

  if (isLoading) {
    return <div>Loading chambers...</div>;
  }

  return (
    <section className="w-full pb-12">
      <div className="h-px w-full bg-gray-600" />
      <div className="flex items-center justify-between px-16 py-2">
        <div className="space-y-2">
          <h2 className="font-['Raleway'] text-2xl font-normal tracking-[0.3em] text-gray-700">
            EXPLORE CHAMBERS
          </h2>
          <h4 className="text-sm text-gray-500">
            The best chambers at the best prices. Guaranteed.
          </h4>
        </div>
        <Link href="/chambers">
          <Button
            variant="default"
            className="bg-emerald-700 transition-all duration-200 hover:bg-emerald-800"
          >
            View Chambers
          </Button>
        </Link>
      </div>

      <div className="relative px-8 pt-12">
        {/* Carousel Container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {chambers.map((chamber) => (
              <div
                key={chamber.id}
                className="min-w-0 flex-[0_0_100%] px-1 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <ChamberCard
                  chamber={chamber}
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
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white"
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
    </section>
  );
}
