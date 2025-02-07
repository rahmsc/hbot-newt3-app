"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";

type FilterOption = "all" | "wellness" | "recovery" | "medical";

interface ProvidersFilterProps {
  onFilterChange: (filter: FilterOption) => void;
}

export function ProvidersFilter({ onFilterChange }: ProvidersFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");

  const handleFilterChange = (filter: FilterOption) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="flex items-center justify-end space-x-2 p-2">
      <Button
        variant={activeFilter === "all" ? "default" : "outline"}
        onClick={() => handleFilterChange("all")}
        className="rounded-full text-sm font-medium"
      >
        All
      </Button>
      <Button
        variant={activeFilter === "wellness" ? "default" : "outline"}
        onClick={() => handleFilterChange("wellness")}
        className="rounded-full text-sm font-medium"
      >
        Wellness
      </Button>
      <Button
        variant={activeFilter === "recovery" ? "default" : "outline"}
        onClick={() => handleFilterChange("recovery")}
        className="rounded-full text-sm font-medium"
      >
        Recovery
      </Button>
      <Button
        variant={activeFilter === "medical" ? "default" : "outline"}
        onClick={() => handleFilterChange("medical")}
        className="rounded-full text-sm font-medium"
      >
        Medical
      </Button>
    </div>
  );
}
