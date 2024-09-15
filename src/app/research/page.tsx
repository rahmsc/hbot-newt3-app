"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { conditionCategories } from "../../data/researchDataDemo";
import { conditions } from "../../data/researchDataDemo";

export default function Research() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleConditionClick = (conditionTag: string) => {
    router.push(`/research/${conditionTag}`);
  };

  const filteredConditions =
    selectedCategory === "All"
      ? conditions
      : conditions.filter((item) => item.category === selectedCategory);

  return (
    <section className="flex w-full flex-col items-center justify-center pt-32">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Research Articles</h1>
        <div className="mb-6 flex flex-wrap gap-2">
          {conditionCategories.map((category) => (
            <button
              key={category}
              className={`rounded-full px-3 py-1 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
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
              key={item.id}
              className="flex cursor-pointer items-center justify-between border-t border-border p-4 hover:bg-accent"
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
                  {filteredConditions.length}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
