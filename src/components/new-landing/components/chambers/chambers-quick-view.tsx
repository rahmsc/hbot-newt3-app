"use client";

import Image from "next/image";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import type { chambersDataProp } from "~/data/rebrandData";

interface ChamberQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  chamber: chambersDataProp;
}

export function ChamberQuickView({
  isOpen,
  onClose,
  chamber,
}: ChamberQuickViewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={chamber.image}
                alt={chamber.name}
                fill
                className="object-cover"
              />
              <Badge
                className="absolute right-2 top-2 bg-orange-400 text-white"
                variant="secondary"
              >
                {chamber.pressure}
              </Badge>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">{chamber.type}</p>
              <h2 className="text-2xl font-bold">{chamber.name}</h2>
              <p className="text-sm text-muted-foreground">
                Max Pressure: {chamber.pressure}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Brand: {chamber.brand}
              </p>
              <Badge variant="secondary" className="mt-2 bg-gray-200">
                {chamber.persons} Person
              </Badge>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">About This Chamber</h3>
              <p className="text-sm text-muted-foreground">
                {chamber.description}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Specifications</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Type: {chamber.type}</li>
                <li>Maximum Pressure: {chamber.pressure}</li>
                <li>Capacity: {chamber.persons} Person</li>
                <li>Brand: {chamber.brand}</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 bg-black text-white hover:bg-gray-800">
                Speak To An Expert
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
