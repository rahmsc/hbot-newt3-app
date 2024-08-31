"use client";
import React, { useState } from "react";

import { guidesData } from "../../data/guidesDemo";

const GuidesListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const guidesPerPage = 6;

  const indexOfLastGuide = currentPage * guidesPerPage;
  const indexOfFirstGuide = indexOfLastGuide - guidesPerPage;
  const currentGuides = guidesData.slice(indexOfFirstGuide, indexOfLastGuide);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-2/3">
      <div className="grid grid-cols-1 gap-6">
        {currentGuides.map((guide, _) => (
          <div key={guide.id} className="rounded-lg border p-4 shadow">
            <h3 className="text-xl font-bold">{guide.title}</h3>
            <p className="text-gray-600">{guide.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        {Array.from(Array(Math.ceil(guidesData.length / guidesPerPage))).map(
          (_, i) => (
            <button
              type="button"
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 rounded border px-4 py-2 ${
                currentPage === i + 1
                  ? "border-rounded text-orange-500"
                  : "text-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default GuidesListing;
