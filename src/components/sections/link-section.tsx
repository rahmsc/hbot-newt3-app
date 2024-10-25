"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";

const links = [
  { name: "Research", number: 17, link: "/research" },
  { name: "Guides", number: 54, link: "/guides" },
  { name: "Join HQ", number: 6, link: "/contact" },
  { name: "Chambers", number: 9, link: "/chambers" },
  { name: "Blogs", number: 25, link: "/blog" },
];

export default function LinkSection() {
  return (
    <div className="py-12">
      <div className="mb-8 border-t border-gray-300" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6"
      >
        <div className="my-12 flex flex-wrap justify-center gap-x-2 gap-y-4 text-2xl font-light text-gray-400 sm:text-3xl md:text-4xl lg:flex-nowrap lg:gap-x-4 lg:text-5xl">
          {links.map((link, index) => (
            <div
              key={link.name}
              className="hover:text-selected-text flex items-baseline space-x-4"
            >
              {index !== 0 && <span className="mr-2 text-gray-400">/</span>}
              <Link
                href={link.link}
                onClick={() =>
                  sendGAEvent("event", "buttonClicked", {
                    value: `Link Section - ${link.name}`,
                  })
                }
              >
                <span className="whitespace-nowrap hover:underline">
                  {link.name.replace(" ", "\u00A0")}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="mt-8 border-t border-gray-300" />
    </div>
  );
}
