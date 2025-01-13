"use client";

import Link from "next/link";
import type React from "react";
import { useState } from "react";

import { Button } from "../ui/button";

export interface GuideData {
  id: string;
  fields: {
    "Guide Title": string;
    Guide: string;
    Hook: string;
  };
}

interface GuidesListingProps {
  guides: GuideData[];
}

const GuidesListing: React.FC<GuidesListingProps> = ({ guides }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedGuide, setSelectedGuide] = useState<GuideData | null>(null);
  const guidesPerPage = 6;

  const indexOfLastGuide = currentPage * guidesPerPage;
  const indexOfFirstGuide = indexOfLastGuide - guidesPerPage;
  const currentGuides = guides.slice(indexOfFirstGuide, indexOfLastGuide);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // const handleOpenChange = (open: boolean) => {
  //   if (!open) setSelectedGuide(null);
  // };

  return (
    <div className="w-2/3">
      <div className="grid grid-cols-1 gap-6">
        {currentGuides.map((guide) => (
          <Link href={`/guides/provider/${guide.id}`} key={guide.id}>
            <div
              key={guide.id}
              className="cursor-pointer rounded-lg border p-4 shadow transition-colors hover:bg-gray-50"
              // onClick={() => setSelectedGuide(guide)}
              // onKeyDown={() => setSelectedGuide(guide)}
            >
              <h3 className="text-xl font-bold">
                {guide.fields["Guide Title"]}
              </h3>
              <p className="text-gray-600">
                {guide.fields.Hook?.length > 150
                  ? `${guide.fields.Hook.substring(0, 150)}...`
                  : guide.fields.Hook}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        {Array.from(Array(Math.ceil(guides.length / guidesPerPage))).map(
          (_, i) => (
            <Button
              type="button"
              key={`page-${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                i
              }`}
              onClick={() => paginate(i + 1)}
              className={`mx-1 rounded border bg-transparent px-4 py-2 hover:bg-orange-300/30 ${
                currentPage === i + 1
                  ? "border-rounded text-orange-500"
                  : "text-gray-600"
              }`}
            >
              {i + 1}
            </Button>
          ),
        )}
      </div>

      {/* {selectedGuide && (
        <GuideDialog
          isOpen={!!selectedGuide}
          onOpenChange={handleOpenChange}
          title={selectedGuide.fields["Guide Title"]}
          guideId={selectedGuide.id}
        />
      )} */}
    </div>
  );
};

export default GuidesListing;
