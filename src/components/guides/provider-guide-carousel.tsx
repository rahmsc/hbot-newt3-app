"use client";

import { sendGAEvent } from "@next/third-parties/google";
// import { useState } from "react";
import Image from "next/image";
// import { GuideDialog } from "./guide-dialog";
import Link from "next/link";
import type React from "react";

import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export interface GuideProp {
  id: string;
  fields: {
    "Guide Title": string;
    Guide: string;
  };
}

interface UserGuideCarouselProps {
  guides: GuideProp[];
}

const ProviderGuideCarousel: React.FC<UserGuideCarouselProps> = ({
  guides,
}) => {
  // const [selectedGuide, setSelectedGuide] = useState<GuideProp | null>(null);
  const imageUrl = "https://d144dqt8e4woe2.cloudfront.net/guides/header/";

  // const handleOpenChange = (open: boolean) => {
  //   if (!open) setSelectedGuide(null);
  // };

  return (
    <>
      <Carousel className="w-full max-w-6xl">
        <CarouselContent className="-ml-4">
          {guides.map((guide, index) => (
            <CarouselItem key={guide.id} className="basis-1/2 pl-4">
              <Link
                href={`/guides/provider/${guide.id}`}
                onClick={() =>
                  sendGAEvent("event", "buttonClicked", {
                    value: `Provider Guide ${guide.fields["Guide Title"]}`,
                  })
                }
              >
                <Card>
                  <CardContent
                    className="flex aspect-square cursor-pointer items-center justify-center bg-opacity-0 p-2"
                    // onClick={() => setSelectedGuide(guide)}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={`${imageUrl}${index + 1}.png`}
                        alt={guide.fields["Guide Title"]}
                        layout="fill"
                        objectFit="cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white">
                        <h2 className="line-clamp-2 text-sm font-semibold">
                          {guide.fields["Guide Title"]}
                        </h2>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* {selectedGuide && (
        <GuideDialog
          isOpen={!!selectedGuide}
          onOpenChange={handleOpenChange}
          title={selectedGuide.fields["Guide Title"]}
          guideId={selectedGuide.id}
        />
      )} */}
    </>
  );
};

export default ProviderGuideCarousel;
