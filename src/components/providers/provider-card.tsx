"use client"

import { Star } from "lucide-react"
import Image from "next/image"
import type { ProviderCardProps } from "~/types/providers"
import GlowingButton from "../utils/glowing-button"

export function ProviderCard({ name, rating, reviewCount, location, image, onQuickView }: ProviderCardProps) {
  // Split name into two parts for the header
  const [firstPart, ...rest] = name.split(" ")
  const remainingPart = rest.join(" ")

  return (
    <article className="relative h-[350px] sm:h-[400px] w-full overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-sm transition-shadow hover:shadow-md">
      {/* Background Image */}
      <Image
        src={image || "/placeholder.svg"}
        alt={`${name} image`}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 text-white">
        <div className="flex items-end justify-between">
          {/* Text Content (Bottom Left) */}
          <div>
            {/* Provider Name Header */}
            <h3 className="mb-2 font-['Raleway'] text-2xl sm:text-3xl font-light tracking-wide">
              {firstPart}
              {remainingPart && (
                <>
                  <br />
                  {remainingPart}
                </>
              )}
            </h3>

            {/* Rating */}
            <div className="mb-2 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold">{rating.toFixed(1)}</span>
              <span className="text-xs sm:text-sm text-gray-300">{reviewCount} reviews</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm">{location}</span>
            </div>
          </div>

          {/* Action Button (Bottom Right) */}
          <div>
            <GlowingButton text="More Info" onClick={onQuickView} className="text-sm sm:text-base" />
          </div>
        </div>
      </div>

      {/* Verified Badge */}
      <div className="absolute left-4 sm:left-6 top-4 sm:top-6">
        <span className="mb-2 inline-block rounded-full border border-emerald-700 bg-gray-100 px-2 sm:px-3 py-1 font-mono text-[10px] sm:text-xs uppercase tracking-wide text-emerald-700">
          Verified
        </span>
      </div>
    </article>
  )
}

