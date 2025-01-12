"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Search, MapPin } from "lucide-react";
import type { HyperbaricCenter } from "~/types/map";

// Component to handle map updates
function MapUpdater({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function HyperbaricLocator() {
  const mapRef = useRef<LeafletMap | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLocation, setCurrentLocation] = useState<[number, number]>([
    51.505, -0.09,
  ]); // Default to London
  const [searchResults, setSearchResults] = useState<HyperbaricCenter[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to calculate distance between two points
  const calculateDistance = (
    point1: [number, number],
    point2: [number, number],
  ) => {
    return L.latLng(point1).distanceTo(L.latLng(point2)) / 1000; // Convert to kilometers
  };

  // This is a mock function. In a real application, you'd fetch this data from your backend or an API
  const searchHyperbaricCenters = async (location: [number, number]) => {
    setIsLoading(true);
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - replace this with actual API call in your implementation
      const mockResults: HyperbaricCenter[] = [
        {
          id: "1",
          name: "Center A",
          address: "123 Main St, City",
          position: [51.51, -0.1],
          phone: "123-456-7890",
          website: "http://www.centera.com",
        },
        {
          id: "2",
          name: "Center B",
          address: "456 Oak St, Town",
          position: [51.52, -0.11],
          phone: "098-765-4321",
          website: "http://www.centerb.com",
        },
      ];

      // Calculate distances and sort by nearest
      const resultsWithDistance = mockResults
        .map((center) => ({
          ...center,
          distance: calculateDistance(location, center.position),
        }))
        .sort((a, b) => (a.distance || 0) - (b.distance || 0));

      setSearchResults(resultsWithDistance);
    } catch (error) {
      console.error("Error fetching centers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle location search
  const handleSearch = async () => {
    if (!searchQuery) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`,
      );
      const data = await response.json();
      if (data?.[0]) {
        const newLocation: [number, number] = [
          Number.parseFloat(data[0].lat),
          Number.parseFloat(data[0].lon),
        ];
        setCurrentLocation(newLocation);
        await searchHyperbaricCenters(newLocation);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle getting user's current location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setCurrentLocation(newLocation);
        searchHyperbaricCenters(newLocation).catch((error) => {
          console.error("Error searching hyperbaric centers:", error);
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        setIsLoading(false);
        alert("Unable to retrieve your location");
      },
    );
  };

  return (
    <section className="container space-y-6 py-8 md:py-12">
      <div className="mx-auto flex flex-col gap-4 lg:flex-row">
        {/* Left side - Search and Results */}
        <Card className="flex-1 lg:max-w-[500px]">
          <CardHeader>
            <CardTitle>Find Hyperbaric Chambers Near You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex gap-2">
              <Input
                type="text"
                placeholder="Enter location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                variant="secondary"
                size="icon"
              >
                <Search className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleGetLocation}
                disabled={isLoading}
                variant="secondary"
                size="icon"
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </div>

            {/* Results section */}
            <div className="h-[400px] overflow-y-auto pr-2">
              {isLoading ? (
                <p className="text-center text-muted-foreground">
                  Searching...
                </p>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((center) => (
                    <Card
                      key={center.id}
                      className="transition-colors hover:bg-accent/50"
                    >
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{center.name}</h3>
                        <p className="text-sm">{center.address}</p>
                        {center.phone && (
                          <p className="text-sm">
                            <a
                              href={`tel:${center.phone}`}
                              className="text-blue-500 hover:underline"
                            >
                              {center.phone}
                            </a>
                          </p>
                        )}
                        {center.website && (
                          <p className="text-sm">
                            <a
                              href={center.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Visit Website
                            </a>
                          </p>
                        )}
                        {center.distance && (
                          <p className="mt-2 text-sm text-gray-600">
                            Distance: {center.distance.toFixed(1)} km
                          </p>
                        )}
                        <Button
                          onClick={() => setCurrentLocation(center.position)}
                          className="mt-2"
                          variant="outline"
                          size="sm"
                        >
                          View on Map
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right side - Map */}
        <Card className="flex-[2] lg:min-h-[600px]">
          <CardContent className="p-0">
            <div className="h-[400px] lg:h-[600px]">
              <MapContainer
                ref={mapRef}
                center={currentLocation}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full rounded-lg"
                style={{ height: "100%", width: "100%" }}
              >
                <MapUpdater center={currentLocation} zoom={13} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maxZoom={19}
                />
                {searchResults.map((center) => (
                  <Marker
                    key={center.id}
                    position={center.position}
                    title={center.name}
                  >
                    <Popup>
                      <div className="min-w-[200px]">
                        <h3 className="font-semibold">{center.name}</h3>
                        <p className="text-sm">{center.address}</p>
                        {center.phone && (
                          <p className="text-sm">
                            <a
                              href={`tel:${center.phone}`}
                              className="text-blue-500 hover:underline"
                            >
                              {center.phone}
                            </a>
                          </p>
                        )}
                        {center.website && (
                          <p className="text-sm">
                            <a
                              href={center.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Visit Website
                            </a>
                          </p>
                        )}
                        {center.distance && (
                          <p className="mt-2 text-sm text-gray-600">
                            Distance: {center.distance.toFixed(1)} km
                          </p>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
