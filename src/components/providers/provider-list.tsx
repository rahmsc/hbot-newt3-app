"use client";

import { Bookmark, Star } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { HyperbaricCenter } from "~/types/map";

interface Provider {
  id: string;
  name: string;
  rating: number;
  location: string;
  address: string;
  hours: string;
  phone: string;
  type: string;
  pressure: string;
  website: string;
  directions: string;
  position: [number, number];
}

interface ProviderCardProps {
  provider: Provider;
}

// Export the providers array
export const providers = [
  {
    id: "bne1",
    name: "Brisbane City HBOT Center",
    rating: 4.8,
    location: "Brisbane CBD",
    address: "123 Queen Street, Brisbane City QLD 4000",
    hours: "Mon-Fri: 7am-8pm, Sat: 8am-4pm",
    phone: "(07) 3000 1234",
    type: "Hard Shell Lay Down",
    pressure: "2.4 ATA",
    website: "https://brisbanehbot.com.au",
    directions: "https://maps.google.com/?q=123+Queen+Street+Brisbane",
    latitude: -27.4705,
    longitude: 153.026,
  },
  {
    id: "bne2",
    name: "Spring Hill Hyperbaric",
    rating: 4.9,
    location: "Spring Hill",
    address: "45 Boundary Street, Spring Hill QLD 4000",
    hours: "Mon-Sun: 6am-9pm",
    phone: "(07) 3000 5678",
    type: "Multi-Place Chamber",
    pressure: "2.8 ATA",
    website: "https://springhillhbot.com.au",
    directions: "https://maps.google.com/?q=45+Boundary+Street+Spring+Hill",
    latitude: -27.4705,
    longitude: 153.026,
  },
  {
    id: "bne3",
    name: "Fortitude Valley Wellness",
    rating: 4.7,
    location: "Fortitude Valley",
    address: "789 Brunswick Street, Fortitude Valley QLD 4006",
    hours: "Mon-Sat: 8am-6pm",
    phone: "(07) 3000 9012",
    type: "Soft Shell Lay Down",
    pressure: "2.0 ATA",
    website: "https://valleywellness.com.au",
    directions:
      "https://maps.google.com/?q=789+Brunswick+Street+Fortitude+Valley",
    latitude: -27.4705,
    longitude: 153.026,
  },
  {
    id: "bne4",
    name: "New Farm HBOT Clinic",
    rating: 5.0,
    location: "New Farm",
    address: "234 Brunswick Street, New Farm QLD 4005",
    hours: "Mon-Fri: 7am-7pm",
    phone: "(07) 3000 3456",
    type: "Hard Shell Sit Down",
    pressure: "2.2 ATA",
    website: "https://newfarmhbot.com.au",
    directions: "https://maps.google.com/?q=234+Brunswick+Street+New+Farm",
    latitude: -27.4705,
    longitude: 153.026,
  },
  {
    id: "bne5",
    name: "South Bank Medical HBOT",
    rating: 4.8,
    location: "South Bank",
    address: "567 Grey Street, South Brisbane QLD 4101",
    hours: "Mon-Sun: 8am-8pm",
    phone: "(07) 3000 7890",
    type: "Multi-Place Chamber",
    pressure: "2.6 ATA",
    website: "https://southbankhbot.com.au",
    directions: "https://maps.google.com/?q=567+Grey+Street+South+Brisbane",
    latitude: -27.4705,
    longitude: 153.026,
  },
  {
    id: "bne6",
    name: "West End Hyperbaric",
    rating: 4.6,
    location: "West End",
    address: "890 Boundary Street, West End QLD 4101",
    hours: "Mon-Sat: 7am-6pm",
    phone: "(07) 3000 2345",
    type: "Hard Shell Lay Down",
    pressure: "2.4 ATA",
    website: "https://westendhbot.com.au",
    directions: "https://maps.google.com/?q=890+Boundary+Street+West+End",
    latitude: -27.4705,
    longitude: 153.026,
  },
  {
    id: "bne7",
    name: "Kangaroo Point HBOT",
    rating: 4.9,
    location: "Kangaroo Point",
    address: "123 Main Street, Kangaroo Point QLD 4169",
    hours: "Mon-Fri: 8am-5pm",
    phone: "(07) 3000 6789",
    type: "Soft Shell Lay Down",
    pressure: "1.8 ATA",
    website: "https://kangaroopointhbot.com.au",
    directions: "https://maps.google.com/?q=123+Main+Street+Kangaroo+Point",
    latitude: -27.4705,
    longitude: 153.026,
  },
  {
    id: "bne8",
    name: "Milton Oxygen Therapy",
    rating: 4.7,
    location: "Milton",
    address: "456 Park Road, Milton QLD 4064",
    hours: "Mon-Sun: 7am-8pm",
    phone: "(07) 3000 0123",
    type: "Hard Shell Lay Down",
    pressure: "2.5 ATA",
    website: "https://miltonhbot.com.au",
    directions: "https://maps.google.com/?q=456+Park+Road+Milton",
    latitude: -27.4705,
    longitude: 153.026,
  },
  {
    id: "bne9",
    name: "Paddington Wellness HBOT",
    rating: 4.8,
    location: "Paddington",
    address: "789 Given Terrace, Paddington QLD 4064",
    hours: "Mon-Sat: 8am-7pm",
    phone: "(07) 3000 4567",
    type: "Multi-Place Chamber",
    pressure: "2.7 ATA",
    website: "https://paddingtonhbot.com.au",
    directions: "https://maps.google.com/?q=789+Given+Terrace+Paddington",
    latitude: -27.4705,
    longitude: 153.026,
  },
];

/// Renamed to ProviderCard for clarity
export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Card className="overflow-hidden border-2">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div>
            <h3 className="font-['Raleway'] text-2xl font-medium tracking-wide text-gray-800">
              {provider.name}
            </h3>
            <div className="mt-1 flex items-center gap-1">
              <span className="text-sm font-medium">
                {provider.rating.toFixed(1)}
              </span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < provider.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-600">{provider.location}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="bg-[#2B5741] text-white hover:bg-[#1e3d2d]"
              onClick={() => window.open(provider.website, "_blank")}
            >
              Visit Website
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="bg-black text-white hover:bg-gray-800"
              onClick={() => window.open(provider.directions, "_blank")}
            >
              Get Directions
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto h-8 w-8"
              aria-label="Save to bookmarks"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>

          {/* Details */}
          <div className="space-y-1 text-xs text-gray-700">
            <p>
              <span className="font-medium">Address:</span> {provider.address}
            </p>
            <p>
              <span className="font-medium">Hours:</span> {provider.hours}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {provider.phone}
            </p>
            <p>
              <span className="font-medium">Type of Chamber:</span>{" "}
              {provider.type}
            </p>
            <p>
              <span className="font-medium">Pressure Capacity:</span>{" "}
              {provider.pressure}
            </p>
          </div>

          {/* Book Consultation Button */}
          <Button
            size="sm"
            className="w-full bg-black text-white hover:bg-gray-800"
          >
            Book Consultation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Export the ProviderList component
export function ProviderList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
