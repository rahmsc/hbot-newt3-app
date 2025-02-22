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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  })

  const handleCategoryClick = (categoryId: number, defaultConditionId: number) => {
    router.push(`/research?selectedCategory=${categoryId}&condition=${defaultConditionId}`)
  }

  return (
    <section className="w-full bg-[#FAF7F4]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col items-center justify-center space-y-3 sm:space-y-4">
          <h2 className="text-center font-['Raleway'] text-2xl sm:text-3xl md:text-4xl font-medium tracking-[0.2em] sm:tracking-[0.3em] text-gray-900">
            BROWSE THE RESEARCH
          </h2>
          <p className="text-center text-base sm:text-lg md:text-xl font-light text-gray-600">
            Explore our comprehensive research database
          </p>
        </div>

        {/* Mobile Carousel View */}
        <div className="block sm:hidden">
          <div className="relative px-4">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {categories.map((category) => (
                  <div
                    key={category.categoryId}
                    className="pl-4"
                    style={{
                      flex: "0 0 85%",
                      minWidth: 0,
                    }}
                  >
                    <motion.button
                      onClick={() => handleCategoryClick(category.categoryId, category.defaultConditionId)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-200 shadow-lg transition-shadow hover:shadow-xl active:scale-95 touch-none"
                    >
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.title}
                        fill
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                        sizes="(max-width: 768px) 85vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <h3 className="absolute bottom-4 left-4 font-['Raleway'] text-xl sm:text-2xl font-medium text-white">
                        {category.title}
                      </h3>
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute -left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={() => emblaApi?.scrollPrev()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={() => emblaApi?.scrollNext()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden sm:grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <motion.button
              key={category.categoryId}
              onClick={() => handleCategoryClick(category.categoryId, category.defaultConditionId)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200 shadow-lg transition-shadow hover:shadow-xl active:scale-95 touch-none"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                sizes="(min-width: 640px) 50vw, (min-width: 1280px) 25vw"
                priority
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
  )
}

