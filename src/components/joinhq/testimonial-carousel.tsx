"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { User } from "lucide-react";
import { testimonials } from "~/data/testimonials";

export const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000); // Corrected the interval duration to 5000ms

    return () => clearInterval(timer);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative mx-auto max-w-2xl">
      {/* Horizontal Lines */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
        {/* Left horizontal line with vertical end */}
        <div className="absolute right-full flex items-center">
          <div className="h-[1px] w-[400px] bg-gray-200" />
          <div className="h-8 w-[1px] bg-gray-200" />
        </div>

        {/* Right horizontal line with vertical end */}
        <div className="absolute left-full flex items-center">
          <div className="h-8 w-[1px] bg-gray-200" />
          <div className="h-[1px] w-[400px] bg-gray-200" />
        </div>
      </div>

      {/* Carousel Indicators at Top */}

      {/* Border Frame */}
      <div className="relative px-4">
        {/* Corner Decorations */}
        <div className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-[#2B5741]" />
        <div className="absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2 border-[#2B5741]" />
        <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 border-[#2B5741]" />
        <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-[#2B5741]" />

        {/* Testimonial Content */}
        <div className="">
          <div className="mb-16 flex justify-center space-x-2 pt-3">
            {testimonials.map((_, index) => (
              <button
                key={`indicator-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  index
                }`}
                type="button"
                className={`h-2 w-2 border border-gray-300 ${
                  index === currentIndex ? "bg-orange-400" : "bg-transparent"
                }`}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsTransitioning(false);
                  }, 500);
                }}
              />
            ))}
          </div>
          <div
            className={`flex transform flex-col items-center transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <h3 className="mb-24 text-center text-4xl font-bold leading-snug">
              {currentTestimonial.quote}
            </h3>

            <div className="flex items-baseline px-12">
              <User />
              <span className="ml-2 pb-2 font-mono text-sm tracking-wider text-gray-600">
                {currentTestimonial.author}, {currentTestimonial.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
