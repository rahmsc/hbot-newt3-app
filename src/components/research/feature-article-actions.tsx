"use client";
import GlowingButton from "../utils/glowing-button";

interface FeatureArticleActionsProps {
  outcome_rating?: string;
  onReadMore?: () => void;
}

export function FeatureArticleActions({
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
      </div>
    </div>
  );
}
