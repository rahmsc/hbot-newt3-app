"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { researchItems } from "../../data/researchDataDemo";
import { conditions } from "~/data/article";

const Research = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleConditionClick = (condition: string) => {
    router.push(`/research/${condition}`);
  };

  const filteredResearch =
    selectedCategory === "All"
      ? researchItems
      : researchItems.filter((item) =>
          item.category.includes(selectedCategory),
        );

  return (
    <section className="flex w-full flex-row items-center justify-center pt-32">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Portfolio</h1>
        <div className="mb-6 flex space-x-4">
          {conditions.map((category) => (
            <button
              key={category}
              className={`px-3 py-1 ${
                selectedCategory === category
                  ? "text-selected-text"
                  : "text-gray-700"
              }`}
              onClick={() => handleCategoryClick(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {filteredResearch.map((item) => (
            <div
              key={item.id}
              className="hover:text-selected-text flex cursor-pointer items-center justify-between border-t border-black p-4"
              onClick={() => handleConditionClick(item.condition)}
              onKeyUp={() => handleConditionClick(item.condition)}
              role="button"
              tabIndex={0}
            >
              {/* Category aligned to the left */}
              <div className="flex-1 text-left">
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>

              {/* Condition centered */}
              <div className="flex-1 text-center">
                <h2 className="text-xl font-semibold">{item.condition}</h2>
              </div>

              {/* Date aligned to the right */}
              <div className="flex-1 text-right">
                <p className="text-sm text-gray-500">{2022}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            className="hover:text-selected-text hover:border-selected-text px-4 py-2 hover:rounded-full"
            type="button"
          >
            More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Research;
