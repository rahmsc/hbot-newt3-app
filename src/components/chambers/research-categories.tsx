"use client";

import { useRouter } from "next/navigation";

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
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="relative mb-12 text-4xl font-bold">
          Browse The Research
          <span className="absolute -bottom-2 left-0 h-1 w-full bg-gray-700" />
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <button
              type="button"
              key={category.categoryId}
              onClick={() => handleCategoryClick(category.categoryId)}
              className="group relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200 transition-transform hover:scale-105"
            >
              {/* Add Image component when you have actual images */}
              {/* <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover"
              /> */}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Category title */}
              <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                {category.title}
              </h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
