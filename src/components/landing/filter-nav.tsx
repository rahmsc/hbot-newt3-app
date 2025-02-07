"use client";

import { X } from "lucide-react";
import * as React from "react";

import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import type { CategoryWithConditions } from "~/utils/supabase/getCategoryWithConditions";

interface FilterNavProps {
  categoriesWithConditions: CategoryWithConditions[];
  onConditionsSelect: (conditionIds: number[]) => void;
  selectedConditions: number[];
}

export function FilterNav({
  categoriesWithConditions,
  onConditionsSelect,
  selectedConditions,
}: FilterNavProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null,
  );
  const [localSelectedCondition, setLocalSelectedCondition] = React.useState<
    number | null
  >(selectedConditions[0] ?? null);

  // Group categories and conditions
  const categories = React.useMemo(() => {
    return categoriesWithConditions.reduce(
      (acc, item) => {
        if (!acc.some((category) => category.id === item.category_id)) {
          acc.push({
            id: item.category_id,
            name: item.category_name,
            conditions: categoriesWithConditions
              .filter((c) => c.category_id === item.category_id)
              .map((c) => ({
                id: c.condition_id,
                name: c.condition_name,
              })),
          });
        }
        return acc;
      },
      [] as Array<{
        id: number;
        name: string;
        conditions: Array<{ id: number; name: string }>;
      }>,
    );
  }, [categoriesWithConditions]);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === categoryId ? null : categoryId,
    );
  };

  const handleConditionClick = (conditionId: number) => {
    const newCondition =
      localSelectedCondition === conditionId ? null : conditionId;
    setLocalSelectedCondition(newCondition);
    onConditionsSelect(newCondition ? [newCondition] : []);
  };

  const clearFilters = () => {
    setLocalSelectedCondition(null);
    onConditionsSelect([]);
    setSelectedCategory(null);
  };

  const selectedCategoryConditions = selectedCategory
    ? (categories.find((category) => category.id === selectedCategory)
        ?.conditions ?? [])
    : [];

  return (
    <div className="sticky top-0 z-50 w-full bg-[#FAF7F4]">
      {/* Categories Row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollArea className="w-full py-1">
          <div className="flex items-center space-x-2">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`whitespace-nowrap rounded-full border px-4 py-1 text-sm font-medium transition-all hover:bg-gray-100 ${
                  selectedCategory === category.id
                    ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                    : "border-gray-300 bg-transparent text-gray-600"
                }`}
              >
                {category.name}
              </button>
            ))}
            {localSelectedCondition && (
              <button
                type="button"
                className="ml-2 flex items-center whitespace-nowrap rounded-full border border-gray-300 px-4 py-1 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100"
                onClick={clearFilters}
              >
                Clear
                <X className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      {/* Conditions Row */}
      {selectedCategory && (
        <div className="border-t border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollArea className="w-full py-1">
              <div className="flex items-center space-x-2">
                {selectedCategoryConditions.map((condition) => (
                  <button
                    type="button"
                    key={condition.id}
                    onClick={() => handleConditionClick(condition.id)}
                    className={`ml-2 flex items-center whitespace-nowrap rounded-full border border-gray-300 px-4 py-1 text-sm font-medium transition-all hover:bg-gray-100 ${
                      localSelectedCondition === condition.id
                        ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                        : "border-gray-300 bg-transparent text-gray-600"
                    }`}
                  >
                    {condition.name}
                  </button>
                ))}
                {selectedCategoryConditions.length === 0 && (
                  <div className="text-sm text-gray-500">
                    No conditions available for this category.
                  </div>
                )}
              </div>
              <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
}
