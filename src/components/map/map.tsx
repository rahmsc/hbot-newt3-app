"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import type { Map as LeafletMap } from "leaflet";
import L from "leaflet";
import { MapPin,Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import type { HyperbaricCenter } from "~/types/map";

interface MapProps {
  center: [number, number];
  zoom?: number;
  centers: HyperbaricCenter[];
}

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

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
const Map = ({ center: defaultCenter, zoom = 13, centers }: MapProps) => {
  const mapRef = useRef<LeafletMap | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCenter, setCurrentCenter] = useState(defaultCenter);
  const [nearestCenters, setNearestCenters] =
    useState<HyperbaricCenter[]>(centers);
  const [isLoading, setIsLoading] = useState(false);

  // Function to calculate distance between two points
  const calculateDistance = (
    point1: [number, number],
    point2: [number, number],
  ) => {
    return L.latLng(point1).distanceTo(L.latLng(point2)) / 1000; // Convert to kilometers
  };

  // Function to find nearest centers
  const findNearestCenters = (location: [number, number]) => {
    return centers
      .map((center) => ({
        ...center,
        distance: calculateDistance(location, center.position),
      }))
      .sort((a, b) => (a.distance || 0) - (b.distance || 0))
      .slice(0, 5); // Show 5 nearest centers
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
        const newCenter: [number, number] = [
          Number.parseFloat(data[0].lat),
          Number.parseFloat(data[0].lon),
        ];
        setCurrentCenter(newCenter);
        setNearestCenters(findNearestCenters(newCenter));
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
        const newCenter: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setCurrentCenter(newCenter);
        setNearestCenters(findNearestCenters(newCenter));
        setIsLoading(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setIsLoading(false);
        alert("Unable to retrieve your location");
      },
    );
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute left-0 right-0 top-0 z-[1000] flex gap-2 p-4">
        <Input
          type="text"
          placeholder="Search location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          <Search className="h-4 w-4" />
        </Button>
        <Button onClick={handleGetLocation} disabled={isLoading}>
          <MapPin className="h-4 w-4" />
        </Button>
      </div>

      <MapContainer
        ref={mapRef}
        center={currentCenter}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <MapUpdater center={currentCenter} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        {nearestCenters.map((center) => (
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
  );
};

export default Map;
