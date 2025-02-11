"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import type { ProviderCardProps } from "~/types/providers";

import { ProviderQuickView } from "../../providers/provider-quick-view";
import { ProviderCard } from "~/components/providers/provider-card";

const SAMPLE_PROVIDERS: ProviderCardProps[] = [
  {
    name: "Feel Good Nation",
    rating: 5.0,
    reviewCount: 246,
    location: "Sydney, Australia",
    categories: ["Wellness", "Recovery", "Neurological"],
    nextAvailable: "Today",
    phone: "0434 567 890",
    hours: "Mon - Sun: 7am - 9pm",
    image: "/images/providers/provider_4.png",
  },
  {
    name: "Vitality HBOT Center",
    rating: 4.9,
    reviewCount: 189,
    location: "Melbourne, Australia",
    categories: ["Wellness", "Sports Recovery", "Medical"],
    nextAvailable: "Today",
    phone: "0456 789 123",
    hours: "Mon - Sat: 8am - 8pm",
    image: "/images/providers/provider_5.png",
  },
  {
    name: "OxygenPlus Therapy",
    rating: 5.0,
    reviewCount: 173,
    location: "Brisbane, Australia",
    categories: ["Recovery", "Neurological", "Anti-Aging"],
    nextAvailable: "Tomorrow",
    phone: "0467 234 567",
    hours: "Mon - Sun: 6am - 7pm",
    image: "/images/providers/provider_1.png",
  },
  {
    name: "Heal & Thrive",
    rating: 4.8,
    reviewCount: 156,
    location: "Perth, Australia",
    categories: ["Medical", "Recovery", "Sports"],
    nextAvailable: "Tomorrow",
    phone: "0478 901 234",
    hours: "Mon - Fri: 8am - 6pm",
    image: "/images/providers/provider_2.png",
  },
  {
    name: "Pure Oxygen Wellness",
    rating: 5.0,
    reviewCount: 142,
    location: "Adelaide, Australia",
    categories: ["Wellness", "Anti-Aging", "Recovery"],
    nextAvailable: "Today",
    phone: "0489 012 345",
    hours: "Mon - Sun: 9am - 8pm",
    image: "/images/providers/provider_3.png",
  },
];

export default function ProvidersSection() {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] =
    useState<ProviderCardProps | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": { slidesToScroll: 3 },
      },
    },
    [Autoplay()],
  );

  return (
    <section className="w-full">
      <div className="h-px w-full bg-gray-600" />
      <div className="py-4 pl-16">
        <h2 className="font-['Raleway'] text-2xl font-normal tracking-[0.3em] text-gray-700">
          VERIFIED PROVIDERS
        </h2>
      </div>

      <div className="relative pt-12">
        {/* Carousel Container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {SAMPLE_PROVIDERS.map((provider, index) => (
              <div
                key={index}
                className="min-w-0 flex-[0_0_100%] px-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <ProviderCard
                  {...provider}
                  onQuickView={() => {
                    setSelectedProvider(provider);
                    setIsQuickViewOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
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
