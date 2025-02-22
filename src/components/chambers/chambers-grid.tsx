"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useCallback, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { Skeleton } from "~/components/ui/skeleton"
import { Button } from "~/components/ui/button"
import type { ChamberProduct } from "~/types/database"

import GlowingButton from "../utils/glowing-button"
import { ChambersFilter } from "./chambers-filter"
import { ChamberQuickView } from "./chambers-quick-view"

interface ChambersGridProps {
  chambers: ChamberProduct[]
}

export function ChambersGrid({ chambers }: ChambersGridProps) {
  const [selectedChamber, setSelectedChamber] = useState<ChamberProduct | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [filter, setFilter] = useState<"all" | "portable" | "mild" | "hard">("all")

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  })

  const imageUrl = "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/chambers/products/"

  const filteredChambers = chambers.filter((chamber) => {
    if (filter === "all") return true
    return chamber.type?.toLowerCase().includes(filter.toLowerCase())
  })

  const handleViewClick = useCallback((chamber: ChamberProduct) => {
    setSelectedChamber(chamber)
    setIsQuickViewOpen(true)
  }, [])

  const handleCloseQuickView = useCallback(() => {
    setIsQuickViewOpen(false)
    setSelectedChamber(null)
  }, [])

  const handleFilterChange = (value: string) => {
    setFilter(value as "all" | "portable" | "mild" | "hard")
  }

  if (!chambers?.length) {
    return (
      <section className="w-full bg-[#FAF7F4]">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[550px] overflow-hidden rounded-lg">
                <Skeleton className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full bg-[#FAF7F4]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-['Raleway'] text-2xl sm:text-4xl font-medium tracking-[0.3em] text-gray-900">
              CHAMBER RANGE
            </h1>
            <p className="mt-2 text-base sm:text-xl font-light text-gray-600">
              Explore our curated selection of premium hyperbaric chambers ({filteredChambers.length})
            </p>
          </div>
          <ChambersFilter onFilterChange={handleFilterChange} />
        </div>

        {/* Mobile Carousel View */}
        <div className="block sm:hidden">
          <div className="relative px-4">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                <AnimatePresence>
                  {filteredChambers.map((chamber) => (
                    <div
                      key={chamber.id}
                      className="pl-4"
                      style={{
                        flex: "0 0 85%",
                        minWidth: 0,
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        className="relative h-[450px] overflow-hidden rounded-2xl shadow-lg"
                      >
                        <Image
                          src={`${imageUrl}${chamber.id}.png`}
                          alt={chamber.name ?? "Chamber"}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 85vw"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                          <h3 className="mb-2 font-['Raleway'] text-2xl font-semibold uppercase tracking-wider text-white">
                            {chamber.name}
                          </h3>
                          <p className="mb-4 flex flex-col gap-2 font-mono text-sm text-gray-200">
                            <span>Type: {chamber.type}</span>
                            <span>Max Pressure: {chamber.ata} ATA</span>
                            <span>Capacity: {chamber.capacity}</span>
                          </p>
                          <GlowingButton text="More Info" onClick={() => handleViewClick(chamber)} className="w-full" />
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </AnimatePresence>
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
        <div className="hidden sm:grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {filteredChambers.map((chamber) => (
              <motion.div
                key={chamber.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="px-0.5 py-0.5"
              >
                <div className="overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl">
                  <div className="relative h-[550px]">
                    <Image
                      src={`${imageUrl}${chamber.id}.png`}
                      alt={chamber.name ?? "Chamber"}
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 50vw, (min-width: 1024px) 33vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <h3 className="mb-2 font-['Raleway'] text-4xl font-semibold uppercase tracking-wider text-white">
                        {chamber.name}
                      </h3>
                      <p className="mb-4 flex flex-col gap-2 font-mono text-sm text-gray-200">
                        <span>Type: {chamber.type}</span>
                        <span>Max Pressure: {chamber.ata} ATA</span>
                        <span>Capacity: {chamber.capacity}</span>
                      </p>
                      <GlowingButton text="More Info" onClick={() => handleViewClick(chamber)} className="w-full" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ChamberQuickView isOpen={isQuickViewOpen} onClose={handleCloseQuickView} chamber={selectedChamber} />
    </section>
  )
}

