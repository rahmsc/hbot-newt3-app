"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useState } from "react";

import type { chambersDataProp } from "~/types/chambers";

import GlowingButton from "../utils/glowing-button";
import { ChambersFilter } from "./chambers-filter";
import { ChamberQuickView } from "./chambers-quick-view";

interface ChambersGridProps {
  chambers: chambersDataProp[];
}

export function ChambersGrid({ chambers }: ChambersGridProps) {
  const [selectedChamber, setSelectedChamber] =
    useState<chambersDataProp | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "portable" | "mild" | "hard">(
    "all",
  );

  const filteredChambers = chambers.filter((chamber) => {
    if (filter === "all") return true;
    return chamber.type.toLowerCase().includes(filter.toLowerCase());
  });

  const handleViewClick = useCallback((chamber: chambersDataProp) => {
    setSelectedChamber(chamber);
    setIsQuickViewOpen(true);
  }, []);

  const handleCloseQuickView = useCallback(() => {
    setIsQuickViewOpen(false);
    setSelectedChamber(null);
  }, []);

  const handleFilterChange = (value: string) => {
    setFilter(value as "all" | "portable" | "mild" | "hard");
  };

  return (
    <section className="w-full bg-[#FAF7F4]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-['Raleway'] text-4xl font-medium tracking-[0.3em] text-gray-900">
              CHAMBER RANGE
            </h1>
            <p className="mt-2 text-xl font-light text-gray-600">
              Explore our curated selection of premium hyperbaric chambers
            </p>
          </div>
          <ChambersFilter onFilterChange={handleFilterChange} />
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {filteredChambers.map((chamber) => (
              <motion.div
                key={chamber.uniqueId}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="px-1 py-1"
              >
                <div className="overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl">
                  <div className="relative h-[550px]">
                    <Image
                      src={chamber.image || "/placeholder.svg"}
                      alt={chamber.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <h3 className="mb-2 font-['Raleway'] text-4xl font-semibold uppercase tracking-wider text-white">
                        {chamber.name}
                      </h3>
                      <p className="mb-4 flex flex-col gap-2 font-mono text-sm text-gray-200">
                        <span>Type: {chamber.type}</span>
                        <span>Max Pressure: {chamber.pressure}</span>
                        <span>Capacity: {chamber.persons} persons</span>
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
      </div>

      <ChamberQuickView
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        chamber={selectedChamber}
      />
    </section>
  );
}
