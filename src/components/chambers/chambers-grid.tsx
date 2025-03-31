/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import type { ChamberProduct } from "~/types/database";

import GlowingButton from "../utils/glowing-button";
import { ChambersFilter } from "./chambers-filter";
import { ChamberQuickView } from "./chambers-quick-view";
import { CarouselIndicator } from "../utils/carousel-indicator";

interface ChambersGridProps {
  chambers: ChamberProduct[];
}

export function ChambersGrid({ chambers }: ChambersGridProps) {
  const [selectedChamber, setSelectedChamber] = useState<ChamberProduct | null>(
    null,
  );
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: "all",
    shell: "all",
    capacity: "all",
  });
  const [resetCount, setResetCount] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    slidesToScroll: 1,
    inViewThreshold: 0.7,
  });

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

  const imageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/chambers/";

  const filteredChambers = chambers.filter((chamber) => {
    // Type filter (Sit Up vs Lay Down)
    if (
      filters.type &&
      filters.type !== "all" &&
      !chamber.type?.toLowerCase().includes(filters.type.toLowerCase())
    ) {
      return false;
    }

    // Shell filter (Hard Shell vs Soft Shell)
    if (
      filters.shell &&
      filters.shell !== "all" &&
      !chamber.type?.toLowerCase().includes(filters.shell.toLowerCase())
    ) {
      return false;
    }

    // Capacity filter
    if (filters.capacity && filters.capacity !== "all") {
      // Extract just the number from capacity field (e.g., "1 Person" -> "1")
      const capacityNumber = chamber.capacity?.match(/^(\d+)/)?.[1];
      if (capacityNumber !== filters.capacity) {
        return false;
      }
    }

    return true;
  });

  const handleViewClick = useCallback((chamber: ChamberProduct) => {
    setSelectedChamber(chamber);
    setIsQuickViewOpen(true);
  }, []);

  const handleCloseQuickView = useCallback(() => {
    setIsQuickViewOpen(false);
    setSelectedChamber(null);
  }, []);

  const handleFilterChange = (newFilters: {
    type: string;
    shell: string;
    capacity: string;
  }) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    const resetValues = {
      type: "all",
      shell: "all",
      capacity: "all",
    };
    setFilters(resetValues);
    setResetCount((prev) => prev + 1);
  };

  // Handle "no results" case
  const renderChamberContent = () => {
    if (!chambers?.length) {
      // Loading state (already implemented)
      return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[550px] overflow-hidden rounded-lg">
              <Skeleton className="h-full w-full" />
            </div>
          ))}
        </div>
      );
    }

    if (filteredChambers.length === 0) {
      // No results state
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-6 rounded-full bg-gray-100 p-6">
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-2xl font-medium text-gray-700">
            No Chambers Found
          </h3>
          <p className="mb-8 max-w-md text-gray-500">
            We couldn&apos;t find any chambers matching your current filters.
            Please try adjusting your filter criteria or explore our other
            options.
          </p>
          <Button
            onClick={handleResetFilters}
            className="flex items-center gap-2"
          >
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset Filters
          </Button>
        </div>
      );
    }

    // Regular content - chambers display
    return (
      <>
        {/* Mobile Carousel View */}
        <div className="block sm:hidden">
          <div className="relative pt-4">
            <div className="overflow-visible" ref={emblaRef}>
              <div className="-ml-4 flex">
                <AnimatePresence>
                  {filteredChambers.map((chamber) => (
                    <div
                      key={chamber.id}
                      className="min-w-[85vw] flex-none pl-4"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        className="relative h-[500px] overflow-hidden rounded-2xl shadow-lg"
                      >
                        <Image
                          src={`${imageUrl}${chamber.images?.[0] ?? `${chamber.id}_1`}.png`}
                          alt={chamber.name ?? "Chamber"}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 85vw"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                          <h3 className="mb-2 font-['Raleway'] text-2xl font-semibold uppercase tracking-wider text-white">
                            {chamber.name}
                          </h3>
                          <p className="mb-4 flex flex-col gap-2 font-mono text-sm text-gray-200">
                            <span>Type: {chamber.type}</span>
                            <span>Max Pressure: {chamber.ata} ATA</span>
                            <span>Capacity: {chamber.capacity}</span>
                          </p>
                          <GlowingButton
                            text="More Info"
                            onClick={() => handleViewClick(chamber)}
                            className="w-full"
                          />
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Remove the navigation buttons since we're using the peek effect */}
            <div className="md:hidden">
              <CarouselIndicator
                total={filteredChambers.length}
                current={currentSlide}
              />
            </div>
          </div>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden grid-cols-1 gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {filteredChambers.map((chamber) => (
              <motion.div
                key={chamber.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="px-0.5 py-0.5"
              >
                <div className="overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl">
                  <div className="relative h-[550px]">
                    <Image
                      src={`${imageUrl}${chamber.images?.[0] ?? `${chamber.id}_1`}.png`}
                      alt={chamber.name ?? "Chamber"}
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 50vw, (min-width: 1024px) 33vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <h3 className="mb-2 font-['Raleway'] text-4xl font-semibold uppercase tracking-wider text-white">
                        {chamber.name}
                      </h3>
                      <p className="mb-4 flex flex-col gap-2 font-mono text-sm text-gray-200">
                        <span>Type: {chamber.type}</span>
                        <span>Max Pressure: {chamber.ata} ATA</span>
                        <span>Capacity: {chamber.capacity}</span>
                      </p>
                      <GlowingButton
                        text="More Info"
                        onClick={() => handleViewClick(chamber)}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </>
    );
  };

  return (
    <section className="w-full bg-[#FAF7F4]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full space-y-2 sm:w-auto">
            <h1 className="text-center font-['Raleway'] text-lg font-normal tracking-[0.5em] text-gray-700 sm:text-left sm:text-4xl sm:tracking-[0.3em]">
              CHAMBER RANGE
            </h1>
            <p className="text-center text-sm font-light text-gray-500 sm:text-left sm:text-xl">
              Explore our curated selection of premium hyperbaric chambers.
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <ChambersFilter
              onFilterChange={(filters) =>
                handleFilterChange({
                  type: filters.type,
                  shell: filters.shell,
                  capacity: filters.capacity,
                })
              }
              resetTrigger={resetCount}
            />
          </div>
        </div>

        {/* Use the function to determine what to render */}
        {renderChamberContent()}
      </div>

      <ChamberQuickView
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        chamber={selectedChamber}
      />
    </section>
  );
}
