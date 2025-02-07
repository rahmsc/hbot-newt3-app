import Image from "next/image";
import Link from "next/link";
import { Clock, Package, DollarSign, Star } from "lucide-react";

export interface WellnessProductCardProps {
  image: string;
  publisher: string;
  title: string;
  description: string;
  productUrl: string;
  price?: number;
  servings?: string;
  rating?: number;
  reviewCount?: number;
}

export function WellnessProductCard({
  image,
  publisher,
  title,
  description,
  productUrl,
  price,
  servings,
  rating,
  reviewCount,
}: WellnessProductCardProps) {
  // Split title into two parts for the header
  const [firstPart, ...rest] = title.split(" ");
  const remainingPart = rest.join(" ");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[32px] bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image Container */}
      <div className="relative h-48 w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={`${title} image`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60" />
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-900">
            {publisher}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Product Name Header */}
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
        {rating && reviewCount && (
          <div className="mb-4 flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-gray-900">
              {rating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">{reviewCount} reviews</span>
          </div>
        )}

        {/* Description */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">{description}</span>
        </div>

        {/* Info Lines */}
        <div className="mb-6 space-y-3">
          {price && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">${price.toFixed(2)}</span>
            </div>
          )}
          {servings && (
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{servings} servings</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          <Link
            href={productUrl}
            className="flex-1 rounded-full bg-gray-100 py-3 text-center text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200"
          >
            View Product
          </Link>
          <Link
            href={`${productUrl}#buy`}
            className="flex-1 rounded-full bg-gray-900 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </article>
  );
}
