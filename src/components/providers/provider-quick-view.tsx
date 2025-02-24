"use client";

import Image from "next/image";
import { Clock, MapPin, Phone, Star, X } from "lucide-react";
import type { Provider } from "~/types/providers";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import GlowingButton from "../utils/glowing-button";

interface ProviderQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  provider: Provider;
}

export function ProviderQuickView({
  isOpen,
  onClose,
  provider,
}: ProviderQuickViewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl overflow-hidden p-0">
        {/* <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 rounded-full p-2 text-gray-400 hover:text-gray-600"
          aria-label="Close dialog"
        >
          <X className="h-6 w-6" />
        </button> */}
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative h-64 w-full md:h-auto md:w-1/2">
            <Image
              src={provider.image || "/placeholder.svg"}
              alt={`${provider.name} image`}
              fill
              className="object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col gap-6 p-6">
            {/* Header */}
            <div>
              <span className="mb-2 inline-block rounded-full border border-[#2B5741] bg-gray-100 px-3 py-1 font-mono text-xs uppercase tracking-wide text-[#2B5741]">
                Verified
              </span>
              <h2 className="font-['Raleway'] text-4xl font-light tracking-wide text-gray-900">
                {provider.name}
              </h2>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="font-semibold text-gray-900">
                  {provider.rating.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500">
                  ({provider.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{provider.location}</span>
              </div>
              {provider.nextAvailable && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">
                    Next Available: {provider.nextAvailable}
                  </span>
                </div>
              )}
              {provider.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{provider.phone}</span>
                </div>
              )}
              {provider.hours && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{provider.hours}</span>
                </div>
              )}
            </div>

            {/* Specialties */}
            {provider.categories && (
              <div>
                <h3 className="mb-3 font-medium text-gray-900">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-[#2B5741] bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action */}
            <div className="mt-auto">
              <GlowingButton
                text="Visit Website"
                onClick={() => {
                  if (provider.website) {
                    window.open(provider.website, '_blank');
                  }
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
