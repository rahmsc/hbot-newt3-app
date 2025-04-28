"use client";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

import { Button } from "~/components/ui/button";
import { ProviderQuickView } from "~/components/providers/provider-quick-view";
import ProviderCard from "~/components/providers/provider-card";
import { CarouselIndicator } from "~/components/utils/carousel-indicator";
import type { Provider } from "~/types/providers";
import LoadingSpinner from "~/components/utils/spinner";
import { fetchPlaceDetails } from "~/actions/fetch-place-photos";

export default function ProvidersSection() {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );
  const [providers, setProviders] = useState<Provider[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  useEffect(() => {
    // Fetch providers from API
    const fetchProviders = async () => {
      try {
        setIsLoading(true);
        // Get all approved providers
        const response = await fetch("/api/providers");
        if (!response.ok) {
          throw new Error("Failed to fetch providers");
        }

        const data = (await response.json()) as Provider[];

        // Limit to 6 providers for the carousel
        const limitedProviders = data.slice(0, 6);

        console.log(
          `Fetched ${limitedProviders.length} providers for front page carousel`,
        );
        console.log("Raw provider data:", limitedProviders);

        // Enhance providers with Google Photos
        const enhancedProviders = await Promise.all(
          limitedProviders.map((provider) => fetchPlaceDetails(provider)),
        );

        console.log(
          `Enhanced ${enhancedProviders.length} providers with Google details`,
        );
        console.log("Enhanced provider data:", enhancedProviders);

        setProviders(enhancedProviders);
      } catch (error) {
        console.error("Error fetching providers:", error);
        // Set empty array in case of error
        setProviders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (isLoading) {
    return (
      <section className="w-full">
        <div className="flex h-screen items-center justify-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  // If no providers are available, show a message
  if (providers.length === 0 && !isLoading) {
    return (
      <section className="w-full py-12 sm:py-24">
        <div className="h-px w-full bg-gray-600" />
        <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-16">
          <div className="w-full space-y-2 sm:w-auto">
            <h2 className="text-center font-['Raleway'] text-xl font-normal tracking-[0.3em] text-gray-700 sm:text-left sm:text-2xl">
              VERIFIED PROVIDERS
            </h2>
          </div>
          <Link href="/providers" className="w-full sm:w-auto">
            <Button
              variant="default"
              className="w-full bg-[#2B5741] transition-all duration-200 hover:bg-emerald-800 sm:w-auto"
            >
              Search Providers
            </Button>
          </Link>
        </div>
        <div className="py-12 text-center">
          <p className="text-lg text-gray-600">
            No featured providers available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pb-12 sm:pb-24">
      <div className="h-px w-full bg-gray-600" />
      <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-16">
        <div className="w-full space-y-2 sm:w-auto">
          <h2 className="text-center font-['Raleway'] text-xl font-normal tracking-[0.3em] text-gray-700 sm:text-left sm:text-2xl">
            VERIFIED PROVIDERS
          </h2>
          <h4 className="text-center text-sm text-gray-500 sm:text-left">
            The best providers in the business. Guaranteed.
          </h4>
        </div>
        <Link href="/providers" className="w-full sm:w-auto">
          <Button
            variant="default"
            className="w-full bg-[#2B5741] transition-all duration-200 hover:bg-emerald-800 sm:w-auto"
          >
            Search Providers
          </Button>
        </Link>
      </div>

      <div className="relative px-4 pt-8 sm:px-8 sm:pt-12">
        {/* Carousel Container */}
        <div className="touch-pan-x overflow-hidden" ref={emblaRef}>
          <div className="-ml-4 flex cursor-grab active:cursor-grabbing">
            {providers.map((provider, index) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                className="w-[85%] min-w-0 flex-none pl-4 sm:w-1/2 lg:w-1/3"
              >
                <ProviderCard
                  provider={provider}
                  onQuickView={() => {
                    setSelectedProvider(provider);
                    setIsQuickViewOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="text-[#2B5741] hover:text-emerald-800"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <CarouselIndicator total={providers.length} current={currentSlide} />

          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="text-[#2B5741] hover:text-emerald-800"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {selectedProvider && (
        <ProviderQuickView
          isOpen={isQuickViewOpen}
          onClose={() => {
            setIsQuickViewOpen(false);
            setSelectedProvider(null);
          }}
          provider={selectedProvider}
        />
      )}
    </section>
  );
}
