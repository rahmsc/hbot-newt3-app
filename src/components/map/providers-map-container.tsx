/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { useState, useEffect } from "react";
import MapComponent from "./map";
import { getMapProviders } from "~/actions/map-providers";
import type { Provider } from "~/types/providers";
import type { HyperbaricCenter } from "~/types/map";

const defaultCenter: [number, number] = [51.5074, -0.1278]; // London as default

export default function ProvidersMapContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [centers, setCenters] = useState<HyperbaricCenter[]>([]);

  useEffect(() => {
    async function loadProviders() {
      try {
        setIsLoading(true);
        const providers = await getMapProviders();

        // Convert Provider[] to HyperbaricCenter[]
        const mappedCenters = providers
          .filter(
            (p) =>
              typeof p.latitude === "number" && typeof p.longitude === "number",
          ) // Only include providers with valid coordinates
          .map(providerToCenter);

        setCenters(mappedCenters);

        if (mappedCenters.length === 0) {
          setError("No providers found with valid location data.");
        }
      } catch (err) {
        console.error("Error loading providers:", err);
        setError("Failed to load providers. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProviders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#2B5741]" />
          <p className="mt-4 text-gray-600">Loading providers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded bg-[#2B5741] px-4 py-2 text-white hover:bg-[#1e3d2d]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // If we have centers, initialize the map with first provider or default center
  const initialCenter: [number, number] =
    centers.length > 0
      ? [centers[0].latitude, centers[0].longitude]
      : defaultCenter;

  return <MapComponent center={initialCenter} zoom={10} centers={centers} />;
}

// Helper function to convert a Provider to a HyperbaricCenter
function providerToCenter(provider: Provider): HyperbaricCenter {
  return {
    id: provider.id,
    name: provider.name,
    rating: provider.rating,
    location: provider.location,
    address: provider.address ?? "",
    hours: provider.hours ?? "Hours not specified",
    phone: provider.phone ?? "",
    type: provider.type ?? "",
    pressure: provider.pressure ?? "",
    website: provider.website ?? "",
    directions: provider.directions ?? "",
    latitude: provider.latitude ?? 0,
    longitude: provider.longitude ?? 0,
    position: [provider.latitude ?? 0, provider.longitude ?? 0],
  };
}
