import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone, Star } from "lucide-react";

export interface ProviderCardProps {
  name: string;
  rating: number;
  reviewCount: number;
  location: string;
  categories: string[];
  nextAvailable: string;
  phone: string;
  hours: string;
  image: string;
  onQuickView?: () => void;
}

export function ProviderCard({
  name,
  rating,
  reviewCount,
  location,
  categories,
  nextAvailable,
  phone,
  hours,
  image,
  onQuickView,
}: ProviderCardProps) {
  // Split name into two parts for the header
  const [firstPart, ...rest] = name.split(" ");
  const remainingPart = rest.join(" ");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[32px] bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image Container */}
      <div className="relative h-48 w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={`${name} image`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60" />
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-900">
            Verified
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Provider Name Header */}
        <div className="mb-4">
          <h3 className="font-['Raleway'] text-3xl font-light tracking-wide text-gray-900">
            {firstPart}
            {remainingPart && (
              <>
                <br />
                {remainingPart}
              </>
            )}
          </h3>
        </div>

        {/* Rating */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="font-semibold text-gray-900">
            {rating.toFixed(1)}
          </span>
          <span className="text-sm text-gray-500">{reviewCount} reviews</span>
        </div>

        {/* Location */}
        <div className="mb-4 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">{location}</span>
        </div>

        {/* Categories */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Info Lines */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              Next Available: {nextAvailable}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{hours}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={onQuickView}
            className="flex-1 rounded-full bg-gray-100 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200"
          >
            Quick View
          </button>
          <Link
            href={`/book-consultation?provider=${encodeURIComponent(name)}`}
            className="flex-1 rounded-full bg-gray-900 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
