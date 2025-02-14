"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import type { ProviderCardProps } from "~/types/providers";
import { ProviderQuickView } from "../../providers/provider-quick-view";
import { ProviderCard } from "~/components/providers/provider-card";

export const SAMPLE_PROVIDERS = [
  {
    id: "fgn-001",
    name: "Feel Good Nation",
    rating: 5.0,
    reviewCount: 246,
    location: "Sydney, Australia",
    latitude: -33.8688,
    longitude: 151.2093,
    address: "123 George Street, Sydney NSW 2000",
    categories: ["Wellness", "Recovery", "Neurological"],
    nextAvailable: "Today",
    phone: "0434 567 890",
    hours: "Mon - Sun: 7am - 9pm",
    image: "/images/providers/provider_4.png",
    pressure: "1.3 ATA",
    type: "Hard Shell Lay Down",
    website: "https://feelgoodnation.com.au",
    directions: "https://maps.google.com/?q=Feel+Good+Nation+Sydney",
    email: "info@feelgoodnation.com.au",
    description: "Premier hyperbaric oxygen therapy center in Sydney offering state-of-the-art hard shell chambers for optimal healing and recovery."
  },
  {
    id: "vhc-001",
    name: "Vitality HBOT Center",
    rating: 4.9,
    reviewCount: 189,
    location: "Melbourne, Australia",
    latitude: -37.8136,
    longitude: 144.9631,
    address: "456 Collins Street, Melbourne VIC 3000",
    categories: ["Wellness", "Sports Recovery", "Medical"],
    nextAvailable: "Today",
    phone: "0456 789 123",
    hours: "Mon - Sat: 8am - 8pm",
    image: "/images/providers/provider_5.png",
    pressure: "1.3 ATA",
    type: "Hard Shell Lay Down",
    website: "https://vitalityhbot.com.au",
    directions: "https://maps.google.com/?q=Vitality+HBOT+Center+Melbourne",
    email: "contact@vitalityhbot.com.au",
    description: "Melbourne's leading HBOT facility specializing in sports recovery and medical treatments."
  },
  {
    id: "opt-001",
    name: "OxygenPlus Therapy",
    rating: 5.0,
    reviewCount: 173,
    location: "Brisbane, Australia",
    latitude: -27.4698,
    longitude: 153.0251,
    address: "789 Queen Street, Brisbane QLD 4000",
    categories: ["Recovery", "Neurological", "Anti-Aging"],
    nextAvailable: "Tomorrow",
    phone: "0467 234 567",
    hours: "Mon - Sun: 6am - 7pm",
    image: "/images/providers/provider_1.png",
    pressure: "2.0 ATA",
    type: "Hard Shell Seated",
    website: "https://oxygenplus.com.au",
    directions: "https://maps.google.com/?q=OxygenPlus+Therapy+Brisbane",
    email: "hello@oxygenplus.com.au",
    description: "Specialized HBOT center offering advanced neurological and anti-aging treatments in Brisbane."
  },
  {
    id: "ht-001",
    name: "Heal & Thrive",
    rating: 4.8,
    reviewCount: 156,
    location: "Perth, Australia",
    latitude: -31.9523,
    longitude: 115.8613,
    address: "321 Murray Street, Perth WA 6000",
    categories: ["Medical", "Recovery", "Sports"],
    nextAvailable: "Tomorrow",
    phone: "0478 901 234",
    hours: "Mon - Fri: 8am - 6pm",
    image: "/images/providers/provider_2.png",
    pressure: "2.4 ATA",
    type: "Soft Shell Seated",
    website: "https://healandthrive.com.au",
    directions: "https://maps.google.com/?q=Heal+and+Thrive+Perth",
    email: "info@healandthrive.com.au",
    description: "Perth's premier medical HBOT facility with a focus on sports recovery and rehabilitation."
  },
  {
    id: "pow-001",
    name: "Pure Oxygen Wellness",
    rating: 5.0,
    reviewCount: 142,
    location: "Adelaide, Australia",
    latitude: -34.9285,
    longitude: 138.6007,
    address: "654 Rundle Street, Adelaide SA 5000",
    categories: ["Wellness", "Anti-Aging", "Recovery"],
    nextAvailable: "Today",
    phone: "0489 012 345",
    hours: "Mon - Sun: 9am - 8pm",
    image: "/images/providers/provider_3.png",
    pressure: "3.0 ATA",
    type: "Soft Shell Seated",
    website: "https://pureoxygenwell.com.au",
    directions: "https://maps.google.com/?q=Pure+Oxygen+Wellness+Adelaide",
    email: "contact@pureoxygenwell.com.au",
    description: "Adelaide's holistic HBOT center specializing in wellness and anti-aging treatments."
  }
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
    [Autoplay()]
  );

  return (
    <section className="w-full pb-24">
      <div className="h-px w-full bg-gray-600" />
      <div className="flex items-center justify-between px-16 py-2">
        <div className="space-y-2">
          <h2 className="font-['Raleway'] text-2xl font-normal tracking-[0.3em] text-gray-700">
            VERIFIED PROVIDERS
          </h2>
          <h4 className="text-sm text-gray-500">
            The best providers in the business. Guaranteed.
          </h4>
        </div>
        <Link href="/providers">
          <Button
            variant="default"
            className="bg-emerald-700 transition-all duration-200 hover:bg-emerald-800"
          >
            Search Providers
          </Button>
        </Link>
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