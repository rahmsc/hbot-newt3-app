"use client"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

import { Button } from "~/components/ui/button"
import { ProviderQuickView } from "~/components/providers/provider-quick-view"
import { ProviderCard } from "~/components/providers/provider-card"
import { CarouselIndicator } from "~/components/utils/carousel-indicator"
import type { Provider } from "~/types/providers"
import { SAMPLE_PROVIDERS } from "~/data/providers"

export default function ProvidersSection() {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [providers] = useState<Provider[]>(SAMPLE_PROVIDERS)
  const [currentSlide, setCurrentSlide] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  })

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

  return (
    <section className="w-full pb-12 sm:pb-24">
      <div className="h-px w-full bg-gray-600" />
      <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-16">
        <div className="w-full space-y-2 sm:w-auto">
          <h2 className="font-['Raleway'] text-lg sm:text-2xl font-normal tracking-[0.5em] sm:tracking-[0.3em] text-gray-700 text-center sm:text-left">
            VERIFIED PROVIDERS
          </h2>
          <h4 className="text-sm text-gray-500 text-center sm:text-left">
            The best providers in the business. Guaranteed.
          </h4>
        </div>
        <Link href="/providers" className="w-full sm:w-auto">
          <Button
            variant="default"
            className="w-full bg-emerald-700 transition-all duration-200 hover:bg-emerald-800 sm:w-auto"
          >
            Search Providers
          </Button>
        </Link>
      </div>

      <div className="relative px-4 pt-8 sm:px-8 sm:pt-12">
        {/* Carousel Container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {providers.map((provider, index) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                className="pl-4 flex-none min-w-0 w-[85%] sm:w-1/2 lg:w-1/3"
              >
                <ProviderCard
                  name={provider.name ?? ""}
                  rating={provider.rating ?? 0}
                  reviewCount={provider.reviewCount ?? 0}
                  location={provider.location ?? ""}
                  image={provider.image ?? ""}
                  distance={provider.distance ?? 0}
                  latitude={provider.latitude ?? 0}
                  longitude={provider.longitude ?? 0}
                  id={provider.id ?? ""}
                  onQuickView={() => {
                    setSelectedProvider(provider)
                    setIsQuickViewOpen(true)
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Add Carousel Indicator for Mobile */}
        <div className="md:hidden">
          <CarouselIndicator 
            total={providers.length} 
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

      {selectedProvider && (
        <ProviderQuickView
          isOpen={isQuickViewOpen}
          onClose={() => {
            setIsQuickViewOpen(false)
            setSelectedProvider(null)
          }}
          provider={selectedProvider}
        />
      )}
    </section>
  )
}

