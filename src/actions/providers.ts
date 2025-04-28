"use server";

import { createClient } from "@supabase/supabase-js";
import type { Provider } from "~/types/providers";

// Define the shape of the provider data from Supabase
interface SupabaseProvider {
  id: string | number;
  business_name: string;
  rating?: number;
  review_count?: number;
  address?: string;
  image_url?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  website?: string;
  hours?: string | Record<string, unknown>;
  email?: string;
  pressure_capacity?: string;
  chamber_type?: string;
  description?: string;
  business_type?: string;
  booking_link?: string;
  approved: boolean;
}

export async function getProviders(): Promise<Provider[]> {
  // Create direct Supabase client without using the utility
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  );
  // Try without filter first
  const { data: allData, error: allError } = await supabase
    .from("providers")
    .select("*");

  // Now try with approved filter
  const { data, error } = await supabase
    .from("providers")
    .select("*")
    .eq("approved", true);

  if (error) {
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  // Transform Supabase data to match our Provider type
  return (data as SupabaseProvider[]).map((provider) => ({
    id: provider.id?.toString() ?? "",
    name: provider.business_name ?? "",
    rating: provider.rating ?? 4.5, // Default rating if not available
    reviewCount: provider.review_count ?? 0,
    location: provider.address?.split(",").slice(1).join(",").trim() ?? "",
    image: provider.image_url ?? "/images/providers/provider_1.png", // Default image
    latitude: provider.latitude ?? 0,
    longitude: provider.longitude ?? 0,
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
  }));
}

export async function getFilteredProviders(
  chambers: string[],
  pressure: string[],
): Promise<Provider[]> {
  const providers = await getProviders();

  return providers.filter((provider) => {
    const chamberTypeMatch =
      chambers.length === 0 || chambers.includes(provider.type ?? "");
    const pressureMatch =
      pressure.length === 0 || pressure.includes(provider.pressure ?? "");
    return chamberTypeMatch && pressureMatch;
  });
}
