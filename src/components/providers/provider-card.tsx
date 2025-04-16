"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import type { Provider } from "~/types/providers";
import GlowingButton from "../utils/glowing-button";

interface ProviderCardProps {
  provider: Provider;
  onQuickView?: () => void;
}

export default function ProviderCard({
  provider,
  onQuickView,
}: ProviderCardProps) {
  // Use Google Photos if available, otherwise fall back to the default image
  const hasGooglePhotos =
    provider.googlePhotos &&
    Array.isArray(provider.googlePhotos) &&
    provider.googlePhotos.length > 0;

  return (
    <Card className="group relative h-full overflow-hidden bg-white transition-all hover:shadow-lg">
      {/* Photo Display with Overlay */}
      <div className="relative aspect-square w-full">
        {hasGooglePhotos ? (
          <div className="relative h-full w-full">
            <img
              src={provider.googlePhotos?.[0]}
              alt={`${provider.name}'s profile`}
              className="h-full w-full object-cover brightness-[0.85]"
            />
          </div>
        ) : (
          <div className="relative h-full w-full">
            <img
              src={provider.image}
              alt={provider.name}
              className="h-full w-full object-cover brightness-[0.85]"
            />
          </div>
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/60 to-transparent p-4">
          {/* Top Section */}
          <div>
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
              VERIFIED
            </span>
          </div>

          {/* Bottom Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-3xl font-semibold text-white">
                {provider.name}
              </h3>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={`provider-${provider.id}-star-${i}`}
                        className={`h-5 w-5 ${
                          i < (provider.googleRating ?? provider.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-300 text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-medium text-white">
                    {provider.googleRating?.toFixed(1) ??
                      provider.rating.toFixed(1)}
                  </span>
                  {provider.googleRatingsTotal && (
                    <span className="ml-1 text-sm text-gray-200">
                      ({provider.googleRatingsTotal} reviews)
                    </span>
                  )}
                </div>
              </div>
              <p className="mt-1 text-lg text-white">{provider.location}</p>
            </div>

            {/* Action Button */}
            <GlowingButton text="More Info" onClick={onQuickView} />
          </div>
        </div>
      </div>
    </Card>
  );
}
