"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link"

import { MobileChamberCard } from "~/components/chambers/mobile-chamber-card"
import { ChamberQuickView } from "~/components/chambers/chambers-quick-view"
import { Button } from "~/components/ui/button"
import type { ChamberProps } from "~/types/chambers"
import { createClient } from "~/utils/supabase/client"
import GlowingButton from "~/components/utils/glowing-button"
import { CarouselIndicator } from "~/components/utils/carousel-indicator"

export function ChambersSection() {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [selectedChamber, setSelectedChamber] = useState<ChamberProps | null>(null)
  const [chambers, setChambers] = useState<ChamberProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  const options: EmblaOptionsType = {
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  useEffect(() => {
    async function fetchChambers() {
      const supabase = createClient()
      const { data, error } = await supabase.from("chamber_products").select("*").order("id")


      if (!error && data) {
        setChambers(data)
      }
      setIsLoading(false)
    }

    void fetchChambers()
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-lg font-medium text-gray-900">Loading chambers...</p>
      </div>
    )
  }

  return (
    <section className="w-full pb-12">
      <div className="h-px w-full bg-gray-600" />
      <div className="flex flex-col items-start justify-between gap-4 px-4 pt-2 sm:flex-row sm:items-center sm:px-16">
        <div className="w-full space-y-2 sm:w-auto">
          <h2 className="font-['Raleway'] text-xl sm:text-2xl font-normal tracking-[0.5em] sm:tracking-[0.3em] text-gray-700 text-center sm:text-left">
            EXPLORE CHAMBERS
          </h2>
          <h4 className="text-sm text-gray-500 text-center sm:text-left">
            The best chambers at the best prices. Guaranteed.
          </h4>
          <Link href="/chambers" className="mt-4 block w-full sm:hidden">
            <Button
              variant="default"
              className="w-full bg-emerald-700 transition-all duration-200 hover:bg-emerald-800 sm:w-auto"
            >
              View Chambers
            </Button>
          </Link>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative px-4 pt-8">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {chambers.map((chamber) => (
              <div 
                key={chamber.id} 
                className="min-w-[90vw] flex-none px-2 sm:min-w-[50%] lg:min-w-[33.333%]"
              >
                <MobileChamberCard
                  chamber={chamber}
                  onQuickView={(chamber) => {
                    setSelectedChamber(chamber);
                    setIsQuickViewOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Add Carousel Indicator for Mobile */}
        <div className="md:hidden">
          <CarouselIndicator 
            total={chambers.length} 
            current={currentSlide} 
          />
        </div>

        {/* Navigation Buttons - Hidden on mobile */}
        <div className="hidden sm:block">
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-5 top-1/2 -translate-y-1/2 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-5 top-1/2 -translate-y-1/2 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedChamber && (
        <ChamberQuickView
          isOpen={isQuickViewOpen}
          onClose={() => {
            setIsQuickViewOpen(false);
            setSelectedChamber(null);
          }}
          chamber={selectedChamber}
        />
      )}
    </section>
  )
}

