"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "~/components/ui/button"

interface ResearchCategory {
  title: string
  categoryId: number
  image: string
  defaultConditionId: number
}

const categories: ResearchCategory[] = [
  {
    title: "Wellness & Energy",
    categoryId: 1,
    image: "/images/research/wellness.png",
    defaultConditionId: 1,
  },
  {
    title: "Chronic Conditions",
    categoryId: 2,
    image: "/images/research/chronic.png",
    defaultConditionId: 5,
  },
  {
    title: "Exercise & Recovery",
    categoryId: 3,
    image: "/images/research/exercise.png",
    defaultConditionId: 9,
  },
  {
    title: "Mental Health",
    categoryId: 4,
    image: "/images/research/mental.png",
    defaultConditionId: 13,
  },
]

export function ResearchCategories() {
  const router = useRouter()

  const handleCategoryClick = (categoryId: number, defaultConditionId: number) => {
    router.push(`/research?selectedCategory=${categoryId}&condition=${defaultConditionId}`)
  }

  return (
    <section className="w-full pt-6">
      <div className="space-y-6 md:space-y-8">
        <div className="text-center">
          <h2 className="font-['Raleway'] text-xl font-medium tracking-[0.15em] text-gray-900 sm:text-2xl sm:tracking-[0.2em] md:text-3xl md:tracking-[0.25em] lg:text-4xl lg:tracking-[0.3em]">
            BROWSE THE RESEARCH
          </h2>
          <p className="mt-2 text-sm font-light text-gray-600 sm:mt-3 sm:text-base md:mt-4 md:text-lg lg:text-xl">
            Explore our comprehensive research database
          </p>
        </div>

        {/* Mobile Stacked View */}
        <div className="flex flex-col gap-4 px-4 sm:hidden">
          {categories.map((category) => (
            <motion.button
              key={category.categoryId}
              onClick={() => handleCategoryClick(category.categoryId, category.defaultConditionId)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-200 shadow-md transition-shadow hover:shadow-lg active:scale-95 touch-none"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-3 left-3 font-['Raleway'] text-lg font-medium text-white">
                {category.title}
              </h3>
            </motion.button>
          ))}
        </div>

        {/* Desktop Grid View */}
        <div className="hidden sm:grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:grid-cols-4">
          {categories.map((category) => (
            <motion.button
              key={category.categoryId}
              onClick={() => handleCategoryClick(category.categoryId, category.defaultConditionId)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200 shadow-md transition-shadow hover:shadow-lg active:scale-95 touch-none"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                sizes="(min-width: 640px) 50vw, (min-width: 1024px) 25vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-3 left-3 font-['Raleway'] text-lg font-medium text-white sm:text-xl md:text-2xl">
                {category.title}
              </h3>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

