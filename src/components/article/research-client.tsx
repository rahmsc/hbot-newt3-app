"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface ConditionWithCount {
  condition: string;
  category: string;
  conditionTag: string;
  articleCount: number;
}

interface ResearchClientProps {
  conditionsWithCounts: ConditionWithCount[];
}

export default function ResearchClient({
  conditionsWithCounts,
}: ResearchClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleConditionClick = (conditionTag: string) => {
    router.push(`/research/${conditionTag}`);
  };

  const validConditions = conditionsWithCounts.filter(
    (item) => item.condition && item.condition.trim() !== "",
  );

  const categories = [
    "All",
    ...new Set(validConditions.map((item) => item.category)),
  ].filter((category) => category && category.trim() !== "");

  const filteredConditions =
    selectedCategory === "All"
      ? validConditions
      : validConditions.filter((item) => item.category === selectedCategory);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth / 2;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();

      const resizeObserver = new ResizeObserver(() => {
        checkScrollPosition();
      });
      resizeObserver.observe(scrollContainer);

      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <>
      <div className="relative mb-6 overflow-hidden">
        <div className="absolute bottom-0 left-0 top-0 z-10 w-8 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute bottom-0 right-0 top-0 z-10 w-8 bg-gradient-to-l from-background to-transparent" />
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 bg-background p-2 shadow-md"
            type="button"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 bg-background p-2 shadow-md"
            type="button"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex overflow-x-auto"
        >
          <div className="flex gap-2 px-8">
            {categories.map((category) => (
              <button
                key={category}
                className={`flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1 font-editors-note ${
                  selectedCategory === category
                    ? "text-orange-500"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                onClick={() => handleCategoryClick(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {filteredConditions.map((item) => (
          <div
            key={item.conditionTag}
            className="flex cursor-pointer items-center justify-between border-t border-border p-4 hover:text-orange-500"
            onClick={() => handleConditionClick(item.conditionTag)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleConditionClick(item.conditionTag);
              }
            }}
          >
            <div className="flex-1 text-left">
              <p className="text-sm text-muted-foreground">{item.category}</p>
            </div>
            <div className="flex-1 text-center">
              <h2 className="text-xl font-semibold">{item.condition}</h2>
            </div>
            <div className="flex-1 text-right">
              <p className="text-sm text-muted-foreground">
                {item.articleCount}{" "}
                {item.articleCount === 1 ? "article" : "articles"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
