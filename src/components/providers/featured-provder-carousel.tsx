"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

import { providers } from "./provider-list";

export function FeaturedProviderCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % providers.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + providers.length) % providers.length,
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
      >
        {providers.map((provider) => (
          <Card key={provider.id} className="w-full flex-shrink-0 p-4 md:w-1/3">
            <CardContent>
              <h3 className="mb-2 text-2xl font-bold">{provider.name}</h3>
              <p className="mb-2 text-gray-600">{provider.location}</p>
              <div className="mb-2 flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
                  <svg
                    key={i}
                    className={`h-5 w-5 ${i < provider.rating ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">
                  {provider.rating.toFixed(1)}
                </span>
              </div>
              <p className="mb-2 text-sm text-gray-600">{provider.type}</p>
              <p className="mb-4 text-sm text-gray-600">{provider.pressure}</p>
              <Button
                className="w-full bg-[#2B5741] text-white hover:bg-[#1e3d2d]"
                onClick={() => window.open(provider.website, "_blank")}
              >
                Visit Website
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 transform"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 transform"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
