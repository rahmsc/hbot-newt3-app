"use client";

import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { Bookmark, MapPin, Search, Star } from "lucide-react";
import { useCallback, useState } from "react";

import { providers } from "~/components/providers/provider-list";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import type { HyperbaricCenter } from "~/types/map";

const defaultCenter = { lat: -27.4705, lng: 153.026 }; // Brisbane coordinates

export default function HyperbaricLocator() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const [searchResults, setSearchResults] =
    useState<HyperbaricCenter[]>(providers);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] =
    useState<HyperbaricCenter | null>(null);

  // Calculate distance between two points
  const calculateDistance = useCallback(
    (point1: google.maps.LatLngLiteral, point2: google.maps.LatLngLiteral) => {
      const R = 6371; // Radius of the Earth in km
      const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
      const dLon = ((point2.lng - point1.lng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((point1.lat * Math.PI) / 180) *
          Math.cos((point2.lat * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in km
    },
    [],
  );

  // Handle search
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchQuery,
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
      );
      const data = (await response.json()) as {
        results: { geometry: { location: { lat: number; lng: number } } }[];
      };

      if (data.results?.[0]?.geometry?.location) {
        const newLocation = data.results[0].geometry.location;
        setCurrentLocation(newLocation);

        // Update distances and sort providers
        const resultsWithDistance = providers
          .map((provider) => ({
            ...provider,
            distance: calculateDistance(newLocation, {
              lat: provider.latitude,
              lng: provider.longitude,
            }),
          }))
          .sort((a, b) => (a.distance || 0) - (b.distance || 0));

        setSearchResults(resultsWithDistance as unknown as HyperbaricCenter[]);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, calculateDistance]);

  return (
    <div className="container mx-auto space-y-6 py-8">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative flex h-[calc(100vh-8rem)] w-full">
            {/* Side Panel */}
            <div className="h-full w-96 overflow-y-auto border-r bg-background p-6">
              {/* Search Section */}
              <div className="space-y-4">
                <h2 className="font-['Raleway'] text-xl font-medium">
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
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((position) => {
                          const newLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                          };
                          setCurrentLocation(newLocation);
                        });
                      }
                    }}
                    variant="outline"
                    size="icon"
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Results List */}
              <div className="mt-6 space-y-4">
                <h3 className="font-medium text-muted-foreground">
                  {searchResults.length} locations found
                  {searchQuery && !isLoading && (
                    <span className="block text-sm">near "{searchQuery}"</span>
                  )}
                </h3>
                <div className="space-y-4">
                  {searchResults.map((provider) => (
                    <Card
                      key={provider.id}
                      className="cursor-pointer overflow-hidden transition-colors hover:bg-accent"
                      onClick={() => {
                        setCurrentLocation({
                          lat: provider.latitude,
                          lng: provider.longitude,
                        });
                        setSelectedProvider(provider);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          {/* Provider Name and Rating */}
                          <div>
                            <h4 className="text-xl font-medium tracking-wide text-foreground">
                              {provider.name}
                            </h4>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="font-medium">
                                {provider.rating.toFixed(1)}
                              </span>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < provider.rating
                                        ? "fill-primary text-primary"
                                        : "fill-muted text-muted"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {provider.location}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <Button
                              variant="secondary"
                              size="sm"
                              asChild
                              onClick={(e) => e.stopPropagation()}
                            >
                              <a
                                href={provider.website}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Visit Website
                              </a>
                            </Button>
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
                                Get Directions
                              </a>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-auto"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add bookmark functionality here
                              }}
                            >
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Provider Details */}
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div>
                              <strong className="text-foreground">
                                Address:
                              </strong>{" "}
                              {provider.address}
                            </div>
                            <div>
                              <strong className="text-foreground">
                                Hours:
                              </strong>{" "}
                              {provider.hours}
                            </div>
                            <div>
                              <strong className="text-foreground">
                                Phone:
                              </strong>{" "}
                              <a
                                href={`tel:${provider.phone}`}
                                className="text-primary hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {provider.phone}
                              </a>
                            </div>
                            <div>
                              <strong className="text-foreground">
                                Type of Chamber:
                              </strong>{" "}
                              {provider.type}
                            </div>
                            <div>
                              <strong className="text-foreground">
                                Pressure Capacity:
                              </strong>{" "}
                              {provider.pressure}
                            </div>
                          </div>

                          {/* Book Consultation Button */}
                          <Button
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add booking functionality here
                            }}
                          >
                            Book Consultation
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="relative h-full flex-1">
              <LoadScript
                googleMapsApiKey={
                  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
                }
              >
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={currentLocation}
                  zoom={13}
                >
                  {searchResults.map((provider) => (
                    <Marker
                      key={provider.id}
                      position={{
                        lat: provider.latitude,
                        lng: provider.longitude,
                      }}
                      onClick={() => setSelectedProvider(provider)}
                    />
                  ))}
                  {selectedProvider && (
                    <InfoWindow
                      position={{
                        lat: selectedProvider.latitude,
                        lng: selectedProvider.longitude,
                      }}
                      onCloseClick={() => setSelectedProvider(null)}
                    >
                      <div className="min-w-[200px]">
                        <h3 className="font-semibold">
                          {selectedProvider.name}
                        </h3>
                        <p className="text-sm">{selectedProvider.address}</p>
                        {selectedProvider.phone && (
                          <p className="text-sm">
                            <a
                              href={`tel:${selectedProvider.phone}`}
                              className="text-primary hover:underline"
                            >
                              {selectedProvider.phone}
                            </a>
                          </p>
                        )}
                        {selectedProvider.distance && (
                          <p className="text-sm text-muted-foreground">
                            Distance: {selectedProvider.distance.toFixed(1)} km
                          </p>
                        )}
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
