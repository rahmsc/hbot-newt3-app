"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import type { ChamberProps } from "~/types/chambers";

import GlowingButton from "../utils/glowing-button";

interface ChamberCardProps {
  chamber: ChamberProps;
  isSelected?: boolean;
  onClick?: () => void;
  onQuickView: (chamber: ChamberProps) => void;
}

export function ChamberCard({
  chamber,
  isSelected = false,
  onClick,
  onQuickView,
}: ChamberCardProps) {
  if (!chamber) return null;

  const {
    name = "",
    type = "",
    info = "",
    features = "",
    id = 0,

  } = chamber;  

  const imageUrl = "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/chambers/"

  return (
    <motion.div
        layoutId={`chamber-${chamber.id}`}
      onClick={onClick}
      className={`cursor-pointer ${isSelected ? "invisible" : ""}`}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="group relative h-[450px] w-[450px] overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-blue-600 shadow-lg transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-emerald-500/20">
        <Image
          src={`${imageUrl}${id}.png`}
          alt={name ?? ""}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-all duration-500 group-hover:from-black/90" />

        <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
          <div className="space-y-2">
            <h3 className="font-['Raleway'] text-4xl uppercase tracking-wider">
              {name}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-emerald-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="font-mono text-sm">
                  Type: {type}
                </span>
              </div>
              {info && (
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-emerald-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                  <span className="font-mono text-sm">
                    Info: {info}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center justify-center">
            <GlowingButton
              text="View Details"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(chamber);
              }}
              className="w-full max-w-[200px]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
