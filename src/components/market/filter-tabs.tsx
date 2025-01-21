"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "~/lib/utils";

export type SortOption =
  | "Most Ordered"
  | "Least Ordered"
  | "Price: Low to High"
  | "Price: High to Low";

const tabs = [
  { name: "Home", href: "#" },
  { name: "All Products", href: "#" },
  { name: "Most Ordered", href: "#" },
  { name: "Supplements", href: "#" },
  { name: "Guides", href: "#" },
  { name: "Chambers", href: "#" },
];

interface FilterTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onSortChange?: (sortOption: SortOption) => void;
}

export function FilterTabs({
  activeTab = "Home",
  onTabChange,
  onSortChange,
}: FilterTabsProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabClick = (tabName: string) => {
    setCurrentTab(tabName);
    onTabChange?.(tabName);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange?.(e.target.value as SortOption);
  };

  return (
    <div className="w-full bg-[#F2F2F2] px-6 py-4">
      <h1 className="mb-6 text-2xl font-bold text-black">
        {currentTab === "Home" ? "Featured Products" : currentTab}
      </h1>
      <div className="flex items-center gap-6">
        <button
          type="button"
          className="flex h-8 items-center justify-center rounded-sm border border-gray-300 bg-white px-6 text-sm font-medium"
        >
          Filter
        </button>
        <nav className="flex flex-1 items-center gap-8">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.name}
              onClick={() => handleTabClick(tab.name)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-black",
                currentTab === tab.name ? "text-black" : "text-gray-600",
              )}
            >
              {tab.name}
            </button>
          ))}
        </nav>
        <select
          className="h-8 appearance-none rounded-sm border border-gray-300 bg-white px-4 text-sm font-medium"
          defaultValue="Most Ordered"
          onChange={handleSortChange}
        >
          <option>Most Ordered</option>
          <option>Least Ordered</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
