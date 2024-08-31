"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";

import { articleContent1 } from "../../data/articlesDemo";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export interface ArticleItemProps {
  id: number;
  title: string;
  meta: string;
  img: StaticImageData;
}

const portfolioMenu = ["All", "Research", "Guides", "Chambers", "HQ"];

const ArticleSection = () => {
  const [pageItems, setPageItems] = useState<ArticleItemProps[]>([]);
  const [tabActive, setTabActive] = useState("All");

  useEffect(() => {
    if (tabActive === "All") {
      setPageItems(articleContent1);
    } else {
      const filteredItems = articleContent1.filter((elm) =>
        elm.meta
          .toLowerCase()
          .split(",")
          .map((elm) => elm.trim())
          .includes(tabActive.toLowerCase().trim()),
      );
      setPageItems(filteredItems);
    }
  }, [tabActive]);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-semibold uppercase">What&rsquo;s New</h2>
          <div className="flex space-x-4">
            {portfolioMenu.map((item) => (
              <button
                key={item}
                onClick={() => setTabActive(item)}
                className={`px-4 py-2 ${
                  tabActive === item ? "text-selected-text" : "text-gray-600"
                }`}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 pt-16 md:grid-cols-2">
          {pageItems.map((singleItem) => (
            <div key={singleItem.id} className="flex flex-col items-center">
              <div className="relative h-72 w-72 overflow-hidden rounded-lg border">
                <Link href={`/works/${singleItem.id}`} passHref>
                  <Image
                    src={singleItem.img}
                    alt={singleItem.title}
                    className="absolute inset-0"
                  />
                </Link>
              </div>
              <div className="p-4 text-center">
                <h4 className="mb-2 text-xl font-semibold">
                  <Link href={`/works/${singleItem.id}`} passHref>
                    {singleItem.title}
                  </Link>
                </h4>
                <p className="text-gray-600">{singleItem.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-12 flex justify-center">
        <Link href="/explore" passHref>
          <div className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-gray-300 border-opacity-75 text-black hover:border-orange-500 hover:text-orange-500">
            <span className="text-md">Explore</span>
            <ArrowRightIcon className="ml-2 text-2xl" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default ArticleSection;
