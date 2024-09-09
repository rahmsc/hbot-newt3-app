"use client";
import ChamberMasonryGrid from "~/components/chambers/chamber-masonry-grid";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { chamberData } from "~/data/chamberData";

import Image from "next/image";
import ImagePopup from "~/components/chambers/chamber-popup";
import { useState } from "react";

const Chambers = () => {
  const chamberImageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/chambers/products/";

  const [selectedChamberId, setSelectedChamberId] = useState<number | null>(
    null,
  );

  const handleChamberPopup = (chamberId: number) => {
    setSelectedChamberId(chamberId); // Set the selected chamber ID
  };

  const closePopup = () => {
    setSelectedChamberId(null); // Close the popup
  };

  return (
    <section className="flex w-full flex-col items-center justify-center pt-32">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Types of Chambers
          </h1>
        </div>

        <div className="mb-10 flex justify-center space-x-4">
          {chamberData.map((chamber) => (
            <div
              key={chamber.id}
              className="cursor-pointer"
              onKeyDown={() => handleChamberPopup(chamber.id)}
              onClick={() => handleChamberPopup(chamber.id)}
            >
              <Image
                src={`${chamberImageUrl}${chamber.id}.png`}
                alt={chamber.title}
                width={300}
                height={300}
                className="rounded-lg transition-transform hover:scale-105"
              />
            </div>
          ))}
        </div>
        <div className="mb-8 border-t border-gray-300" />
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Photo Gallery
            </h1>
          </div>

          <div className="flex justify-center">
            <ChamberMasonryGrid />
          </div>
        </div>
      </div>

      {selectedChamberId && (
        <ImagePopup chamberId={selectedChamberId} onClose={closePopup} />
      )}
    </section>
  );
};

export default Chambers;
