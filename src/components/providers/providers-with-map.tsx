"use client";

import { useState } from "react";
import { ClientSideProviders } from "~/components/providers/client-providers";
import HyperbaricLocator from "~/components/map/hyperbaric-locator";
import { Button } from "~/components/ui/button";
import { MapIcon, ListIcon } from "lucide-react";
import type { Provider } from "~/types/providers";

interface ProvidersWithMapProps {
  initialProviders: Provider[];
}

export function ProvidersWithMap({ initialProviders }: ProvidersWithMapProps) {
  const [showMap, setShowMap] = useState(false);

  // Filter providers that have valid coordinates
  const providersWithCoordinates = initialProviders.filter(
    (provider) => provider.latitude && provider.longitude,
  );

  return (
    <div className="relative">
      <div className="mx-auto mb-6 mt-6 flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
        <Button
          onClick={() => setShowMap(!showMap)}
          className="flex items-center gap-2 bg-[#2B5741] text-white hover:bg-emerald-800"
        >
          {showMap ? (
            <>
              <ListIcon className="h-4 w-4" />
              View Provider List
            </>
          ) : (
            <>
              <MapIcon className="h-4 w-4" />
              View Provider Map ({providersWithCoordinates.length} locations)
            </>
          )}
        </Button>
      </div>

      {showMap ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <HyperbaricLocator providers={providersWithCoordinates} />
        </div>
      ) : (
        <ClientSideProviders initialProviders={initialProviders} />
      )}
    </div>
  );
}
