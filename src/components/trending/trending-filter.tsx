"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";

type FilterOption = "latest" | "blogs" | "guides";

interface TrendingFilterProps {
  onFilterChange: (filter: FilterOption) => void;
}

export function TrendingFilter({ onFilterChange }: TrendingFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("latest");

  const handleFilterChange = (filter: FilterOption) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="flex w-full justify-center gap-2 sm:justify-end">
      <div className="grid w-full grid-cols-3 gap-2 px-4 sm:w-auto sm:flex sm:px-0">
        <Button
          variant={activeFilter === "blogs" ? "default" : "outline"}
          onClick={() => handleFilterChange("blogs")}
          className={`rounded-full text-sm font-medium ${
            activeFilter === "blogs"
              ? "bg-emerald-700 text-white hover:bg-emerald-600"
              : "border-emerald-700 text-emerald-700 hover:bg-emerald-50"
          }`}
        >
          Blogs
        </Button>
        <Button
          variant={activeFilter === "guides" ? "default" : "outline"}
          onClick={() => handleFilterChange("guides")}
          className={`rounded-full text-sm font-medium ${
            activeFilter === "guides"
              ? "bg-emerald-700 text-white hover:bg-emerald-600"
              : "border-emerald-700 text-emerald-700 hover:bg-emerald-50"
          }`}
        >
          Guides
        </Button>
        <Button
          variant={activeFilter === "latest" ? "default" : "outline"}
          onClick={() => handleFilterChange("latest")}
          className={`rounded-full text-sm font-medium ${
            activeFilter === "latest"
              ? "bg-emerald-700 text-white hover:bg-emerald-600"
              : "border-emerald-700 text-emerald-700 hover:bg-emerald-50"
          }`}
        >
          Latest
        </Button>
      </div>
    </div>
  );
}
