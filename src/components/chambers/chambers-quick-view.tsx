"use client";

import Image from "next/image";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import type { chambersDataProp } from "~/data/rebrandData";

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl overflow-hidden p-0">
        <div className="relative h-[80vh] w-full">
          {/* Background Image */}
          <Image
            src={chamber.image || "/placeholder.svg"}
            alt={chamber.name || "Chamber"}
            fill
            className="object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

          {/* Content Section */}
          <ScrollArea className="absolute inset-0 h-full w-full">
            <div className="flex h-full flex-col justify-between p-8 text-white">
              <div className="space-y-8 md:max-w-[60%]">
                <div className="space-y-2">
                  <p className="text-lg font-semibold uppercase tracking-wider text-emerald-400">
                    {chamber.type}
                  </p>
                  <h2 className="font-['Raleway'] text-4xl uppercase tracking-widest">
                    {chamber.name}
                  </h2>
                  <p className="text-xl text-gray-200">
                    Brand: {chamber.brand} | Capacity: {chamber.persons} Person
                  </p>
                </div>

                <div className="space-y-2 rounded-lg bg-black/30 p-4">
                  <h3 className="font-['Raleway'] text-2xl uppercase tracking-wider">
                    About This Chamber
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-200">
                    {chamber.description}
                  </p>
                </div>

                <div className="space-y-2 rounded-lg bg-black/30 p-4">
                  <h3 className="font-['Raleway'] text-2xl uppercase tracking-wider">
                    Specifications
                  </h3>
                  <ul className="list-inside list-disc space-y-2 font-mono text-lg text-gray-200">
                    <li>Type: {chamber.type}</li>
                    <li>Maximum Pressure: {chamber.pressure}</li>
                    <li>Capacity: {chamber.persons} Person</li>
                    <li>Brand: {chamber.brand}</li>
                  </ul>
                </div>
              </div>

              <Button
                className="mt-8 w-full bg-emerald-700 py-6 text-lg text-white hover:bg-emerald-800 md:max-w-[60%]"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add your expert contact logic here
                }}
              >
                Speak To An Expert
              </Button>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
