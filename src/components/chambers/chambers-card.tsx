"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import type { chambersDataProp } from "~/data/rebrandData";

interface ChamberCardProps {
  chamber: chambersDataProp;
  isSelected?: boolean;
  onClick?: () => void;
  onQuickView: (chamber: chambersDataProp) => void;
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
    persons = 0,
    pressure = "",
    image = "/placeholder.svg",
    uniqueId = Math.random().toString(36).substr(2, 9),
    type = "",
    brand = "",
  } = chamber;

  return (
    <motion.div
      layoutId={`chamber-${chamber.uniqueId ?? uniqueId}`}
      onClick={onClick}
      className={`cursor-pointer ${isSelected ? "invisible" : ""}`}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="group relative h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-blue-600 shadow-lg transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-emerald-500/20">
        {/* Background Image with zoom effect on hover */}
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-all duration-500 group-hover:from-black/90" />

        {/* Content wrapper */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
          {/* Top Content */}
          <div className="space-y-4">
            <Badge className="border-emerald-700 bg-white/60 px-1 py-1 font-['Roboto'] text-base uppercase tracking-wider text-emerald-700">
              {type}
            </Badge>
            <h3 className="font-['Raleway'] text-4xl font-bold uppercase tracking-widest">
              {name}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-emerald-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="font-mono text-sm">
                  Capacity: {persons} {persons === 1 ? "Person" : "People"}
                </span>
              </div>
              {pressure && (
                <div className="flex items-center space-x-2">
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-emerald-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                  <span className="font-mono text-sm">
                    Max Pressure: {pressure}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Middle Content */}

          {/* Bottom Buttons with enhanced styling */}
          <div className="flex flex-row items-center justify-center space-x-2">
            <Button
              variant="default"
              className="w-full bg-emerald-700 py-1 text-lg text-white transition-all hover:bg-emerald-600"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(chamber);
              }}
            >
              Quick View
            </Button>
            <Button
              variant="outline"
              className="w-full border-emerald-700 bg-white/70 py-1 text-lg text-emerald-700 backdrop-blur-md transition-all hover:bg-emerald-50 hover:text-emerald-800"
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
