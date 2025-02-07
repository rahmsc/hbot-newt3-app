"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { chambersDataProp } from "~/data/rebrandData";
import { combinedChamberData } from "~/data/combinedChambersData";
// import { ChamberCard } from "./chambers-card";
import { ChamberQuickView } from "./chambers-quick-view";
import { ChambersFilter } from "./chambers-filter";

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
  const [visibleChambers, setVisibleChambers] = useState<chambersDataProp[]>(
    [],
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredChambers = combinedChamberData.filter((chamber) => {
    if (filter === "all") return true;
    return chamber.type.toLowerCase() === filter;
  });

  const handleQuickView = useCallback((chamber: chambersDataProp) => {
    setSelectedChamber(chamber);
    setIsQuickViewOpen(true);
  }, []);

  const handleCloseQuickView = useCallback(() => {
    setIsQuickViewOpen(false);
    setSelectedChamber(null);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredChambers.length);
    }, 5000); // Change chambers every 5 seconds

    return () => clearInterval(interval);
  }, [filteredChambers]);

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % filteredChambers.length;
    setVisibleChambers([
      filteredChambers[currentIndex],
      filteredChambers[nextIndex],
    ]);
  }, [currentIndex, filteredChambers]);

  return (
    <section className="w-full bg-[#FAF7F4]">
      <div className="flex items-center justify-between p-2 pl-6">
        <h2 className="font-['Raleway'] text-4xl tracking-[0.3em] text-gray-900">
          CHAMBERS
        </h2>
        <ChambersFilter onFilterChange={setFilter} />
      </div>

      <div className="mx-auto max-w-[1400px] p-8">
        <div className="grid grid-cols-2 gap-8">
          <AnimatePresence>
            {visibleChambers.map((chamber, index) => (
              <motion.div
                key={chamber.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                {/* <ChamberCard chamber={chamber} onQuickView={handleQuickView} /> */}
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
