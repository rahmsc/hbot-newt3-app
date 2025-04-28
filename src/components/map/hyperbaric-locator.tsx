"use client";

import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { MapPin, Search, Star, Loader2, Clock } from "lucide-react";
import { useCallback, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import type { Provider } from "~/types/providers";
import { defaultMapCenter } from "~/data/providers";
import { fetchPlacePhotos } from "~/actions/fetch-place-photos";

interface HyperbaricLocatorProps {
  providers?: Provider[];
}

// Libraries needed for Google Maps API
const googleMapsLibraries: "places"[] = ["places"];

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

/**
 * Format provider hours in a readable way, handling both string and JSON object formats
 */
function formatHours(hours: unknown): string | null {
  if (!hours) return null;

  // If hours is already a string, return it
  if (typeof hours === "string") {
    // Try to parse as JSON in case it's a stringified object
    try {
      const parsedHours = JSON.parse(hours);
      if (typeof parsedHours === "object" && parsedHours !== null) {
        // Format the parsed object
        return formatHoursObject(
          parsedHours as Record<
            string,
            { isOpen?: boolean; openTime?: string; closeTime?: string }
          >,
        );
      }
      // If parsing succeeded but it's not an object we can format, return the original string
      return hours;
    } catch (e) {
      // Not JSON, return the original string
      return hours;
    }
  }

  // If hours is an object, try to format it directly
  if (typeof hours === "object" && hours !== null) {
    return formatHoursObject(
      hours as Record<
        string,
        { isOpen?: boolean; openTime?: string; closeTime?: string }
      >,
    );
  }

  return String(hours);
}

/**
 * Format an hours object (with days) into a readable string
 */
function formatHoursObject(
  hoursObj: Record<
    string,
    { isOpen?: boolean; openTime?: string; closeTime?: string }
  >,
): string {
  const formattedHours: string[] = [];

  // Days of week in order - weekdays first, then weekend days
  const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const weekendDays = ["saturday", "sunday"];

  // Process weekdays (Monday-Friday)
  let weekdayGroup: { days: string[]; hours: string } | null = null;

  for (const day of weekdays) {
    const dayInfo = hoursObj[day];

    if (!dayInfo?.isOpen) {
      // Handle day when closed
      if (weekdayGroup) {
        // Add the previous group to our results
        formattedHours.push(formatDayGroup(weekdayGroup));
        weekdayGroup = null;
      }
      continue;
    }

    const dayHours = `${dayInfo.openTime ?? "00:00"} - ${dayInfo.closeTime ?? "00:00"}`;

    if (!weekdayGroup) {
      // Start a new group
      weekdayGroup = { days: [day], hours: dayHours };
    } else if (weekdayGroup.hours === dayHours) {
      // Same hours as current group, add to it
      weekdayGroup.days.push(day);
    } else {
      // Different hours, finish current group and start a new one
      formattedHours.push(formatDayGroup(weekdayGroup));
      weekdayGroup = { days: [day], hours: dayHours };
    }
  }

  // Add the last weekday group if it exists
  if (weekdayGroup) {
    formattedHours.push(formatDayGroup(weekdayGroup));
  }

  // Process weekend days (Saturday and Sunday) separately
  for (const day of weekendDays) {
    const dayInfo = hoursObj[day];

    if (dayInfo?.isOpen) {
      const dayHours = `${dayInfo.openTime ?? "00:00"} - ${dayInfo.closeTime ?? "00:00"}`;
      formattedHours.push(formatDayGroup({ days: [day], hours: dayHours }));
    }
  }

  // Join with line breaks instead of semicolons
  return formattedHours.join("\n");
}

/**
 * Format a group of days with the same hours
 */
function formatDayGroup(group: { days: string[]; hours: string }): string {
  const { days, hours } = group;

  // Capitalize first letter of day
  const formattedDays = days.map(
    (day) => day.charAt(0).toUpperCase() + day.slice(1),
  );

  // Format the day range
  let dayRange: string;
  if (days.length === 1) {
    dayRange = formattedDays[0];
  } else if (days.length === 7) {
    dayRange = "Every day";
  } else {
    dayRange = `${formattedDays[0]} - ${formattedDays[formattedDays.length - 1]}`;
  }

  return `${dayRange}: ${hours}`;
}

/**
 * Helper component for rendering provider images
 */
function ProviderImages({
  provider,
  compact = false,
}: {
  provider: Provider;
  compact?: boolean;
}) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Reset error state when provider changes
    setImageError(false);
  }, []);

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
  };

  // In compact mode, display only the first image regardless of source
  if (compact) {
    const imageSource = provider.googlePhotos?.length
      ? provider.googlePhotos[0]
      : provider.image || "/images/providers/provider_1.png";

    return (
      <div className="overflow-hidden rounded-md">
        <div className="relative h-32 w-full">
          {!imageError ? (
            <Image
              src={imageSource}
              alt={provider.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
              onError={handleImageError}
            />
          ) : (
            // Ultimate fallback if image fails to load
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
              <span className="text-sm text-gray-500">No image available</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // If we have Google photos, display them in a carousel
  if (provider.googlePhotos && provider.googlePhotos.length > 0) {
    return (
      <Carousel className="w-full max-w-sm">
        <CarouselContent>
          {provider.googlePhotos.map((photo, index) => (
            <CarouselItem key={`photo-${provider.id}-${index}`}>
              <div className="p-1">
                <Card className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={photo}
                      alt={`${provider.name} photo ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 300px"
                      onError={handleImageError}
                    />
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    );
  }

  // No Google photos, try fallback image
  return (
    <div className="overflow-hidden rounded-md">
      <div className="relative h-40 w-full">
        {!imageError ? (
          <Image
            src={provider.image || "/images/providers/provider_1.png"}
            alt={provider.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
            onError={handleImageError}
          />
        ) : (
          // Ultimate fallback if both Google photos and provider image fail
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <span className="text-sm text-gray-500">No image available</span>
          </div>
        )}
      </div>
    </div>
  );
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
  const [searchedLocation, setSearchedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Refs for Google Maps objects
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  // Initialize search results with providers when component mounts
  useEffect(() => {
    setSearchResults(providers);

    // Initialize geocoder when Maps API is loaded
    if (typeof google !== "undefined" && google.maps) {
      geocoderRef.current = new google.maps.Geocoder();
    }
  }, [providers]);

  // Fetch Google photos for all providers in search results
  useEffect(() => {
    // Only run if we have search results and the map is loaded
    if (searchResults.length > 0 && mapLoaded) {
      const fetchPhotosForProviders = async () => {
        // Create a new array to hold updated providers
        const updatedResults = [...searchResults];
        let hasUpdates = false;

        // Process providers in batches to avoid too many simultaneous requests
        const batchSize = 3;
        for (
          let i = 0;
          i < Math.min(10, searchResults.length);
          i += batchSize
        ) {
          const batch = searchResults.slice(i, i + batchSize);

          // Process each provider in the batch
          const batchPromises = batch.map(async (provider, batchIndex) => {
            const index = i + batchIndex;

            // Only fetch if provider has valid coordinates and no photos yet
            const hasValidCoords =
              Math.abs(parseCoordinate(provider.latitude)) > 0.001 ||
              Math.abs(parseCoordinate(provider.longitude)) > 0.001;

            if (hasValidCoords && !provider.googlePhotos) {
              try {
                const updatedProvider = await fetchPlacePhotos(provider);
                if (updatedProvider.googlePhotos?.length) {
                  updatedResults[index] = updatedProvider;
                  hasUpdates = true;
                  return true;
                }
              } catch (error) {
                // Error handling
              }
            }
            return false;
          });

          // Wait for batch to complete
          await Promise.all(batchPromises);
        }

        // Update state only if we have changes
        if (hasUpdates) {
          setSearchResults(updatedResults);
        }
      };

      fetchPhotosForProviders();
    }
  }, [searchResults, mapLoaded]);

  // Initialize geocoder when Maps API is fully loaded
  useEffect(() => {
    if (mapLoaded && typeof google !== "undefined" && google.maps) {
      geocoderRef.current = new google.maps.Geocoder();
    }
  }, [mapLoaded]);

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

  // Geocode an address to coordinates
  const geocodeAddress = useCallback(async (address: string) => {
    if (!geocoderRef.current) {
      if (typeof google !== "undefined" && google.maps) {
        geocoderRef.current = new google.maps.Geocoder();
      } else {
        return null;
      }
    }

    try {
      const response = await geocoderRef.current.geocode({
        address,
        region: "au", // Bias results to Australia
      });

      if (response.results?.length > 0) {
        const { lat, lng } = response.results[0].geometry.location.toJSON();
        return { lat, lng };
      }
    } catch (error) {
      // Error handling
    }

    return null;
  }, []);

  // Handle place selection from autocomplete
  const handlePlaceSelect = useCallback(() => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    if (!place.geometry?.location) return;

    const location = place.geometry.location.toJSON();
    setSearchedLocation(location);
    setCurrentLocation({
      lat: location.lat,
      lng: location.lng,
      zoom: 14,
    });

    // Sort providers by distance to this location
    const providersWithValidCoords = providers.filter((provider) => {
      const lat = parseCoordinate(provider.latitude);
      const lng = parseCoordinate(provider.longitude);
      return Math.abs(lat) > 0.001 || Math.abs(lng) > 0.001;
    });

    const providersWithDistance = providersWithValidCoords.map((provider) => {
      const lat = parseCoordinate(provider.latitude);
      const lng = parseCoordinate(provider.longitude);
      const distance = calculateDistance(location.lat, location.lng, lat, lng);
      return { ...provider, distance };
    });

    // Sort by distance
    const sortedProviders = [...providersWithDistance].sort(
      (a, b) =>
        (a.distance ?? Number.POSITIVE_INFINITY) -
        (b.distance ?? Number.POSITIVE_INFINITY),
    );

    setSearchResults(sortedProviders);
    setSearchQuery(place.formatted_address ?? "");
  }, [providers, calculateDistance]);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);

    try {
      // If the search query is empty, reset to show all providers
      if (!searchQuery || searchQuery.trim() === "") {
        setSearchResults(providers);
        setCurrentLocation(defaultMapCenter);
        setSearchedLocation(null);
        setIsLoading(false);
        return;
      }

      // First, try to match by name/address as text
      const textMatchedProviders = providers.filter(
        (provider) =>
          provider.name?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          provider.address?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          provider.location?.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      // If we found providers by text search, use those
      if (textMatchedProviders.length > 0) {
        setSearchResults(textMatchedProviders);

        // Center map on first result with valid coordinates
        const providerWithCoords = textMatchedProviders.find((provider) => {
          const lat = parseCoordinate(provider.latitude);
          const lng = parseCoordinate(provider.longitude);
          return Math.abs(lat) > 0.001 || Math.abs(lng) > 0.001;
        });

        if (providerWithCoords?.latitude && providerWithCoords?.longitude) {
          setCurrentLocation({
            lat: parseCoordinate(providerWithCoords.latitude),
            lng: parseCoordinate(providerWithCoords.longitude),
            zoom: 12,
          });
        }

        setIsLoading(false);
        return;
      }

      // If no text matches, try geocoding the search query as an address
      const location = await geocodeAddress(searchQuery);

      if (location) {
        setSearchedLocation(location);
        setCurrentLocation({
          lat: location.lat,
          lng: location.lng,
          zoom: 14,
        });

        // Get providers with valid coordinates
        const providersWithValidCoords = providers.filter((provider) => {
          const lat = parseCoordinate(provider.latitude);
          const lng = parseCoordinate(provider.longitude);
          return Math.abs(lat) > 0.001 || Math.abs(lng) > 0.001;
        });

        // Calculate distance for each provider from the searched location
        const providersWithDistance = providersWithValidCoords.map(
          (provider) => {
            const lat = parseCoordinate(provider.latitude);
            const lng = parseCoordinate(provider.longitude);
            const distance = calculateDistance(
              location.lat,
              location.lng,
              lat,
              lng,
            );
            return { ...provider, distance };
          },
        );

        // Sort by distance
        const sortedProviders = [...providersWithDistance].sort(
          (a, b) =>
            (a.distance ?? Number.POSITIVE_INFINITY) -
            (b.distance ?? Number.POSITIVE_INFINITY),
        );

        setSearchResults(sortedProviders);
      } else {
        // If geocoding fails and no text matches, show all providers
        // This ensures we don't end up with an empty list
        setSearchResults(providers);
      }
    } catch (error) {
      // On error, show all providers to avoid empty results
      setSearchResults(providers);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, providers, geocodeAddress, calculateDistance]);

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

  // Try to fetch Google place details for the selected provider
  useEffect(() => {
    if (selectedProvider) {
      // If no Google photos, but we have a provider, prefetch the image
      if (
        (!selectedProvider.googlePhotos ||
          selectedProvider.googlePhotos.length === 0) &&
        selectedProvider.image
      ) {
        // Create a new HTML image element to prefetch
        const img = document.createElement("img");
        img.src = selectedProvider.image;
      }

      // Try to fetch Google place details for this provider
      const fetchProviderDetails = async () => {
        try {
          if (!selectedProvider.googlePhotos) {
            const enhancedProvider = await fetchPlacePhotos(selectedProvider);
            if (enhancedProvider.googlePhotos?.length) {
              setSelectedProvider(enhancedProvider);
            }
          }
        } catch (error) {
          // Error handling
        }
      };

      fetchProviderDetails();
    }
  }, [selectedProvider]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
          libraries={googleMapsLibraries}
          onLoad={() => {
            setMapLoaded(true);
            if (typeof google !== "undefined" && google.maps) {
              geocoderRef.current = new google.maps.Geocoder();
            }
          }}
        >
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
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      autocompleteRef.current = autocomplete;
                      autocomplete.setFields([
                        "formatted_address",
                        "geometry",
                        "name",
                      ]);
                      autocomplete.setComponentRestrictions({
                        country: ["au"],
                      });
                    }}
                    onPlaceChanged={handlePlaceSelect}
                    restrictions={{ country: "au" }}
                  >
                    <Input
                      type="text"
                      placeholder="Enter address or postcode..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="w-full"
                    />
                  </Autocomplete>
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
                        setIsLoading(true);
                        navigator.geolocation.getCurrentPosition(
                          (position) => {
                            const newLocation = {
                              lat: position.coords.latitude,
                              lng: position.coords.longitude,
                              zoom: 14,
                            };
                            setCurrentLocation(newLocation);
                            setSearchedLocation({
                              lat: position.coords.latitude,
                              lng: position.coords.longitude,
                            });

                            // Sort providers by distance to user's location
                            const providersWithValidCoords = providers.filter(
                              (provider) => {
                                const lat = parseCoordinate(provider.latitude);
                                const lng = parseCoordinate(provider.longitude);
                                return (
                                  Math.abs(lat) > 0.001 || Math.abs(lng) > 0.001
                                );
                              },
                            );

                            const providersWithDistance =
                              providersWithValidCoords.map((provider) => {
                                const lat = parseCoordinate(provider.latitude);
                                const lng = parseCoordinate(provider.longitude);
                                const distance = calculateDistance(
                                  position.coords.latitude,
                                  position.coords.longitude,
                                  lat,
                                  lng,
                                );
                                return { ...provider, distance };
                              });

                            // Sort by distance
                            const sortedProviders = [
                              ...providersWithDistance,
                            ].sort(
                              (a, b) =>
                                (a.distance ?? Number.POSITIVE_INFINITY) -
                                (b.distance ?? Number.POSITIVE_INFINITY),
                            );

                            setSearchResults(sortedProviders);
                            setSearchQuery("My Location");
                            setIsLoading(false);
                          },
                          (error) => {
                            // Geolocation error
                            setIsLoading(false);
                          },
                        );
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
                  onClick={() => {
                    setCurrentLocation(defaultMapCenter);
                    setSearchResults(providers);
                    setSearchQuery("");
                    setSearchedLocation(null);
                  }}
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
                      {searchedLocation ? "nearest to" : "matching"} &quot;
                      {searchQuery}&quot;
                    </span>
                  )}
                </h3>
                <div className="space-y-4">
                  {searchResults.map((provider) => {
                    // Skip providers without valid coordinates
                    const latitude = parseCoordinate(provider.latitude);
                    const longitude = parseCoordinate(provider.longitude);

                    if (
                      Math.abs(latitude) < 0.001 &&
                      Math.abs(longitude) < 0.001
                    ) {
                      return null;
                    }

                    return (
                      <Card
                        key={provider.id}
                        className="cursor-pointer overflow-hidden transition-colors hover:bg-gray-50"
                        onClick={() => {
                          setCurrentLocation({
                            lat: latitude,
                            lng: longitude,
                            zoom: 14,
                          });
                          setSelectedProvider(provider);
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            {/* Provider Image */}
                            <div className="mb-2">
                              <ProviderImages
                                provider={provider}
                                compact={true}
                              />
                            </div>

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

                              {/* Display distance if available */}
                              {provider.distance !== undefined && (
                                <p className="mt-1 text-sm font-medium text-emerald-700">
                                  {provider.distance < 1
                                    ? `${Math.round(
                                        provider.distance * 1000,
                                      )} m away`
                                    : `${provider.distance.toFixed(1)} km away`}
                                </p>
                              )}
                            </div>

                            {/* Opening Hours - Added */}
                            {provider.hours && (
                              <div className="flex items-start gap-2">
                                <Clock className="mt-0.5 h-4 w-4 text-gray-400" />
                                <span className="whitespace-pre-line text-sm text-gray-600">
                                  {formatHours(provider.hours)}
                                </span>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                              {provider.booking_link && (
                                <Button
                                  variant="default"
                                  size="sm"
                                  asChild
                                  onClick={(e) => e.stopPropagation()}
                                  className="bg-[#2B5741] text-white hover:bg-[#1e3d2d]"
                                >
                                  <a
                                    href={provider.booking_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Book Appointment
                                  </a>
                                </Button>
                              )}
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
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}

                  {searchResults.length === 0 && !isLoading && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="text-gray-500">
                        No providers found for your search.
                      </p>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSearchResults(providers);
                          setSearchQuery("");
                          setSearchedLocation(null);
                          setCurrentLocation(defaultMapCenter);
                        }}
                      >
                        View all providers
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="flex-1">
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
                  // Map loaded
                }}
              >
                {/* Marker for searched location */}
                {searchedLocation && (
                  <Marker
                    position={searchedLocation}
                    icon={{
                      url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                      scaledSize:
                        typeof google !== "undefined"
                          ? new google.maps.Size(38, 38)
                          : undefined,
                    }}
                    zIndex={1000}
                  />
                )}

                {/* Place markers for each provider */}
                {searchResults.map((provider) => {
                  // Parse coordinates to ensure they're numbers
                  const latitude = parseCoordinate(provider.latitude);
                  const longitude = parseCoordinate(provider.longitude);

                  // Skip providers without valid coordinates
                  if (
                    Math.abs(latitude) < 0.001 &&
                    Math.abs(longitude) < 0.001
                  ) {
                    return null;
                  }

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
                    <div className="max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-md">
                      {/* Business Name */}
                      <h3 className="mb-1 font-['Raleway'] text-xl font-semibold tracking-wide text-gray-900">
                        {selectedProvider.name}
                      </h3>

                      {/* Rating */}
                      <div className="mb-3 flex items-center gap-2">
                        <span className="font-medium text-gray-700">
                          {selectedProvider.googleRating?.toFixed(1) ??
                            selectedProvider.rating?.toFixed(1) ??
                            "N/A"}
                        </span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={`selected-provider-${selectedProvider.id}-star-${i}`}
                              className={`h-3 w-3 ${
                                i <
                                (selectedProvider.googleRating ??
                                  selectedProvider.rating ??
                                  0)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-300 text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        {selectedProvider.googleRatingsTotal && (
                          <span className="text-xs text-gray-500">
                            ({selectedProvider.googleRatingsTotal})
                          </span>
                        )}
                      </div>

                      {/* Booking Link - Top Prominent Button */}
                      {selectedProvider.booking_link && (
                        <div className="mb-3">
                          <Button
                            size="sm"
                            variant="default"
                            asChild
                            className="w-full bg-[#2B5741] py-2 text-sm font-medium hover:bg-[#1e3d2d]"
                          >
                            <a
                              href={selectedProvider.booking_link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Book Appointment
                            </a>
                          </Button>
                        </div>
                      )}

                      {/* Divider */}
                      <div className="mb-3 border-t border-gray-200" />

                      {/* Info Section */}
                      <div className="space-y-2">
                        {/* Address */}
                        <div className="flex items-start gap-2">
                          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-500" />
                          <p className="text-xs text-gray-700">
                            {selectedProvider.googleFormattedAddress ??
                              selectedProvider.address}
                          </p>
                        </div>

                        {/* Distance */}
                        {selectedProvider.distance !== undefined &&
                          searchedLocation && (
                            <div className="flex items-start gap-2">
                              <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">
                                ↓
                              </span>
                              <p className="text-xs font-medium text-emerald-700">
                                {selectedProvider.distance < 1
                                  ? `${Math.round(
                                      selectedProvider.distance * 1000,
                                    )} m from search location`
                                  : `${selectedProvider.distance.toFixed(
                                      1,
                                    )} km from search location`}
                              </p>
                            </div>
                          )}

                        {/* Opening Hours - Vertical format */}
                        {selectedProvider.hours && (
                          <div className="flex items-start gap-2">
                            <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-500" />
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-gray-700">
                                Opening Hours
                              </span>
                              <div className="flex flex-col space-y-0.5">
                                {formatHours(selectedProvider.hours)
                                  ?.split("\n")
                                  .map((line) => {
                                    // Create a unique key using the content of the line
                                    const dayPattern = /^([^:]+):/;
                                    const dayMatch = dayPattern.exec(line);
                                    const day = dayMatch
                                      ? dayMatch[1].trim()
                                      : line;
                                    return (
                                      <span
                                        key={`${selectedProvider.id}-hours-${day}`}
                                        className="text-xs text-gray-600"
                                      >
                                        {line}
                                      </span>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="my-3 border-t border-gray-200" />

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        {selectedProvider.website && (
                          <Button
                            size="sm"
                            variant="secondary"
                            asChild
                            className="h-8 flex-1 text-xs"
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
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </div>
          </div>
        </LoadScript>
      </CardContent>
    </Card>
  );
}
