"use client";

// import { HyperbaricCenter } from "~/types/map";
import { motion } from "framer-motion";
import { Bookmark, Clock, MapPin, Phone, Star } from "lucide-react";
import Image from "next/image";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import type { Provider } from "~/types/providers";

export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group overflow-hidden rounded-3xl border-2 border-gray-100 bg-white transition-all hover:border-emerald-100 hover:shadow-lg hover:shadow-emerald-500/10">
        <CardContent className="p-0">
          {/* Image Section */}
          <div className="relative h-64">
            <Image
              src={provider.image ?? "/images/providers/provider_1.png"}
              alt={provider.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            {/* Header Content */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-['Raleway'] text-3xl font-light tracking-wide text-white">
                {provider.name}
              </h3>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`star-${provider.id}-${i}`}
                      className={`h-5 w-5 ${
                        i < Math.floor(provider.rating ?? 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium text-white">
                  {(provider.rating ?? 0).toFixed(1)}
                </span>
                <span className="text-sm text-gray-300">
                  ({provider.reviewCount ?? 0} reviews)
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-gray-200">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{provider.location}</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6 p-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {provider.categories?.map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-[#2B5741]"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Details */}
            <div className="space-y-3 rounded-2xl bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-4 w-4 text-[#2B5741]" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Hours
                  </p>
                  <p className="text-sm text-gray-700">{provider.hours}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 text-[#2B5741]" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Phone
                  </p>
                  <p className="text-sm text-gray-700">{provider.phone}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3">
              <Button
                variant="default"
                size="lg"
                className="flex-1 bg-[#2B5741] hover:bg-emerald-800"
              >
                Book Now
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 border-2"
                aria-label="Save to bookmarks"
              >
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Update ProviderList to accept Provider type
export function ProviderList({ providers }: { providers: Provider[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {providers?.map((provider, index) => (
        <ProviderCard key={provider.id ?? index} provider={provider} />
      ))}
    </div>
  );
}
