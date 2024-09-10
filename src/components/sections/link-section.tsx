"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { name: "Research", number: 17, link: "/research" },
  { name: "Guides", number: 54, link: "/guides" },
  { name: "Join HQ", number: 6, link: "/hq" },
  { name: "Chambers", number: 9, link: "/chambers" },
  { name: "News", number: 25, link: "/news" },
];

const LinkSection = () => {
  return (
    <div className="py-12">
      <div className="mb-8 border-t border-gray-300" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex items-center justify-center px-6"
      >
        <div className="my-12 flex flex-wrap space-x-4 text-4xl font-light text-gray-400 lg:text-5xl">
          {links.map((link, index) => (
            <div
              key={link.name}
              className="hover:text-selected-text flex items-baseline"
            >
              {index !== 0 && <span className="mx-2 text-gray-400">/</span>}
              <Link href={link.link}>
                <span className="hover:underline">
                  {link.name}
                  <sup className="ml-1 text-sm">{link.number}</sup>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="mt-8 border-t border-gray-300" />
    </div>
  );
};

export default LinkSection;
