"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { ChevronRight } from "lucide-react";

interface GuideProp {
  id: string;
  fields: {
    "Guide Title": string;
    Guide: string;
    Hook: string;
  };
}

interface HorizontalGuidesProps {
  guides: GuideProp[];
}

const HorizontalGuides: React.FC<HorizontalGuidesProps> = ({ guides }) => {
  const [selectedGuide, setSelectedGuide] = useState<GuideProp | null>(null);
  const imageUrl = "https://d144dqt8e4woe2.cloudfront.net/guides/header/";

  const truncateGuide = (content: string, maxLength: number) => {
    if (content?.length <= maxLength) return content;
    return `${content?.slice(0, maxLength).trim()}...`;
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <h3 className="mb-6 text-center text-3xl font-bold">Popular Guides</h3>
      <div className="space-y-6">
        {guides.map((guide, index) => (
          <Card
            key={guide.id}
            className="cursor-pointer overflow-hidden transition-shadow duration-300 hover:shadow-lg"
            onClick={() => setSelectedGuide(guide)}
          >
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="relative aspect-square w-full md:w-[300px] lg:w-[400px]">
                  <Image
                    src={`${imageUrl}${index + 1}.png`}
                    alt={guide.fields["Guide Title"]}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <h6 className="mb-3 text-xl font-semibold text-gray-800">
                    {guide.fields["Guide Title"]}
                  </h6>
                  <p className="mb-4 text-base text-gray-600">
                    {truncateGuide(guide.fields.Hook, 500)}
                  </p>
                  <div className="flex items-center text-blue-600">
                    <span className="mr-2">Read More</span>
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!selectedGuide}
        onOpenChange={(open) => !open && setSelectedGuide(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedGuide?.fields["Guide Title"]}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex flex-col lg:flex-row">
            <div className="relative aspect-square w-full lg:w-1/2">
              <Image
                src={`${imageUrl}${
                  guides.findIndex((g) => g.id === selectedGuide?.id) + 1
                }.png`}
                alt={selectedGuide?.fields["Guide Title"] ?? ""}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="mt-6 flex-1 space-y-4 lg:ml-6 lg:mt-0">
              <p className="text-lg leading-relaxed">
                {selectedGuide?.fields.Hook}
              </p>
              <p className="text-base leading-relaxed">
                {selectedGuide?.fields.Guide}
              </p>
              <Link href={`/guides/user/${selectedGuide?.id}`}>
                <Button>View Full Guide</Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HorizontalGuides;
