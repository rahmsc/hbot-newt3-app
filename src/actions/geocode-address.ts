"use server";

import { createClient } from "@supabase/supabase-js";
import type { Provider } from "~/types/providers";

/**
 * Geocodes an address using the Nominatim OpenStreetMap API
 * @param address The address to geocode
 * @returns A promise with the latitude and longitude
 */
export async function geocodeAddress(
  address: string,
): Promise<{ lat: number; lng: number } | null> {
  try {
    if (!address) return null;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
      {
        headers: { "User-Agent": "HBOT Provider Locator" },
        cache: "force-cache",
      },
    );

    if (!response.ok) {
      throw new Error(`Geocoding error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data && data.length > 0) {
      const result = {
        lat: Number.parseFloat(data[0].lat),
        lng: Number.parseFloat(data[0].lon),
      };

      return result;
    }
    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}

/**
 * Interface for provider data from Supabase
 */
interface SupabaseProvider {
  id: string | number;
  business_name?: string;
  rating?: number;
  review_count?: number;
  address?: string;
  image_url?: string;
  latitude?: number | string;
  longitude?: number | string;
  phone?: string;
  website?: string;
  hours?: string | Record<string, unknown>;
  email?: string;
  pressure_capacity?: string;
  chamber_type?: string;
  description?: string;
  business_type?: string;
  booking_link?: string;
  approved: boolean | string;
}

/**
 * Safely converts any value to a number, returns 0 if invalid
 */
function safeParseFloat(value: unknown): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

/**
 * Checks if a provider is approved, handling both boolean and string values
 */
function isApproved(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }
  return false;
}

/**
 * Fetches providers from Supabase and geocodes any addresses without coordinates
 * @returns Promise<Provider[]> Array of providers with geocoded coordinates
 */
export async function getGeocodedProviders(): Promise<Provider[]> {
  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  );

  // Fetch all providers
  const { data, error } = await supabase.from("providers").select("*");

  if (error || !data || data.length === 0) {
    return [];
  }

  // Filter for approved providers
  const approvedProviders = data.filter((p) => isApproved(p.approved));

  // Transform to Provider type and geocode addresses if needed
  const providersWithCoordinates = await Promise.all(
    (approvedProviders as SupabaseProvider[]).map(async (provider) => {
      // Check if provider already has coordinates
      let latitude = safeParseFloat(provider.latitude);
      let longitude = safeParseFloat(provider.longitude);

      // If provider has no coordinates but has address, geocode it
      if (
        (latitude === 0 || longitude === 0) &&
        provider.address &&
        provider.address.trim() !== ""
      ) {
        const geocoded = await geocodeAddress(provider.address);
        if (geocoded) {
          latitude = geocoded.lat;
          longitude = geocoded.lng;
        }
      }

      return {
        id: provider.id?.toString() ?? "",
        name: provider.business_name ?? "",
        rating: provider.rating ?? 4.5,
        reviewCount: provider.review_count ?? 0,
        location: provider.address?.split(",").slice(1).join(",").trim() ?? "",
        image: provider.image_url ?? "/images/providers/provider_1.png",
        latitude,
        longitude,
        address: provider.address ?? "",
        phone: provider.phone ?? "",
        website: provider.website ?? "",
        hours:
          typeof provider.hours === "string"
            ? provider.hours
            : JSON.stringify(provider.hours),
        email: provider.email ?? "",
        pressure: provider.pressure_capacity ?? "",
        type: provider.chamber_type ?? "",
        description: provider.description ?? "",
        categories: provider.business_type
          ? [provider.business_type]
          : ["Wellness"],
        directions: `https://maps.google.com/?q=${encodeURIComponent(provider.address ?? "")}`,
        booking_link: provider.booking_link ?? "",
      };
    }),
  );

  return providersWithCoordinates;
}
