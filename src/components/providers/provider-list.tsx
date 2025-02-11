"use client";

// import { HyperbaricCenter } from "~/types/map";
import { motion } from "framer-motion";
import { Bookmark, Clock, MapPin, Phone, Star } from "lucide-react";
import Image from "next/image";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

import GlowingButton from "../utils/glowing-button";

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
  image: string;
}

interface ProviderCardProps {
  provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group overflow-hidden rounded-3xl border-2 border-gray-100 bg-white transition-all hover:border-emerald-100 hover:shadow-lg hover:shadow-emerald-500/10">
        <CardContent className="p-0">
          {/* Image Section */}
          <div className="relative h-64">
            <Image
              src={
                provider.image ||
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-10%20at%201.22.23%E2%80%AFpm-XJGwzA8NmXTOkXn9dCC6Q8jVpyUpPo.png"
              }
              alt={provider.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            {/* Header Content */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-['Raleway'] text-3xl font-light tracking-wide text-white">
                {provider.name}
              </h3>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-lg font-medium text-white">
                  {provider.rating.toFixed(1)}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-gray-200">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{provider.location}</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6 p-6">
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <GlowingButton
                text="Visit Website"
                onClick={() => window.open(provider.website, "_blank")}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="lg"
                className="flex-1 border-2"
                onClick={() => window.open(provider.directions, "_blank")}
              >
                Get Directions
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 border-2"
                aria-label="Save to bookmarks"
              >
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>

            {/* Details */}
            <div className="space-y-3 rounded-2xl bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-emerald-700" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Address
                  </p>
                  <p className="text-sm text-gray-700">{provider.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-4 w-4 text-emerald-700" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Hours
                  </p>
                  <p className="text-sm text-gray-700">{provider.hours}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 text-emerald-700" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Phone
                  </p>
                  <p className="text-sm text-gray-700">{provider.phone}</p>
                </div>
              </div>
            </div>

            {/* Chamber Info */}
            <div className="grid grid-cols-2 gap-4 rounded-2xl bg-gray-50 p-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Chamber Type
                </p>
                <p className="mt-1 text-sm text-gray-700">{provider.type}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Pressure Capacity
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  {provider.pressure}
                </p>
              </div>
            </div>

            {/* Book Consultation Button */}
            <Button
              size="lg"
              className="w-full bg-[#2B5741] text-lg font-medium tracking-wide text-white transition-colors hover:bg-[#1e3d2d]"
            >
              Book Consultation
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ProviderList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
