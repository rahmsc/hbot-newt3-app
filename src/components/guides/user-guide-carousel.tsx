"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Card, CardContent } from "~/components/ui/card";
import { sendGAEvent } from "@next/third-parties/google";

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
  const imageUrl = "https://d144dqt8e4woe2.cloudfront.net/guides/header/";

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-lg"
    >
      <CarouselContent>
        {guides.map((guide, index) => (
          <CarouselItem key={guide.id}>
            <Link
              href={`/guides/user/${guide.id}`}
              onClick={() =>
                sendGAEvent("event", "buttonClicked", {
                  value: `User Guide ${guide.fields["Guide Title"]}`,
                })
              }
              passHref
            >
              <Card className="cursor-pointer">
                <CardContent className="relative aspect-square p-0">
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
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default UserGuideCarousel;
