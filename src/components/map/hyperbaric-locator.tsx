"use client";

import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { MapPin, Search, Star, Loader2 } from "lucide-react";
import { useCallback, useState, useEffect } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import type { Provider } from "~/types/providers";
import Link from "next/link";
import { defaultMapCenter } from "~/data/providers";

interface HyperbaricLocatorProps {
  providers?: Provider[];
}

/**
 * Ensures coordinate is a valid number for the map
 */
function parseCoordinate(value: number | string | null | undefined): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

export default function HyperbaricLocator({
  providers = [],
}: HyperbaricLocatorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLocation, setCurrentLocation] = useState({
    ...defaultMapCenter,
  });
  const [searchResults, setSearchResults] = useState<Provider[]>(providers);
  const [isLoading, setIsLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );

  // Initialize search results with providers when component mounts
  useEffect(() => {
    console.log("HyperbaricLocator received providers:", providers.length);

    // Log each provider's coordinates
    providers.forEach((provider, index) => {
      // Ensure coordinates are parsed as numbers
      const latitude = parseCoordinate(provider.latitude);
      const longitude = parseCoordinate(provider.longitude);

      console.log(`Provider ${index + 1} in component:`, {
        id: provider.id,
        name: provider.name,
        raw_latitude: provider.latitude,
        raw_longitude: provider.longitude,
        parsed_latitude: latitude,
        parsed_longitude: longitude,
        hasValidCoords:
          Math.abs(latitude) > 0.001 || Math.abs(longitude) > 0.001,
      });
    });

    setSearchResults(providers);

    // No need to center on first provider - default to Australia-wide view
    // Use the defaultMapCenter for Australia as defined in providers.ts
  }, [providers]);

  const calculateDistance = useCallback(
    (lat1: number, lon1: number, lat2: number, lon2: number): number => {
      const R = 6371; // Radius of the earth in km
      const dLat = ((lat2 - lat1) * Math.PI) / 180; // deg2rad below
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in km
      return d;
    },
    [],
  );

  const handleSearch = useCallback(() => {
    setIsLoading(true);
    const filteredProviders = providers.filter(
      (provider) =>
        provider.name?.toLowerCase().includes(searchQuery.toLowerCase()) ??
        provider.address?.toLowerCase().includes(searchQuery.toLowerCase()) ??
        provider.location?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setSearchResults(filteredProviders);

    // If there are results, center the map on the first result
    if (
      filteredProviders.length > 0 &&
      filteredProviders[0]?.latitude &&
      filteredProviders[0]?.longitude
    ) {
      setCurrentLocation({
        lat: filteredProviders[0].latitude,
        lng: filteredProviders[0].longitude,
        zoom: 12,
      });
    }

    setIsLoading(false);
  }, [searchQuery, providers]);

  // Safe way to get marker animation that works with SSR
  const getMarkerAnimation = useCallback(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    // Only access window.google after confirming we're in browser context
    try {
      return window.google?.maps?.Animation?.DROP;
    } catch (error) {
      return undefined;
    }
  }, []);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative flex h-[calc(100vh-8rem)] w-full">
          {/* Side Panel */}
          <div className="h-full w-96 overflow-y-auto border-r bg-white p-6">
            {/* Search Section */}
            <div className="space-y-4">
              <Link href="/providers/submit" className="block">
                <Button className="h-auto w-full bg-[#2B5741] py-3 text-base font-semibold text-white hover:bg-emerald-800">
                  Submit Your Business
                </Button>
              </Link>
              <h2 className="font-['Raleway'] text-xl font-medium tracking-wide text-gray-900">
                Find HBOT Providers
              </h2>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter address or postcode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full"
                />
                <Button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="bg-[#2B5741] text-white hover:bg-[#1e3d2d]"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition((position) => {
                        const newLocation = {
                          lat: position.coords.latitude,
                          lng: position.coords.longitude,
                          zoom: 12,
                        };
                        setCurrentLocation(newLocation);
                      });
                    }
                  }}
                  variant="outline"
                  size="icon"
                  title="Use my location"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>

              {/* View All Australia button */}
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full"
                onClick={() => setCurrentLocation(defaultMapCenter)}
              >
                View All Australia
              </Button>
            </div>

            {/* Results List */}
            <div className="mt-6 space-y-4">
              <h3 className="font-['Raleway'] text-lg font-medium text-gray-900">
                {searchResults.length} locations found
                {searchQuery && !isLoading && (
                  <span className="block text-sm text-gray-600">
                    near &quot;{searchQuery}&quot;
                  </span>
                )}
              </h3>
              <div className="space-y-4">
                {searchResults.map((provider) => {
                  console.log(
                    `Attempting to render marker for provider ${provider.id}: lat=${provider.latitude}, lng=${provider.longitude}`,
                  );

                  if (!provider.latitude || !provider.longitude) {
                    console.log(
                      `Provider ${provider.id} missing coordinates, skipping marker`,
                    );
                    return null;
                  }

                  // Check for near-zero coordinates
                  if (
                    Math.abs(provider.latitude) < 0.001 &&
                    Math.abs(provider.longitude) < 0.001
                  ) {
                    console.log(
                      `Provider ${provider.id} has near-zero coordinates, skipping marker`,
                    );
                    return null;
                  }

                  console.log(
                    `Rendering marker for ${provider.name} at ${provider.latitude}, ${provider.longitude}`,
                  );

                  return (
                    <Card
                      key={provider.id}
                      className="cursor-pointer overflow-hidden transition-colors hover:bg-gray-50"
                      onClick={() => {
                        if (provider.latitude && provider.longitude) {
                          setCurrentLocation({
                            lat: provider.latitude,
                            lng: provider.longitude,
                            zoom: 12,
                          });
                        }
                        setSelectedProvider(provider);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          {/* Provider Name and Rating */}
                          <div>
                            <h4 className="font-['Raleway'] text-xl font-medium tracking-wide text-gray-900">
                              {provider.name}
                            </h4>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="font-medium text-gray-700">
                                {provider.rating?.toFixed(1) ?? "N/A"}
                              </span>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={`provider-${provider.id}-star-${i}`}
                                    className={`h-4 w-4 ${
                                      i < (provider.rating ?? 0)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-gray-300 text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {provider.location}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            {provider.website && (
                              <Button
                                variant="secondary"
                                size="sm"
                                asChild
                                onClick={(e) => e.stopPropagation()}
                                className="bg-[#2B5741] text-white hover:bg-[#1e3d2d]"
                              >
                                <a
                                  href={provider.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Visit Website
                                </a>
                              </Button>
                            )}
                            {provider.directions && (
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                onClick={(e) => e.stopPropagation()}
                              >
                                <a
                                  href={provider.directions}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Directions
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="flex-1">
            <LoadScript
              googleMapsApiKey={
                process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""
              }
              onLoad={() => {
                setMapLoaded(true);
                console.log("Google Maps script loaded");
              }}
            >
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={{ lat: currentLocation.lat, lng: currentLocation.lng }}
                zoom={currentLocation.zoom}
                options={{
                  styles: [
                    {
                      featureType: "poi",
                      elementType: "labels",
                      stylers: [{ visibility: "off" }],
                    },
                  ],
                  zoomControl: true,
                  streetViewControl: true,
                  mapTypeControl: true,
                  fullscreenControl: true,
                  gestureHandling: "greedy", // Allow more aggressive zoom
                  restriction: {
                    latLngBounds: {
                      north: 0, // Approximate boundaries for Australia
                      south: -45,
                      east: 155,
                      west: 110,
                    },
                    strictBounds: false,
                  },
                }}
                onLoad={() => {
                  console.log("Map rendered with center:", currentLocation);
                  console.log(
                    `Ready to display ${
                      searchResults.filter((p) => {
                        const lat = parseCoordinate(p.latitude);
                        const lng = parseCoordinate(p.longitude);
                        return Math.abs(lat) > 0.001 || Math.abs(lng) > 0.001;
                      }).length
                    } providers with valid coordinates`,
                  );
                }}
              >
                {/* Place markers for each provider */}
                {searchResults.map((provider) => {
                  // Parse coordinates to ensure they're numbers
                  const latitude = parseCoordinate(provider.latitude);
                  const longitude = parseCoordinate(provider.longitude);

                  console.log(
                    `Attempting to render marker for provider ${provider.id}: lat=${latitude}, lng=${longitude}`,
                  );

                  // Skip providers without valid coordinates
                  if (
                    Math.abs(latitude) < 0.001 &&
                    Math.abs(longitude) < 0.001
                  ) {
                    console.log(
                      `Provider ${provider.id} has near-zero coordinates, skipping marker`,
                    );
                    return null;
                  }

                  console.log(
                    `Rendering marker for ${provider.name} at ${latitude}, ${longitude}`,
                  );

                  return (
                    <Marker
                      key={provider.id}
                      position={{
                        lat: latitude,
                        lng: longitude,
                      }}
                      onClick={() => setSelectedProvider(provider)}
                      title={provider.name}
                      animation={
                        typeof window !== "undefined" && window.google
                          ? window.google.maps.Animation.DROP
                          : undefined
                      }
                    />
                  );
                })}

                {/* Info window for selected provider */}
                {selectedProvider && typeof window !== "undefined" && (
                  <InfoWindow
                    position={{
                      lat: parseCoordinate(selectedProvider.latitude),
                      lng: parseCoordinate(selectedProvider.longitude),
                    }}
                    onCloseClick={() => setSelectedProvider(null)}
                  >
                    <div className="max-w-xs space-y-3 p-1">
                      <h3 className="font-['Raleway'] text-lg font-medium tracking-wide text-gray-900">
                        {selectedProvider.name}
                      </h3>
                      <p className="text-sm text-gray-700">
                        {selectedProvider.address}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700">
                          {selectedProvider.rating?.toFixed(1) ?? "N/A"}
                        </span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={`selected-provider-${selectedProvider.id}-star-${i}`}
                              className={`h-3 w-3 ${
                                i < (selectedProvider.rating ?? 0)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-300 text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {selectedProvider.website && (
                          <Button
                            size="sm"
                            variant="secondary"
                            asChild
                            className="h-8 text-xs"
                          >
                            <a
                              href={selectedProvider.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Website
                            </a>
                          </Button>
                        )}
                        {selectedProvider.directions && (
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="h-8 text-xs"
                          >
                            <a
                              href={selectedProvider.directions}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Directions
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
