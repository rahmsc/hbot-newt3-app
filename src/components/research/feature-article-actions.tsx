"use client";
import GlowingButton from "~/components/utils/glowing-button";
import { cn } from "~/lib/utils";

interface FeatureArticleActionsProps {
  outcome_rating: string;
  className?: string;
  onClick?: () => void;
}

export function FeatureArticleActions({ outcome_rating, className, onClick }: FeatureArticleActionsProps) {
  return (
    <GlowingButton 
      text="Read More"
      className={cn(
        "w-full",
        className
      )}
      onClick={onClick}
    />
  );
}
