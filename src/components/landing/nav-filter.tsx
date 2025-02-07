"use client";

import { useState } from "react";

import { Badge } from "~/components/ui/badge";
import type { CategoryWithConditions } from "~/utils/supabase/getCategoryWithConditions";

interface NavFilterProps {
  categoriesWithConditions: CategoryWithConditions[];
  onConditionsSelect: (conditionIds: number[]) => void;
  selectedConditions: number[];
}

export function NavFilter({
  categoriesWithConditions,
  onConditionsSelect,
  selectedConditions,
}: NavFilterProps) {
  const conditions = categoriesWithConditions.reduce(
    (acc, item) => {
      if (!acc.some((condition) => condition.id === item.condition_id)) {
        acc.push({
          id: item.condition_id,
          name: item.condition_name,
        });
      }
      return acc;
    },
    [] as Array<{ id: number; name: string }>,
  );

  const handleConditionClick = (conditionId: number) => {
    if (selectedConditions.includes(conditionId)) {
      onConditionsSelect(selectedConditions.filter((id) => id !== conditionId));
    } else {
      onConditionsSelect([...selectedConditions, conditionId]);
    }
  };

  return (
    <nav className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 overflow-x-auto px-8 py-4">
        {conditions.map((condition) => (
          <Badge
            key={condition.id}
            variant={
              selectedConditions.includes(condition.id) ? "default" : "outline"
            }
            className="cursor-pointer rounded-full px-4 py-1.5 text-sm transition-colors hover:bg-accent"
            onClick={() => handleConditionClick(condition.id)}
          >
            {condition.name}
          </Badge>
        ))}
      </div>
    </nav>
  );
}
