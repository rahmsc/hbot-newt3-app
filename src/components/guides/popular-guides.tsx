"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { GuideDialog } from "./guide-dialog";

interface GuideProp {
  id: string;
  fields: {
    "Guide Title": string;
    Guide: string;
  };
}

interface PopularPostsProps {
  guides: GuideProp[];
}

const PopularPosts: React.FC<PopularPostsProps> = ({ guides }) => {
  const [selectedGuide, setSelectedGuide] = useState<GuideProp | null>(null);
  const imageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/guides/";

  const truncateGuide = (content: string, maxLength: number) => {
    if (content?.length <= maxLength) return content;
    return `${content?.slice(0, maxLength).trim()}...`;
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) setSelectedGuide(null);
  };

  return (
    <div className="w-full max-w-4xl">
      <h3 className="mb-6 text-2xl font-bold">Popular Guides</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide, index) => (
          <Card
            key={guide.id}
            className="cursor-pointer overflow-hidden"
            onClick={() => setSelectedGuide(guide)}
          >
            <CardContent className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={`${imageUrl}${index + 1}.png`}
                  alt={guide.fields["Guide Title"]}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h6 className="mb-2 text-lg font-semibold text-gray-800">
                  {guide.fields["Guide Title"]}
                </h6>
                <p className="text-sm text-gray-600">
                  {truncateGuide(guide.fields.Guide, 100)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedGuide && (
        <GuideDialog
          isOpen={!!selectedGuide}
          onOpenChange={handleOpenChange}
          title={selectedGuide.fields["Guide Title"]}
          guideId={selectedGuide.id}
        />
      )}
    </div>
  );
};

export default PopularPosts;
