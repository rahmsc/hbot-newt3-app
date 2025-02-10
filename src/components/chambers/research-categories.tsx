"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
    image: "/images/research/wellness.png",
  },
  {
    title: "Chronic Conditions",
    categoryId: 2,
    image: "/images/research/chronic.png",
  },
  {
    title: "Exercise & Recovery",
    categoryId: 3,
    image: "/images/research/exercise.png",
  },
  {
    title: "Mental Health",
    categoryId: 4,
    image: "/images/research/mental.png",
  },
];

export function ResearchCategories() {
  const router = useRouter();

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/research?selectedCategory=${categoryId}`);
  };

  return (
    <section className="w-full bg-[#FAF7F4]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="mx-auto flex flex-col items-center justify-between">
            <h2 className="font-['Raleway'] text-4xl font-medium tracking-[0.3em] text-gray-900">
              BROWSE THE RESEARCH
            </h2>
            <p className="mt-2 text-xl font-light text-gray-600">
              Explore our comprehensive research database
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <motion.button
              key={category.categoryId}
              onClick={() => handleCategoryClick(category.categoryId)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200 shadow-lg transition-shadow hover:shadow-xl"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-4 left-4 font-['Raleway'] text-2xl font-medium text-white">
                {category.title}
              </h3>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
