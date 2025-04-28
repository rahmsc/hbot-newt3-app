"use server";

import { createClient } from "@supabase/supabase-js";
import type { Provider } from "~/types/providers";
import {
  fetchPlacePhotos,
  fetchPlaceDetails,
} from "~/actions/fetch-place-photos";

// Define the provider data structure from Supabase
interface SupabaseProvider {
  id: string | number;
  business_name?: string;
  rating?: number;
  review_count?: number;
  address?: string;
  image_url?: string;
  latitude?: number | string; // Can be string or number
  longitude?: number | string; // Can be string or number
  phone?: string;
  website?: string;
  hours?: string | Record<string, unknown>;
  email?: string;
  pressure_capacity?: string;
  chamber_type?: string;
  description?: string;
  business_type?: string;
  booking_link?: string;
  approved: boolean | string; // Can be boolean or string
}

/**
 * Safely converts any value to a number, returns 0 if invalid
 */
function safeParseFloat(value: unknown): number {
  if (value === null || value === undefined) return 0;

  // If it's already a number, return it
  if (typeof value === "number") return value;

  // If it's a string, try to parse it
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

  // If it's already a boolean, return it
  if (typeof value === "boolean") return value;

  // If it's a string, check if it's "true"
  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }

  return false;
}

/**
 * Fetches approved providers with valid coordinates for map display
 * @returns Promise<Provider[]> Array of providers with coordinates
 */
export async function getMapProviders(): Promise<Provider[]> {
  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  );

  // Fetch ALL providers first for debugging
  const { data: allProvidersFull, error: allProvError } = await supabase
    .from("providers")
    .select("*");

  // First, let's get ALL providers to check if there are any in the database
  const { data: allProviders, error: allProvidersError } = await supabase
    .from("providers")
    .select("id, business_name, approved, latitude, longitude");

  // FIXED QUERY: Don't use the approved filter first, just get providers with coordinates
  const { data, error } = await supabase
    .from("providers")
    .select("*")
    .not("latitude", "is", null)
    .not("longitude", "is", null);

  if (error) {
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  // Filter for approval status in memory using our custom isApproved function
  const approvedProviders = data.filter((p) => isApproved(p.approved));

  // Transform to Provider type and convert coordinates to numbers
  const providers = (approvedProviders as SupabaseProvider[]).map(
    (provider) => {
      // Parse the latitude and longitude values
      const latitude = safeParseFloat(provider.latitude);
      const longitude = safeParseFloat(provider.longitude);

      return {
        id: provider.id?.toString() ?? "",
        name: provider.business_name ?? "",
        rating: provider.rating ?? 4.5,
        reviewCount: provider.review_count ?? 0,
        location: provider.address?.split(",").slice(1).join(",").trim() ?? "",
        image: provider.image_url ?? "/images/providers/provider_1.png",
        latitude, // Now a number
        longitude, // Now a number
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
    },
  );

  // Filter out any providers with near-zero coordinates
  const validProviders = providers.filter(
    (provider) =>
      Math.abs(provider.latitude) > 0.001 ||
      Math.abs(provider.longitude) > 0.001,
  );

  // Fetch place photos for a batch of providers (limit to avoid excessive API calls)
  // In production, you might want to implement this differently
  const PHOTO_BATCH_SIZE = 5; // Limit API calls during development

  const providersWithPhotos = await fetchBatchPlacePhotos(
    validProviders.slice(0, PHOTO_BATCH_SIZE),
  );

  // Replace the first few providers with the ones that have photos
  if (providersWithPhotos.length > 0) {
    return providersWithPhotos;
  }

  return validProviders;
}

/**
 * Fetches Google place photos for a batch of providers in parallel
 * @param providers Array of providers to fetch photos for
 * @returns Array of providers with photos added
 */
async function fetchBatchPlacePhotos(
  providers: Provider[],
): Promise<Provider[]> {
  if (providers.length === 0) return [];

  try {
    // Use Promise.all to fetch details for multiple providers in parallel
    const enhancedProviders = await Promise.all(
      providers.map((provider) => fetchPlaceDetails(provider, 3)),
    );

    // Return all providers with enhanced details
    return enhancedProviders;
  } catch (error) {
    return providers;
  }
}
