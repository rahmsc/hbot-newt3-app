"use client";
import GlowingButton from "~/components/utils/glowing-button";
import { cn } from "~/lib/utils";

interface FeatureArticleActionsProps {
  outcome_rating: string;
  className?: string;
}

export function FeatureArticleActions({ outcome_rating, className }: FeatureArticleActionsProps) {
  return (
    <div className="flex h-[64px] items-center justify-center">
      <GlowingButton 
        text="Read More"
        className={cn(
          "h-full w-full flex items-center justify-center",
          className
        )}
      />
    </div>
  );
}
