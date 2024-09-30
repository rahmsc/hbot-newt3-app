"use client";

import type React from "react";
import { useState, useCallback } from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import { blogContentmansorygrid } from "../../data/chamberData";

const breakpointColumnsObj = {
  default: 5,
  1536: 4,
  1280: 3,
  1024: 3,
  768: 2,
  640: 1,
};

const ChamberMasonryGrid: React.FC = () => {
  const imageUrl = "https://d144dqt8e4woe2.cloudfront.net/chambers/gallery/";
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleMouseEnter = useCallback((id: number) => {
    setHoveredItem(id);
    const timer = setTimeout(() => setShowPopup(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredItem(null);
    setShowPopup(false);
  }, []);

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="-mx-2 mt-8 flex w-full"
      columnClassName="px-2"
    >
      {blogContentmansorygrid.map((item) => (
        <div className="mb-4" key={item.id}>
          <article
            className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
            onMouseEnter={() => handleMouseEnter(Number(item.id))}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative">
              <Image
                width={400}
                height={item.height}
                src={`${imageUrl}${item.id}.png`}
                alt={item.title}
                loading="lazy"
                style={{ height: item.height, width: "100%" }}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
              {hoveredItem === Number(item.id) && showPopup && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 p-4 text-white transition-opacity duration-300">
                  <h3 className="text-center font-sans text-lg font-semibold">
                    {item.title}
                  </h3>
                </div>
              )}
            </div>
          </article>
        </div>
      ))}
    </Masonry>
  );
};

export default ChamberMasonryGrid;
