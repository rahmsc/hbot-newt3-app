"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "~/components/ui/button";

import { WellnessProductCard } from "./components/wellness/wellness-product-card";

const products = [
  {
    image: "/wellness-product-images/1.png",
    publisher: "Guide by Hyperbaric HQ",
    title: "Intro to HBOT",
    description: "Learn about HBOT and your health",
    productUrl: "/marketplace/intro-to-hbot",
  },
  {
    image: "/wellness-product-images/2.png",
    publisher: "Guide by Hyperbaric HQ",
    title: "HBOT for Wellness Centres",
    description: "Learn how to bring HBOT into your practice",
    productUrl: "/marketplace/hbot-for-wellness",
  },
  {
    image: "/wellness-product-images/3.png",
    publisher: "Methylene Blu by Troscriptions",
    title: "Metheylne Blue",
    description: "Supplementary Mitochondria booster",
    productUrl: "/marketplace/methylene-blue",
  },
];

export function WellnessMarketplace() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="w-full bg-gray-50">
      <div className="container mx-auto px-4 py-24">
        {/* Header Section */}
        <div className="mb-12">
          <div className="mb-8 flex items-center justify-between">
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-bold text-gray-900">
                Wellness Marketplace
              </h2>
              <p className="font-sans text-lg text-gray-600">
                Discover premium products and resources for your HBOT journey
              </p>
            </div>
            <Button
              variant="outline"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              See All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-8">
              {products.map((product) => (
                <div
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%]"
                  key={product.title}
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
            className="absolute -left-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-white shadow-md hover:bg-gray-50"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-white shadow-md hover:bg-gray-50"
            onClick={scrollNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
