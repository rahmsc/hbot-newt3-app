"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { MobileChamberCard } from "~/components/chambers/mobile-chamber-card";
import { ChamberQuickView } from "~/components/chambers/chambers-quick-view";
import { Button } from "~/components/ui/button";
import type { ChamberProps } from "~/types/chambers";
import { createClient } from "~/utils/supabase/client";
import GlowingButton from "~/components/utils/glowing-button";
import { CarouselIndicator } from "~/components/utils/carousel-indicator";
import LoadingSpinner from "~/components/utils/spinner";
import { ChamberCarousel } from "~/components/chambers/chamber-carousel";

export function ChambersSection() {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedChamber, setSelectedChamber] = useState<ChamberProps | null>(
    null,
  );
  const [chambers, setChambers] = useState<ChamberProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    async function fetchChambers() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("chamber_products")
        .select("*")
        .order("id");

      if (!error && data) {
        setChambers(data);
      }
      setIsLoading(false);
    }

    void fetchChambers();
  }, []);

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

  // Handler for quick view
  const handleQuickView = (chamber: ChamberProps) => {
    setSelectedChamber(chamber);
    setIsQuickViewOpen(true);
  };

  if (isLoading) {
    return (
      <section className="w-full">
        <div className="flex h-screen items-center justify-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12">
      <div className="h-px w-full bg-gray-600" />
      <div className="flex flex-col items-start justify-between gap-4 px-4 pt-2 sm:flex-row sm:items-center sm:px-16">
        <div className="w-full space-y-2 pt-2 sm:w-auto">
          <h2 className="text-center font-['Raleway'] text-xl font-normal tracking-[0.5em] text-gray-700 sm:text-left sm:text-2xl sm:tracking-[0.3em]">
            EXPLORE CHAMBERS
          </h2>
          <h4 className="text-center text-sm text-gray-500 sm:text-left">
            The best chambers at the best prices. Guaranteed.
          </h4>
          <Link href="/chambers" className="mt-4 block w-full sm:hidden">
            <Button
              variant="default"
              className="w-full bg-[#2B5741] transition-all duration-200 hover:bg-emerald-800 sm:w-auto"
            >
              View Chambers
            </Button>
          </Link>
        </div>
        <Link href="/chambers" className="hidden sm:block">
          <Button
            variant="default"
            className="bg-[#2B5741] transition-all duration-200 hover:bg-emerald-800"
          >
            View Chambers
          </Button>
        </Link>
      </div>

      {/* Use the unified carousel component */}
      <ChamberCarousel
        chambers={chambers}
        imageUrl="https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/chambers/"
        variant="landing"
        showQuickView={true}
        onQuickView={handleQuickView}
        containerClassName="pt-8"
      />

      {/* Quick View Modal */}
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
