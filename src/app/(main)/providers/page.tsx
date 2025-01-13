import dynamic from "next/dynamic";

import { ProviderFilters } from "~/components/providers/provider-filters";
import { ProviderList } from "~/components/providers/provider-list";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

// Dynamically import the map component with SSR disabled
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
  return (
    <main className="container space-y-8 py-6">
      {/* Hero section */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Find Wellness Providers</h1>
        <p className="text-lg text-muted-foreground">
          Discover hyperbaric chambers and wellness providers in your area
        </p>
      </section>

      {/* Map section */}
      <section>
        <HyperbaricLocator />
      </section>

      {/* Providers filtering and listing section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">All Providers</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[300px,1fr]">
          <ProviderFilters />
          <ProviderList />
        </div>
      </section>
    </main>
  );
}
