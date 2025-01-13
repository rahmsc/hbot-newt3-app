import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  type: string;
  maxPressure: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export default function ProductCard({
  title,
  type,
  maxPressure,
  description,
  features,
  imageUrl,
}: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative h-[240px]">
        <div className="absolute left-6 top-6 z-10">
          <span className="rounded-md bg-white/90 px-3 py-1 text-lg font-medium backdrop-blur-sm">
            {type}
          </span>
        </div>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-medium">{title}</h3>
        <div className="mb-3 flex items-center gap-1">
          <span className="text-sm text-gray-600">
            Max Pressure: {maxPressure}
          </span>
        </div>
        <p className="mb-4 text-sm text-gray-600">{description}</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs"
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <Link
            href="/learn-more"
            className="flex-1 rounded-lg bg-gray-100 py-3 text-center text-sm font-medium hover:bg-gray-200"
          >
            Learn More
          </Link>
          <Link
            href="/get-quote"
            className="flex-1 rounded-lg bg-gray-100 py-3 text-center text-sm font-medium hover:bg-gray-200"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
