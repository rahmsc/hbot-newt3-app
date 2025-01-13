import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { ProviderCard } from "../providers/provider-card";

const SAMPLE_PROVIDERS = [
  {
    name: "Feel Good Nation",
    rating: 5.0,
    reviewCount: 246,
    location: "Sydney, Australia",
    categories: ["Wellness", "Recovery", "Neurological"],
    nextAvailable: "Today",
    phone: "0434 567 890",
    hours: "Mon - Sun: 7am - 9pm",
    logoUrl: "https://picsum.photos/id/50/200/282",
  },
  {
    name: "Vitality HBOT Center",
    rating: 4.9,
    reviewCount: 189,
    location: "Melbourne, Australia",
    categories: ["Wellness", "Sports Recovery", "Medical"],
    nextAvailable: "Today",
    phone: "0456 789 123",
    hours: "Mon - Sat: 8am - 8pm",
    logoUrl: "https://picsum.photos/id/49/200/280",
  },
  {
    name: "OxygenPlus Therapy",
    rating: 5.0,
    reviewCount: 173,
    location: "Brisbane, Australia",
    categories: ["Recovery", "Neurological", "Anti-Aging"],
    nextAvailable: "Tomorrow",
    phone: "0467 234 567",
    hours: "Mon - Sun: 6am - 7pm",
    logoUrl: "https://picsum.photos/id/230/200/300",
  },
];

export default function ProvidersSection() {
  return (
    <section className="w-full bg-white">
      <div className="container mx-auto px-4 py-24">
        <div className="mb-12">
          <div className="mb-8 flex items-center justify-between">
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-bold text-gray-900">
                Verified HBOT Providers
              </h2>
              <p className="font-sans text-lg text-gray-600">
                Discover leading hyperbaric oxygen therapy providers in your
                area
              </p>
            </div>
            <Link
              href="/providers"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              See all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_PROVIDERS.map((provider, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <ProviderCard key={index} {...provider} />
          ))}
        </div>
      </div>
    </section>
  );
}
