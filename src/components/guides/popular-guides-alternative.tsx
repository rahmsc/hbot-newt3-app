"use client";

import React, { useState } from "react";
import { GuideDialog } from "./guide-dialog";

interface GuideData {
  id: string;
  fields: {
    "Guide Title": string;
    Guide: string;
    // Add other fields as needed
  };
}

interface PopularGuidesAlternativeProps {
  guides: GuideData[];
}

const PopularGuidesAlternative: React.FC<PopularGuidesAlternativeProps> = ({
  guides,
}) => {
  const [selectedGuide, setSelectedGuide] = useState<GuideData | null>(null);

  // Sort guides by some criteria (e.g., views, likes) to determine popularity
  // For this example, we'll just take the first 5 guides
  const popularGuides = guides?.slice(0, 5);

  const handleOpenChange = (open: boolean) => {
    if (!open) setSelectedGuide(null);
  };

  return (
    <div className="mb-8">
      <h3 className="mb-4 text-xl font-bold">Popular Posts</h3>
      {popularGuides.map((guide, index) => (
        <div
          key={guide.id}
          className="mb-4 flex cursor-pointer"
          onClick={() => setSelectedGuide(guide)}
          onKeyDown={() => setSelectedGuide(guide)}
        >
          <div className="mr-4 font-bold text-gray-700">{index + 1}</div>
          <div>
            <span className="text-sm text-gray-500">Guide</span>
            <h6 className="text-gray-800">{guide.fields["Guide Title"]}</h6>
          </div>
        </div>
      ))}
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

export default PopularGuidesAlternative;
