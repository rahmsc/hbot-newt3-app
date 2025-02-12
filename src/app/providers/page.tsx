"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

import {
  type FilterValues,
  ProviderFilters,
} from "~/components/providers/provider-filters";
import { ProviderList, providers } from "~/components/providers/provider-list";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

const HyperbaricLocator = dynamic(
  () => import("~/components/map/hyperbaric-locator"),
  {
    ssr: false,
    loading: () => (
      <Card>
        <CardContent className="p-0">
          <div className="h-[400px] lg:h-[600px]">
            <Skeleton className="h-full w-full" />
          </div>
        </CardContent>
      </Card>
    ),
  },
);

export default function ProvidersPage() {
  const [filteredProviders, setFilteredProviders] = useState(providers);

  const handleFilterChange = (filters: FilterValues) => {
    const filtered = providers.filter((provider) => {
      const chamberTypeMatch =
        filters.chambers.length === 0 ||
        filters.chambers.includes(provider.type);
      const pressureMatch =
        filters.pressure.length === 0 ||
        filters.pressure.includes(provider.pressure);
      return chamberTypeMatch && pressureMatch;
    });
    setFilteredProviders(filtered);
  };
  return (
    <main className="bg-[#FAF7F4]">
      <div className="container mx-auto space-y-12 py-8">
        {/* Hero section */}
        <section className="space-y-4">
          <h1 className="font-['Raleway'] text-4xl font-medium tracking-[0.3em] text-gray-900">
            FIND WELLNESS PROVIDERS
          </h1>
          <p className="text-xl font-light text-gray-600">
            Discover hyperbaric chambers and wellness providers in your area
          </p>
        </section>

        {/* Map section */}
        <section>
          <HyperbaricLocator />
        </section>

        {/* Providers filtering and listing section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-['Raleway'] text-3xl font-medium tracking-[0.2em] text-gray-900">
              ALL PROVIDERS
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-[300px,1fr]">
            <ProviderFilters onFilterChange={handleFilterChange} />
            <ProviderList providers={filteredProviders} />
          </div>
        </section>
      </div>
    </main>
  );
}
