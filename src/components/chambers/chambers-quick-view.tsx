"use client";

import { useState } from "react";
import {
  Box,
  CheckCircle,
  Gauge,
  Users,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "~/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import GlowingButton from "../utils/glowing-button";
import { ExpertInquiryForm } from "~/components/chambers/expert-inquiry-form";
import { cn } from "~/lib/utils";

// Update the type to match your database schema
interface ChamberProduct {
  id: number;
  name: string | null;
  type: string | null;
  info: string | null;
  capacity: string | null;
  ata: string | null;
  features: string | null;
  size_guide: string | null;
  warranty: string | null;
  certification: string | null;
  benefits: string | null;
  tech_dco: string | null;
  inclusion: string | null;
  who_for: string | null;
  images?: string[] | null;
}

interface ChamberQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  chamber: ChamberProduct | null;
}

export function ChamberQuickView({
  isOpen,
  onClose,
  chamber,
}: ChamberQuickViewProps) {
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  const imageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/chambers/";

  if (!chamber) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl overflow-hidden rounded-xl bg-transparent p-0">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white/60"
        >
          <X className="h-6 w-6 text-black" />
        </button>
        <div className="relative h-[80vh] w-full overflow-hidden rounded-xl">
          <Image
            src={`${imageUrl}${chamber.images?.[0] ?? `${chamber.id}_1`}.png`}
            alt={chamber.name ?? "Chamber"}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          <ScrollArea className="absolute inset-0 h-full">
            <div className="flex h-full flex-col p-8">
              <div className="space-y-12">
                <div className="relative py-8">
                  <div className="text-left">
                    <h2 className="font-['Raleway'] text-4xl font-bold text-white">
                      {chamber.name}
                    </h2>
                    <p className="mt-2 text-xl text-gray-300">{chamber.type}</p>
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link
                      href={`/chambers/${chamber.name?.toLowerCase().replace(/\s+/g, "-")}`}
                      className="w-64"
                    >
                      <GlowingButton
                        text="View Full Details"
                        className="w-full"
                      />
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <Users className="h-6 w-6 text-emerald-500" />
                    <p className="mt-2 text-sm text-gray-300">Capacity</p>
                    <p className="text-lg font-semibold text-white">
                      {chamber.capacity}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <Gauge className="h-6 w-6 text-emerald-500" />
                    <p className="mt-2 text-sm text-gray-300">Pressure</p>
                    <p className="text-lg font-semibold text-white">
                      {chamber.ata}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <Box className="h-6 w-6 text-emerald-500" />
                    <p className="mt-2 text-sm text-gray-300">Type</p>
                    <p className="text-lg font-semibold text-white">
                      {chamber.type}
                    </p>
                  </div>
                </div>

                {chamber.info && (
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">About</h3>
                    <p className="text-base leading-relaxed tracking-wide text-gray-300">
                      {chamber.info.split("\n\n")[0]}
                    </p>
                    <p className="text-base leading-relaxed tracking-wide text-gray-300">
                      {chamber.info.split("\n\n")[1]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
