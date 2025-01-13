import { Clock, MapPin, Phone,Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProviderCardProps {
  name: string;
  rating: number;
  reviewCount: number;
  location: string;
  categories: string[];
  nextAvailable: string;
  phone: string;
  hours: string;
  logoUrl: string;
}

export function ProviderCard({
  name,
  logoUrl,
  rating,
  reviewCount,
  location,
  categories,
  nextAvailable,
  phone,
  hours,
}: ProviderCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Banner Image with Verified Badge Overlay */}
      <div className="relative h-[180px] w-full overflow-hidden">
        <Image
          src={logoUrl}
          alt={`${name} banner`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
        {/* Verified Badge Overlay */}
        <div className="absolute left-6 top-6">
          <span className="rounded-md bg-white/90 px-3 py-1 text-sm font-medium shadow-sm backdrop-blur-sm">
            Verified
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Business Name & Rating */}
        <div className="mb-1 flex items-center justify-between">
          <span className="text-base font-semibold text-gray-900">{name}</span>
          <span className="text-sm text-gray-600">{reviewCount} reviews</span>
        </div>

        {/* Star Rating */}
        <div className="mb-3 flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={`star-${i}`}
              size={16}
              className={`${
                i < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              } drop-shadow-sm`}
            />
          ))}
          <span className="ml-1 text-base font-medium text-gray-900">
            {rating}
          </span>
        </div>

        {/* Location */}
        <div className="mb-4 flex items-center gap-1">
          <MapPin size={16} className="text-gray-500" />
          <span className="text-sm text-gray-600">{location}</span>
        </div>

        {/* Categories */}
        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Availability */}
        <div className="mb-2 flex items-center gap-2">
          <Clock size={16} className="text-gray-500" />
          <span className="text-sm text-gray-700">
            Next Available: {nextAvailable}
          </span>
        </div>

        {/* Contact */}
        <div className="mb-4 flex items-center gap-2">
          <Phone size={16} className="text-gray-500" />
          <span className="text-sm text-gray-700">{phone}</span>
        </div>

        {/* Hours */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">{hours}</p>
        </div>

        {/* Book Button */}
        <Link
          href="/book-consultation"
          className="block w-full rounded-lg bg-gray-900 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-gray-800 active:bg-gray-950"
        >
          Book Consultation
        </Link>
      </div>
    </div>
  );
}
