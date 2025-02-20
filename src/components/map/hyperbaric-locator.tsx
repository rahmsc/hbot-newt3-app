"use client";

import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { Bookmark, MapPin, Search, Star } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import type { HyperbaricCenter } from "~/types/map";
import type { ProviderProps } from "~/types/providers";
import Link from "next/link";
import { SAMPLE_PROVIDERS } from "~/components/landing/sections/providers-section";
import { defaultMapCenter } from "~/data/providers";

export default function HyperbaricLocator() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLocation, setCurrentLocation] = useState(defaultMapCenter);
  const [searchResults, setSearchResults] = useState(SAMPLE_PROVIDERS);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<
    HyperbaricCenter | ProviderProps | null
  >(null);

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
    const filteredProviders = SAMPLE_PROVIDERS.filter((provider) =>
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredProviders);
    
    // If there are results, center the map on the first result
    if (filteredProviders.length > 0) {
      setCurrentLocation({
        lat: filteredProviders[0]?.latitude ?? 0,
        lng: filteredProviders[0]?.longitude ?? 0,
        zoom: 12,
      });
    }
    
    setIsLoading(false);
  }, [searchQuery]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative flex h-[calc(100vh-8rem)] w-full">
          {/* Side Panel */}
          <div className="h-full w-96 overflow-y-auto border-r bg-white p-6">
            {/* Search Section */}
            <div className="space-y-4">
            <Link href="/providers/submit" className="block">
                    <Button 
                      className="w-full bg-[#2B5741] text-white hover:bg-emerald-800 h-auto py-3 text-base font-semibold"
                    >
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
                  <Search className="h-4 w-4" />
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
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
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
                {searchResults.map((provider) => (
                  <Card
                    key={provider.id}
                    className="cursor-pointer overflow-hidden transition-colors hover:bg-gray-50"
                    onClick={() => {
                      setCurrentLocation({
                        lat: provider.latitude,
                        lng: provider.longitude,
                        zoom: 12, // Assuming a default zoom level of 12
                      });
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
                              {provider.rating.toFixed(1)}
                            </span>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < provider.rating
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
                        <div className="space-y-2 text-sm text-gray-600">
                          <div>
                            <strong className="text-gray-900">Address:</strong>{" "}
                            {provider.address}
                          </div>
                          <div>
                            <strong className="text-gray-900">Hours:</strong>{" "}
                            {provider.hours}
                          </div>
                          <div>
                            <strong className="text-gray-900">Phone:</strong>{" "}
                            <a
                              href={`tel:${provider.phone}`}
                              className="text-[#2B5741] hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {provider.phone}
                            </a>
                          </div>
                          <div>
                            <strong className="text-gray-900">
                              Type of Chamber:
                            </strong>{" "}
                            {provider.type}
                          </div>
                          <div>
                            <strong className="text-gray-900">
                              Pressure Capacity:
                            </strong>{" "}
                            {provider.pressure}
                          </div>
                        </div>

                        {/* Book Consultation Button */}
                        <Button
                          className="w-full bg-[#2B5741] text-white hover:bg-[#1e3d2d]"
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
                process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""
              }
            >
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={currentLocation}
                zoom={defaultMapCenter.zoom}
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
                      <h3 className="font-['Raleway'] text-lg font-medium text-gray-900">
                        {selectedProvider.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {selectedProvider.address}
                      </p>
                      {selectedProvider.phone && (
                        <p className="text-sm">
                          <a
                            href={`tel:${selectedProvider.phone}`}
                            className="text-[#2B5741] hover:underline"
                          >
                            {selectedProvider.phone}
                          </a>
                        </p>
                      )}
                      {"distance" in selectedProvider &&
                        selectedProvider.distance !== undefined && (
                          <p className="text-sm text-gray-600">
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
  );
}
