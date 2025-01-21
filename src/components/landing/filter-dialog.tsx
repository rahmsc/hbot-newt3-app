"use client";

import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import type { CategoryWithConditions } from "~/utils/supabase/getCategoryWithConditions";

interface FilterDialogProps {
  categoriesWithConditions: CategoryWithConditions[];
  onConditionsSelect: (conditionIds: number[]) => void;
  selectedConditions: number[];
}

export function FilterDialog({
  categoriesWithConditions,
  onConditionsSelect,
  selectedConditions,
}: FilterDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [localSelectedConditions, setLocalSelectedConditions] =
    useState<number[]>(selectedConditions);

  useEffect(() => {
    setLocalSelectedConditions(selectedConditions);
  }, [selectedConditions]);

  const categories = categoriesWithConditions.reduce(
    (acc, item) => {
      if (!acc.some((category) => category.id === item.category_id)) {
        acc.push({
          id: item.category_id,
          name: item.category_name,
        });
      }
      return acc;
    },
    [] as Array<{ id: number; name: string }>,
  );

  const conditionsByCategory = categoriesWithConditions.reduce(
    (acc, item) => {
      if (!acc[item.category_id]) {
        acc[item.category_id] = [];
      }
      if (
        !acc[item.category_id]?.some(
          (condition) => condition.id === item.condition_id,
        )
      ) {
        acc[item.category_id]?.push({
          id: item.condition_id,
          name: item.condition_name,
        });
      }
      return acc;
    },
    {} as Record<number, Array<{ id: number; name: string }>>,
  );

  const visibleConditions =
    selectedCategories.length === 0
      ? Object.values(conditionsByCategory).flat()
      : selectedCategories.flatMap(
          (categoryId) => conditionsByCategory[categoryId] ?? [],
        );

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleConditionChange = (conditionId: number) => {
    setLocalSelectedConditions((prev) =>
      prev.includes(conditionId)
        ? prev.filter((id) => id !== conditionId)
        : [...prev, conditionId],
    );
  };

  const handleApplyFilters = () => {
    onConditionsSelect(localSelectedConditions);
    setOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setLocalSelectedConditions([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-black text-xl text-white hover:bg-black/90"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Filter Articles</DialogTitle>
        </DialogHeader>
        <div className="flex h-[60vh] gap-6 py-4">
          <div className="w-1/2 space-y-4">
            <h3 className="text-sm font-medium">Categories</h3>
            <ScrollArea className="h-full pr-4">
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleCategoryChange(category.id)}
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="text-sm"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="w-1/2 space-y-4">
            <h3 className="text-sm font-medium">Conditions</h3>
            <ScrollArea className="h-full pr-4">
              <div className="space-y-2">
                {visibleConditions.map((condition) => (
                  <div
                    key={condition.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`condition-${condition.id}`}
                      checked={localSelectedConditions.includes(condition.id)}
                      onCheckedChange={() =>
                        handleConditionChange(condition.id)
                      }
                    />
                    <label
                      htmlFor={`condition-${condition.id}`}
                      className="text-sm"
                    >
                      {condition.name}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handleClearFilters}>
            Clear Filters
          </Button>
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
