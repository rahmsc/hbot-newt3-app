"use client";
import GlowingButton from "../utils/glowing-button";

interface FeatureArticleActionsProps {
  outcome_rating?: string;
  onReadMore?: () => void;
}

export function FeatureArticleActions({
  outcome_rating,
  onReadMore,
}: FeatureArticleActionsProps) {
  return (
    <div className="mt-2 flex items-center justify-between space-x-4">
      <div className="flex items-center p-4">
        <GlowingButton
          text="Read More"
          onClick={onReadMore}
          className="flex items-center gap-2 text-xs font-medium text-emerald-700 hover:text-emerald-500"
        />

        {/* <div
          className={`relative ml-4 flex h-4 w-32 items-center justify-center rounded-full px-4 font-mono text-xs font-medium uppercase text-white ${
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
        </div> */}
      </div>
    </div>
  );
}
