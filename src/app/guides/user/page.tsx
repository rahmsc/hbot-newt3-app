"use client";

import { useState } from "react";
import CallToAction from "~/components/call-to-action";
import ThreeImageGuideCarousel from "~/components/guides/carousels/three-image-guide-carousel";
import UserGuideComponent from "~/components/guides/user-guide-component";
import { conditions } from "~/data/article";

const UserGuides = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <section className="flex w-full flex-col items-center justify-center space-y-12 pt-32">
      <h1 className="text-center text-3xl font-bold">Home User Guides</h1>

      <div className="flex w-full items-center justify-center">
        <ThreeImageGuideCarousel />
      </div>
      <div className="w-full">
        <CallToAction />
      </div>

      <div className="mb-6 flex justify-center space-x-4">
        {conditions.map((category) => (
          <button
            key={category}
            className={`px-3 py-1 ${
              selectedCategory === category
                ? "text-selected-text font-semibold"
                : "text-gray-700"
            }`}
            onClick={() => handleCategoryClick(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="w-full px-6 md:px-12">
        <UserGuideComponent />
      </div>

      <div className="mt-6 grid w-full grid-cols-1 gap-6 px-6 md:grid-cols-2 md:px-12 lg:grid-cols-3">
        <UserGuideComponent />
        <UserGuideComponent />
        <UserGuideComponent />
      </div>
    </section>
  );
};

export default UserGuides;
