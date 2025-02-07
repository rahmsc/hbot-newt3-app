"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface ResearchCategory {
  title: string;
  categoryId: number;
  image: string;
}

const categories: ResearchCategory[] = [
  {
    title: "Wellness & Energy",
    categoryId: 1,
    image: "/images/research/wellness.jpg",
  },
  {
    title: "Chronic Conditions",
    categoryId: 2,
    image: "/images/research/chronic.jpg",
  },
  {
    title: "Exercise & Recovery",
    categoryId: 3,
    image: "/images/research/exercise.jpg",
  },
  {
    title: "Mental Health",
    categoryId: 4,
    image: "/images/research/mental.jpg",
  },
];

export function ResearchCategories() {
  const router = useRouter();

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/research?selectedCategory=${categoryId}`);
  };

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="space-y-4">
          <h2 className="font-['Raleway'] text-4xl font-medium tracking-[0.3em] text-gray-900">
            BROWSE THE RESEARCH
          </h2>
          <p className="text-xl font-light text-gray-600">
            Explore our comprehensive research database
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <button
              type="button"
              key={category.categoryId}
              onClick={() => handleCategoryClick(category.categoryId)}
              className="group relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200 transition-transform hover:scale-105"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Category title */}
              <h3 className="absolute bottom-4 left-4 font-['Raleway'] text-2xl font-medium text-white">
                {category.title}
              </h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
