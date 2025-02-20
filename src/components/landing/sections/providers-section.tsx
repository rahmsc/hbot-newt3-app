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
      "id": "hhq-001",
      "name": "Hyperbaric HQ - Sydney CBD",
      "rating": 4.9,
      "reviewCount": 210,
      "location": "Sydney, Australia",
      "latitude": -33.8688,
      "longitude": 151.2093,
      "address": "123 George St, Sydney NSW 2000, Australia",
      "categories": ["Wellness", "Recovery", "Medical Spa"],
      "nextAvailable": "Today",
      "phone": "0489 111 222",
      "hours": "Mon - Sun: 8am - 9pm",
      "image": "/images/providers/provider_1.png",
      "pressure": "2.5 ATA",
      "type": "Hard Shell Lying",
      "website": "https://hyperbarichq.com.au",
      "directions": "https://maps.google.com/?q=Hyperbaric+HQ+Sydney+CBD",
      "email": "contact@hyperbarichq.com.au",
      "description": "Premium hyperbaric oxygen therapy in the heart of Sydney CBD, specializing in recovery and wellness."
    },
    {
      "id": "hhq-002",
      "name": "Hyperbaric HQ - Parramatta",
      "rating": 4.8,
      "reviewCount": 175,
      "location": "Parramatta, Australia",
      "latitude": -33.8150,
      "longitude": 151.0011,
      "address": "45 Church St, Parramatta NSW 2150, Australia",
      "categories": ["Wellness", "Sports Recovery", "Pain Relief"],
      "nextAvailable": "Tomorrow",
      "phone": "0489 333 444",
      "hours": "Mon - Sun: 8am - 8pm",
      "image": "/images/providers/provider_2.png",
      "pressure": "3.0 ATA",
      "type": "Soft Shell Seated",
      "website": "https://hyperbarichq.com.au/parramatta",
      "directions": "https://maps.google.com/?q=Hyperbaric+HQ+Parramatta",
      "email": "parramatta@hyperbarichq.com.au",
      "description": "State-of-the-art hyperbaric oxygen therapy clinic in Parramatta, helping athletes and wellness seekers recover faster."
    },
    {
      "id": "hhq-003",
      "name": "Hyperbaric HQ - Bondi Junction",
      "rating": 5.0,
      "reviewCount": 220,
      "location": "Bondi Junction, Australia",
      "latitude": -33.8915,
      "longitude": 151.2496,
      "address": "78 Oxford St, Bondi Junction NSW 2022, Australia",
      "categories": ["Anti-Aging", "Detox", "Wellness"],
      "nextAvailable": "Today",
      "phone": "0489 555 666",
      "hours": "Mon - Sun: 9am - 7pm",
      "image": "/images/providers/provider_3.png",
      "pressure": "1.8 ATA",
      "type": "Soft Shell Lying",
      "website": "https://hyperbarichq.com.au/bondi",
      "directions": "https://maps.google.com/?q=Hyperbaric+HQ+Bondi+Junction",
      "email": "bondi@hyperbarichq.com.au",
      "description": "Luxury wellness and anti-aging hyperbaric therapy in the heart of Bondi Junction."
    },
    {
      "id": "hhq-004",
      "name": "Hyperbaric HQ - North Sydney",
      "rating": 4.7,
      "reviewCount": 190,
      "location": "North Sydney, Australia",
      "latitude": -33.8390,
      "longitude": 151.2096,
      "address": "100 Miller St, North Sydney NSW 2060, Australia",
      "categories": ["Wellness", "Cognitive Enhancement", "Recovery"],
      "nextAvailable": "Thursday",
      "phone": "0489 777 888",
      "hours": "Mon - Sun: 8:30am - 8pm",
      "image": "/images/providers/provider_4.png",
      "pressure": "2.0 ATA",
      "type": "Hard Shell Seated",
      "website": "https://hyperbarichq.com.au/north-sydney",
      "directions": "https://maps.google.com/?q=Hyperbaric+HQ+North+Sydney",
      "email": "northsydney@hyperbarichq.com.au",
      "description": "Cutting-edge hyperbaric therapy in North Sydney, focusing on cognitive health and physical recovery."
    },
    {
      "id": "hhq-005",
      "name": "Hyperbaric HQ - Manly",
      "rating": 4.9,
      "reviewCount": 205,
      "location": "Manly, Australia",
      "latitude": -33.7974,
      "longitude": 151.2883,
      "address": "42 The Corso, Manly NSW 2095, Australia",
      "categories": ["Sports Recovery", "Pain Relief", "Wellness"],
      "nextAvailable": "Friday",
      "phone": "0489 999 000",
      "hours": "Mon - Sun: 7am - 9pm",
        "image": "/images/providers/provider_5.png",
      "pressure": "2.5 ATA",
      "type": "Soft Shell Lying",
      "website": "https://hyperbarichq.com.au/manly",
      "directions": "https://maps.google.com/?q=Hyperbaric+HQ+Manly",
      "email": "manly@hyperbarichq.com.au",
      "description": "Hyperbaric oxygen therapy for surfers, athletes, and health-conscious individuals in Manly."
    },
    {
      "id": "hhq-006",
      "name": "Hyperbaric HQ - Newtown",
      "rating": 4.8,
      "reviewCount": 180,
      "location": "Newtown, Australia",
      "latitude": -33.8980,
      "longitude": 151.1746,
      "address": "22 King St, Newtown NSW 2042, Australia",
      "categories": ["Detox", "Immune Boosting", "Wellness"],
      "nextAvailable": "Saturday",
      "phone": "0489 123 456",
      "hours": "Mon - Sun: 10am - 6pm",
      "image": "/images/providers/provider_6.png",
      "pressure": "1.5 ATA",
      "type": "Soft Shell Seated",
      "website": "https://hyperbarichq.com.au/newtown",
      "directions": "https://maps.google.com/?q=Hyperbaric+HQ+Newtown",
      "email": "newtown@hyperbarichq.com.au",
      "description": "Newtown's go-to wellness hub for detox and immune-boosting hyperbaric therapy."
    }
  
]

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