"use client";

import { Search, ChevronDown, Shield, Activity, Users, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "~/lib/utils";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Badge } from "~/components/ui/badge";

export interface SidebarProps {
  categories: {
    categoryId: number;
    categoryName: string;
    conditions: {
      id: number;
      name: string;
      articleCount?: number;
    }[];
  }[];
  isSidebarOpen: boolean;
  selectedConditionId: number | null;
  openCategory: string | undefined;
  onCategoryChange: (value: string | undefined) => void;
  onConditionSelect: (id: number) => void;
  onSidebarToggle: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function Sidebar({
  categories,
  isSidebarOpen,
  selectedConditionId,
  openCategory,
  onCategoryChange,
  onConditionSelect,
  onSidebarToggle,
  searchQuery,
  onSearchChange,
}: SidebarProps) {
  const [selectedCondition, setSelectedCondition] = useState<{name: string} | null>(null);

  // Find and set the selected condition whenever selectedConditionId changes
  useEffect(() => {
    if (selectedConditionId) {
      const condition = categories
        .flatMap(category => category.conditions)
        .find(condition => condition.id === selectedConditionId);
      setSelectedCondition(condition ?? null);
    } else {
      setSelectedCondition(null);
    }
  }, [selectedConditionId, categories]);

  // Map category to icon
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case "neurological":
        return <Activity className="h-4 w-4" />;
      case "autoimmune":
        return <Shield className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  // Filter conditions based on search query
  const filterConditions = (conditions: Array<{ name: string; id: number; articleCount?: number }>) => {
    return conditions.filter(condition =>
      condition.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="relative flex h-full">
      {/* Search bar with close button */}
      <div className={cn(
        "absolute left-0 right-0 top-0 z-20 flex h-[72px] items-center gap-2 border-b border-gray-200 bg-white transition-all duration-300",
        isSidebarOpen 
          ? "w-[280px] opacity-100" 
          : "w-0 opacity-0 pointer-events-none"
      )}>
        <div className="flex w-full items-center gap-2 px-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conditions..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-9 w-full rounded-md border border-gray-200 bg-white pl-9 pr-4 text-sm focus-visible:ring-1 focus-visible:ring-gray-200"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 hover:bg-gray-100"
            onClick={onSidebarToggle}
          >
            <X className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Sidebar content */}
      <div
        className={cn(
          "h-full overflow-hidden transition-all duration-300",
          isSidebarOpen ? "w-[280px]" : "w-0"
        )}
      >
        <div className="flex h-full w-[280px] flex-col">
          {/* Spacer for fixed search bar */}
          <div className="h-[72px]" />

          {/* Categories List */}
          <ScrollArea className="flex-1 px-3">
            <div className="space-y-1 pb-4">
              {categories.map((category) => {
                const filteredConditions = filterConditions(category.conditions);
                
                // Hide category if no conditions match search
                if (filteredConditions.length === 0) return null;

                return (
                  <div key={category.categoryId} className="space-y-1">
                    {/* Category Header */}
                    <button
                      type="button"
                      onClick={() => onCategoryChange(category.categoryId.toString())}
                      className={cn(
                        "group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100",
                        openCategory === category.categoryId.toString() && "text-gray-900"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(category.categoryName)}
                        <span>{category.categoryName}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-gray-400 transition-transform duration-200",
                          openCategory === category.categoryId.toString() && "rotate-180"
                        )}
                      />
                    </button>

                    {/* Conditions List */}
                    {openCategory === category.categoryId.toString() && (
                      <div className="ml-7 space-y-1">
                        {filteredConditions.map((condition) => (
                          <Button
                            key={condition.id}
                            variant="ghost"
                            onClick={() => onConditionSelect(condition.id)}
                            className={cn(
                              "group relative w-full justify-start rounded-md px-3 py-1.5 text-left text-sm transition-all",
                              condition.id === selectedConditionId
                                ? "bg-emerald-50 font-medium text-emerald-700"
                                : "text-gray-600 hover:bg-gray-50"
                            )}
                          >
                            <div className="flex w-full items-center justify-between">
                              <span className="truncate">{condition.name}</span>
                              {condition.articleCount !== undefined && (
                                <span
                                  className={cn(
                                    "ml-2 rounded-full px-2 py-0.5 text-xs",
                                    condition.id === selectedConditionId
                                      ? "bg-emerald-100 text-emerald-700"
                                      : "bg-gray-100 text-gray-500"
                                  )}
                                >
                                  {condition.articleCount}
                                </span>
                              )}
                            </div>
                            {condition.id === selectedConditionId && (
                              <div className="absolute inset-y-0 -left-4 w-0.5 bg-emerald-700" />
                            )}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
