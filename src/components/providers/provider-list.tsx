"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ProviderCard from "./provider-card";
import { ProviderQuickView } from "./provider-quick-view";
import type { Provider } from "~/types/providers";
import { Button } from "~/components/ui/button";
import { fetchPlacePhotos } from "~/actions/fetch-place-photos";

export function ProviderList({ providers }: { providers: Provider[] }) {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [testingProvider, setTestingProvider] = useState<string | null>(null);

  const handleQuickView = (provider: Provider) => {
    setSelectedProvider(provider);
    setIsQuickViewOpen(true);
  };

  const testGooglePhotos = async (provider: Provider) => {
    setTestingProvider(provider.id);
    try {
      console.log(`Testing Google Photos API for: ${provider.name}`);
      console.log(`Provider address: ${provider.address}`);

      const updatedProvider = await fetchPlacePhotos(provider);

      console.log("Google Place ID:", updatedProvider.placeId ?? "Not found");
      console.log(
        "Google Photos found:",
        updatedProvider.googlePhotos?.length ?? 0,
      );

      if (updatedProvider.googlePhotos?.length) {
        console.log("First photo URL:", updatedProvider.googlePhotos[0]);
        console.log("All photo URLs:", updatedProvider.googlePhotos);
      } else {
        console.log("No photos found for this provider");
      }

      // Check if we got any meaningful data back from the API
      if (updatedProvider.placeId) {
        console.log("✅ Successfully found the business in Google Places API");
      } else {
        console.log("❌ Could not match this business in Google Places API");
      }
    } catch (error) {
      console.error("Error testing Google Photos:", error);
    } finally {
      setTestingProvider(null);
    }
  };

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {providers?.map((provider) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProviderCard
              provider={provider}
              onQuickView={() => handleQuickView(provider)}
            />
            <Button
              onClick={() => testGooglePhotos(provider)}
              variant="outline"
              size="sm"
              className="mt-2 w-full"
              disabled={testingProvider === provider.id}
            >
              {testingProvider === provider.id
                ? "Loading Photos..."
                : "Test Google Photos"}
            </Button>
          </motion.div>
        ))}
      </div>

      {selectedProvider && (
        <ProviderQuickView
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
          provider={selectedProvider}
        />
      )}
    </>
  );
}
