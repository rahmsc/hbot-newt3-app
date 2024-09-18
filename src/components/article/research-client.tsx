// app/research/research-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface UniqueCondition {
  condition: string;
  category: string;
  conditionTag: string;
}

interface ResearchClientProps {
  uniqueConditions: UniqueCondition[];
}

export default function ResearchClient({
  uniqueConditions,
}: ResearchClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleConditionClick = (conditionTag: string) => {
    router.push(`/research/${conditionTag}`);
  };

  const categories = [
    "All",
    ...new Set(uniqueConditions.map((item) => item.category)),
  ];

  const filteredConditions =
    selectedCategory === "All"
      ? uniqueConditions
      : uniqueConditions.filter((item) => item.category === selectedCategory);

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`rounded-full px-3 py-1 ${
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
      <div className="space-y-4">
        {filteredConditions.map((item) => (
          <div
            key={item.conditionTag}
            className="flex cursor-pointer items-center justify-between border-t border-border p-4 hover:text-orange-500"
            onClick={() => handleConditionClick(item.conditionTag)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleConditionClick(item.conditionTag)
            }
            role="button"
            tabIndex={0}
          >
            <div className="flex-1 text-left">
              <p className="text-sm text-muted-foreground">{item.category}</p>
            </div>
            <div className="flex-1 text-center">
              <h2 className="text-xl font-semibold">{item.condition}</h2>
            </div>
            <div className="flex-1 text-right">
              <p className="text-sm text-muted-foreground">
                {
                  filteredConditions.filter((c) => c.category === item.category)
                    .length
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
