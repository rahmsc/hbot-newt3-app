"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { featureTags } from "~/data/feature-tags";
import type { FeatureTag } from "~/types/feature-tags";

export const FeatureSection = () => {
  const [selectedTag, setSelectedTag] = useState<FeatureTag>(featureTags[0]);

  return (
    <div className="container mx-auto px-6 py-6">
      <p className="mx-auto mb-8 max-w-5xl text-center text-4xl font-medium italic">
        Access cutting-edge research, expert support, and premium hyperbaric
        solutions - all in one place.
      </p>

      {/* Image Grid Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTag.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mx-auto mb-8 grid max-w-5xl grid-cols-1 gap-3 px-4 lg:grid-cols-12"
        >
          <div className="grid grid-cols-1 gap-3 lg:col-span-7">
            <div className="relative h-48 md:h-56">
              <Image
                src={selectedTag.images.topHorizontal}
                alt={`${selectedTag.label} Top Image`}
                fill
                className="w-full rounded-lg object-cover"
                priority
              />
            </div>
            <div className="relative h-48 md:h-56">
              <Image
                src={selectedTag.images.bottomHorizontal}
                alt={`${selectedTag.label} Bottom Image`}
                fill
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>

          <div className="relative h-[24rem] lg:col-span-5 lg:h-[28.5rem]">
            <Image
              src={selectedTag.images.vertical}
              alt={`${selectedTag.label} Vertical Image`}
              fill
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Feature Tags */}
      <div className="mt-2 flex flex-col items-center">
        <h4 className="mb-4 text-center text-xl font-bold uppercase text-gray-400">
          Choose to learn more about
        </h4>
        <div className="inline-block rounded-xl border-2 border-[#2B5741] p-4">
          <div className="flex flex-wrap justify-center gap-2">
            {featureTags.map((tag) => (
              <button
                type="button"
                key={tag.id}
                onClick={() => setSelectedTag(tag)}
                className={`flex items-center rounded-md px-5 py-2 text-white transition-all duration-200 ${
                  selectedTag.id === tag.id
                    ? "scale-105 bg-[#1a3528]"
                    : "hover:scale-102 bg-[#2B5741] hover:bg-[#234635]"
                }`}
              >
                <Image
                  src={tag.iconPath}
                  alt={`${tag.label} icon`}
                  width={20}
                  height={20}
                  className="mr-2"
                />
                {tag.label}
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTag.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-12 max-w-[600px] text-center"
          >
            <h2 className="mb-2 text-center text-3xl font-bold">
              Beyond Traditional Healthcare
            </h2>
            <p className="text-xl leading-relaxed tracking-widest text-gray-700">
              {selectedTag.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
