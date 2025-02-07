"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "~/components/ui/button";
import { WellnessProductCard } from "~/components/wellness/wellness-product-card";

export const wellnessProducts = [
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-23%20at%2010.37.37%E2%80%AFam-pYS2M8B31sZedYpeERzH8sW2NtYNDR.png",
    publisher: "Troscriptions",
    title: "Methylene Blue",
    description: "Mitochondria booster",
    productUrl: "/marketplace/methylene-blue",
    price: 39.99,
    servings: "16",
    rating: 4.8,
    reviewCount: 124,
  },
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-23%20at%2010.37.37%E2%80%AFam-pYS2M8B31sZedYpeERzH8sW2NtYNDR.png",
    publisher: "Hyperbaric HQ",
    title: "HBOT Guide",
    description: "Professional handbook",
    productUrl: "/marketplace/hbot-guide",
    price: 49.99,
    servings: "12 chapters",
    rating: 4.9,
    reviewCount: 87,
  },
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-23%20at%2010.37.37%E2%80%AFam-pYS2M8B31sZedYpeERzH8sW2NtYNDR.png",
    publisher: "Wellness Tech",
    title: "O2 Optimizer",
    description: "Oxygen enhancement system",
    productUrl: "/marketplace/o2-optimizer",
    price: 299.99,
    servings: "30 day supply",
    rating: 4.7,
    reviewCount: 203,
  },
];

export function WellnessMarketplace() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 640px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": { slidesToScroll: 3 },
      },
    },
    [Autoplay()],
  );

  return (
    <section className="w-full">
      <div className="">
        {/* Header Section */}
        <div className="h-px w-full bg-gray-600" />
        <div className="flex items-center justify-between p-2 pb-12 pl-6">
          <h2 className="font-['Raleway'] text-4xl tracking-[0.3em] text-gray-900">
            WELLNESS MARKETPLACE
          </h2>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {wellnessProducts.map((product, index) => (
                <div
                  key={index}
                  className="min-w-0 flex-[0_0_100%] px-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <WellnessProductCard {...product} />
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
      </div>
    </section>
  );
}
