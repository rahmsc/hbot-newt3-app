"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { Button } from "~/components/ui/button";
import { ChamberQuickView } from "./chambers-quick-view";
import type { chambersDataProp } from "~/data/rebrandData";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ChamberCarouselProps {
  chambers: chambersDataProp[];
}

export function ChamberCarousel({ chambers }: ChamberCarouselProps) {
  const [selectedChamber, setSelectedChamber] =
    useState<chambersDataProp | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleViewClick = (chamber: chambersDataProp) => {
    setSelectedChamber(chamber);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="relative">
      <Slider ref={sliderRef} {...settings}>
        {chambers.map((chamber) => (
          <div key={chamber.id} className="px-1 py-1">
            <div className="overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl">
              <div className="relative h-[550px]">
                <Image
                  src={chamber.image || "/placeholder.svg"}
                  alt={chamber.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h3 className="mb-2 font-['Raleway'] text-4xl font-semibold uppercase tracking-wider text-white">
                    {chamber.name}
                  </h3>
                  <p className="mb-4 flex flex-col gap-2 font-mono text-sm text-gray-200">
                    <span>Type: {chamber.type}</span>
                    <span>Max Pressure: {chamber.pressure}</span>
                    <span>Capacity: {chamber.persons} persons</span>
                  </p>
                  <Button
                    onClick={() => handleViewClick(chamber)}
                    className="bg-emerald-700 text-white hover:bg-emerald-800"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <ChamberQuickView
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        chamber={selectedChamber}
      />
    </div>
  );
}
