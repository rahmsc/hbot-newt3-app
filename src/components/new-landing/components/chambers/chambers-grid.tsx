"use client";

import { useState } from "react";
import { ChamberCard } from "./chambers-card";
import { ChamberQuickView } from "./chambers-quick-view";
import { combinedChamberData } from "~/data/combinedChambersData";
import type { chambersDataProp } from "~/data/rebrandData";

export function ChambersGrid() {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false);
  const [selectedChamber, setSelectedChamber] =
    useState<chambersDataProp | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {combinedChamberData.map((chamber) => (
          <div key={chamber.id}>
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
    </>
  );
}
