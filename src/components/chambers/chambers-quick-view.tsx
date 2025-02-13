"use client";

import { Box, CheckCircle, Gauge, Users, X } from "lucide-react";
import Image from "next/image";

import { Badge } from "~/components/ui/badge";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import type { chambersDataProp } from "~/types/chambers";

import GlowingButton from "../utils/glowing-button";

interface ChamberQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  chamber: chambersDataProp | null;
}

export function ChamberQuickView({
  isOpen,
  onClose,
  chamber,
}: ChamberQuickViewProps) {
  if (!chamber) return null;

  const features = [
    "Advanced Pressure Control",
    "Comfortable Interior",
    "Safety Certified",
    "Easy Maintenance",
    "Quiet Operation",
    "Energy Efficient",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl overflow-hidden rounded-xl bg-transparent p-0">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white/60"
          aria-label="Close dialog"
        >
          <X className="h-6 w-6 text-white" />
        </button>
        <div className="relative h-[85vh] w-full overflow-hidden rounded-3xl">
          {/* Background Image */}
          <Image
            src={chamber.image || "/placeholder.svg"}
            alt={chamber.name || "Chamber"}
            fill
            className="object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />

          {/* Content Section */}
          <ScrollArea className="absolute inset-0 h-full w-full">
            <div className="flex h-full flex-col justify-between p-10 text-white">
              <div className="space-y-8">
                <div className="flex items-start justify-between">
                  <div className="space-y-4">
                    <Badge className="bg-emerald-700 text-white hover:bg-emerald-800">
                      {chamber.type}
                    </Badge>
                    <h2 className="font-['Raleway'] text-5xl font-bold uppercase tracking-widest text-white">
                      {chamber.name}
                    </h2>
                    <p className="text-2xl font-light text-gray-100">
                      Experience the future of hyperbaric therapy
                    </p>
                  </div>
                  <GlowingButton
                    text="Speak To An Expert"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add your expert contact logic here
                    }}
                    className="mt-2"
                  />
                </div>

                <div className="flex space-x-8">
                  <div className="w-2/3 space-y-6">
                    <div className="space-y-4 rounded-xl bg-black/30 p-6 backdrop-blur-sm">
                      <h3 className="font-['Raleway'] text-3xl font-semibold uppercase tracking-wider text-emerald-700">
                        About This Chamber
                      </h3>
                      <p className="text-xl leading-relaxed text-gray-100">
                        {chamber.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center space-y-2 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                        <Users className="h-8 w-8 text-emerald-700" />
                        <span className="text-xl font-bold text-white">
                          {chamber.persons}
                        </span>
                        <span className="text-xs uppercase tracking-wide text-gray-400">
                          Capacity
                        </span>
                      </div>
                      <div className="flex flex-col items-center space-y-2 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                        <Gauge className="h-8 w-8 text-emerald-700" />
                        <span className="text-xl font-bold text-white">
                          {chamber.pressure}
                        </span>
                        <span className="text-xs uppercase tracking-wide text-gray-400">
                          Max Pressure
                        </span>
                      </div>
                      <div className="flex flex-col items-center space-y-2 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                        <Box className="h-8 w-8 text-emerald-700" />
                        <span className="text-xl font-bold text-white">
                          {chamber.type}
                        </span>
                        <span className="text-xs uppercase tracking-wide text-gray-400">
                          Chamber Type
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/3 space-y-4 rounded-xl bg-black/30 p-6 backdrop-blur-sm">
                    <h3 className="font-['Raleway'] text-2xl font-semibold uppercase tracking-wider text-emerald-700">
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="h-5 w-5 text-emerald-700" />
                          <span className="text-base text-gray-100">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-base text-gray-100">
                      <span className="font-semibold text-gray-400">
                        Brand:
                      </span>{" "}
                      {chamber.brand}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
