"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { GuideDialog } from "./guide-dialog";

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

const UserGuideCarousel: React.FC<UserGuideCarouselProps> = ({ guides }) => {
  const [selectedGuide, setSelectedGuide] = useState<GuideProp | null>(null);
  const imageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/guides/";

  const handleOpenChange = (open: boolean) => {
    if (!open) setSelectedGuide(null);
  };

  return (
    <>
      <Carousel className="w-full max-w-lg">
        <CarouselContent>
          {guides.map((guide, index) => (
            <CarouselItem key={guide.id}>
              <Card>
                <CardContent
                  className="flex aspect-square cursor-pointer items-center justify-center bg-opacity-0 p-6"
                  onClick={() => setSelectedGuide(guide)}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={`${imageUrl}${index + 1}.png`}
                      alt={guide.fields["Guide Title"]}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                      <h2 className="text-lg font-semibold">
                        {guide.fields["Guide Title"]}
                      </h2>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {selectedGuide && (
        <GuideDialog
          isOpen={!!selectedGuide}
          onOpenChange={handleOpenChange}
          title={selectedGuide.fields["Guide Title"]}
          guideId={selectedGuide.id}
        />
      )}
    </>
  );
};

export default UserGuideCarousel;
