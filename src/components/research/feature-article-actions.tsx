"use client";

import { BookmarkIcon } from "lucide-react";
import { Button } from "../ui/button";

interface FeatureArticleActionsProps {
  outcome_rating?: string;
}

export function FeatureArticleActions({
  outcome_rating,
}: FeatureArticleActionsProps) {
  return (
    <div className="mt-2 flex items-center justify-between space-x-4">
      <div className="flex items-center p-4">
        <Button
          variant="ghost"
          className="flex items-center gap-2 border border-emerald-700 font-mono text-xs font-medium text-emerald-700 hover:border-emerald-500 hover:bg-transparent hover:text-emerald-500"
        >
          Read More
          <span className="text-lg">→</span>
        </Button>

        <div
          className={`relative flex h-4 w-32 items-center justify-center rounded-full px-4 font-mono text-xs font-medium uppercase text-white ${
            outcome_rating === "Positive"
              ? "bg-green-500"
              : outcome_rating === "Neutral"
                ? "bg-yellow-500"
                : outcome_rating === "Negative"
                  ? "bg-red-500"
                  : "bg-gray-300"
          }`}
        >
          {outcome_rating ?? "Unknown"}
        </div>
      </div>
    </div>
  );
}
