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

  // Using the same parsing logic as the chamber detail page
  const featureItems = chamber.features
    ? chamber.features
        .split("\n\n")
        .filter((block) => block.trim() !== "")
        .map((block) => {
          const lines = block.split("\n").filter((line) => line.trim() !== "");
          return {
            title: lines[0]?.trim() || "",
            description: lines.slice(1).join("\n").trim() || "",
          };
        })
    : [];

  // Get just the first feature
  const firstFeature = featureItems[0];
  // Check if there are additional features
  const hasMoreFeatures = featureItems.length > 1;

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
            <div className="flex h-full flex-col justify-between p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="font-['Raleway'] text-4xl font-bold text-white">
                    {chamber.name}
                  </h2>
                  <p className="mt-2 text-xl text-gray-300">{chamber.type}</p>
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
                {/* Chamber Description */}
                {chamber.info && (
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">About</h3>
                    <p className="text-sm leading-relaxed text-gray-300">
                      {chamber.info.split("\n\n")[0]}
                    </p>
                    <p className="text-sm leading-relaxed text-gray-300">
                      {chamber.info.split("\n\n")[1]}
                    </p>
                  </div>
                )}

                {/* Modified Features Section - Only First Feature */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">
                    Key Features
                  </h3>

                  {firstFeature && (
                    <div className="space-y-3">
                      <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 rounded-full bg-emerald-500/20 p-1.5">
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                          </div>
                          <div className="space-y-2">
                            <span className="text-sm font-medium text-gray-200">
                              {firstFeature.title}
                            </span>
                            {firstFeature.description && (
                              <p className="text-xs text-gray-300">
                                {firstFeature.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {hasMoreFeatures && (
                        <div className="rounded-lg bg-gradient-to-r from-emerald-500/20 to-transparent p-4">
                          <p className="text-sm text-gray-200">
                            <span className="font-medium text-emerald-400">
                              +{featureItems.length - 1} more features
                            </span>{" "}
                            available on the full details page
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Link
                  href={`/chambers/${chamber.name?.toLowerCase().replace(/\s+/g, "-")}`}
                  className="w-full"
                >
                  <GlowingButton
                    text="View Full Details"
                    className="w-full"
                    icon={
                      <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                    }
                  />
                </Link>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
