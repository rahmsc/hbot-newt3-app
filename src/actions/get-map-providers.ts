"use server";

import { createClient } from "@supabase/supabase-js";
import type { Provider } from "~/types/providers";

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
  console.log("Fetching map providers with coordinates...");

  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  );

  // Fetch ALL providers first for debugging
  const { data: allProvidersFull, error: allProvError } = await supabase
    .from("providers")
    .select("*");

  console.log("DETAILED DEBUG - All providers with full data:");
  for (const provider of allProvidersFull || []) {
    console.log(`Provider ID ${provider.id}: ${provider.business_name}`, {
      approved: provider.approved,
      approved_type: typeof provider.approved,
      is_approved_result: isApproved(provider.approved),
      latitude: provider.latitude,
      longitude: provider.longitude,
      lat_type: typeof provider.latitude,
      lng_type: typeof provider.longitude,
    });
  }

  // First, let's get ALL providers to check if there are any in the database
  const { data: allProviders, error: allProvidersError } = await supabase
    .from("providers")
    .select("id, business_name, approved, latitude, longitude");

  console.log("Total providers in database:", allProviders?.length ?? 0);
  if (allProviders && allProviders.length > 0) {
    console.log(
      "Sample of ALL providers in database:",
      allProviders.map((p) => ({
        id: p.id,
        name: p.business_name,
        approved: p.approved,
        approved_type: typeof p.approved,
        is_approved: isApproved(p.approved),
        lat: p.latitude,
        lng: p.longitude,
        raw_lat: p.latitude,
        raw_lng: p.longitude,
        lat_type: typeof p.latitude,
        lng_type: typeof p.longitude,
      })),
    );
  }

  // Log details for provider ID 4 specifically
  const provider4 = allProviders?.find((p) => p.id === 4);
  if (provider4) {
    console.log("IMPORTANT - Details for provider ID 4:", {
      id: provider4.id,
      name: provider4.business_name,
      approved: provider4.approved,
      approved_type: typeof provider4.approved,
      is_approved: isApproved(provider4.approved),
      lat: provider4.latitude,
      lng: provider4.longitude,
    });
  } else {
    console.log("⚠️ Provider ID 4 not found in the database");
  }

  // FIXED QUERY: Don't use the approved filter first, just get providers with coordinates
  console.log(
    "Fetching all providers with coordinates (regardless of approval)",
  );
  const { data, error } = await supabase
    .from("providers")
    .select("*")
    .not("latitude", "is", null)
    .not("longitude", "is", null);

  if (error) {
    console.error("Error fetching providers with coordinates:", error);
    return [];
  }

  console.log(
    `Found ${data?.length ?? 0} providers with coordinates (before approval filter)`,
  );

  if (!data || data.length === 0) {
    return [];
  }

  // Filter for approval status in memory using our custom isApproved function
  const approvedProviders = data.filter((p) => isApproved(p.approved));
  console.log(
    `After filtering for approved: ${approvedProviders.length} providers`,
  );

  // Log which providers passed the approval check
  approvedProviders.forEach((p) => {
    console.log(
      `Provider ${p.id} (${p.business_name}) passed approval check:`,
      {
        raw_approved: p.approved,
        approved_type: typeof p.approved,
      },
    );
  });

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
      };
    },
  );

  // Explicitly log the parsed coordinates
  providers.forEach((provider, index) => {
    console.log(`Parsed Provider ${index + 1}:`, {
      id: provider.id,
      name: provider.name,
      latitude: provider.latitude,
      longitude: provider.longitude,
      isValid:
        Math.abs(provider.latitude) > 0.001 ||
        Math.abs(provider.longitude) > 0.001,
    });
  });

  // Filter out any providers with near-zero coordinates
  const validProviders = providers.filter(
    (provider) =>
      Math.abs(provider.latitude) > 0.001 ||
      Math.abs(provider.longitude) > 0.001,
  );

  console.log(
    `${validProviders.length} providers have valid non-zero coordinates`,
  );

  if (validProviders.length === 0 && providers.length > 0) {
    console.log(
      "⚠️ Providers exist but were filtered out due to near-zero coordinates!",
    );
  }

  return validProviders;
}
