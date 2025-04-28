import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { Provider } from "~/types/providers";
import { fetchPlaceDetails } from "~/actions/fetch-place-photos";

// Define the provider data structure from Supabase
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
  approved?: boolean | string;
}

/**
 * GET handler for fetching providers with Google details
 */
export async function GET() {
  try {
    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    );

    // Fetch all approved providers
    const { data, error } = await supabase
      .from("providers")
      .select("*")
      .eq("approved", true)
      .order("business_name");

    if (error) {
      console.error("Error fetching providers:", error);
      return NextResponse.json(
        { error: "Failed to fetch providers" },
        { status: 500 },
      );
    }

    // Transform the data to match our Provider type
    const providers: Provider[] = data.map((provider: SupabaseProvider) => {
      // Parse coordinates to numbers if they're strings
      const latitude =
        typeof provider.latitude === "string"
          ? Number.parseFloat(provider.latitude)
          : provider.latitude;

      const longitude =
        typeof provider.longitude === "string"
          ? Number.parseFloat(provider.longitude)
          : provider.longitude;

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
    });

    // Enhance with Google details - only for the first 6 providers to avoid excessive API calls
    // In production, you might want to implement caching and more selective fetching
    const PROVIDER_LIMIT = 6;

    try {
      const enhancedProviders = await Promise.all(
        providers
          .slice(0, PROVIDER_LIMIT)
          .map((provider) => fetchPlaceDetails(provider)),
      );
      // Replace the first 6 providers with enhanced versions
      const finalProviders = [...providers];
      for (let i = 0; i < enhancedProviders.length; i++) {
        finalProviders[i] = enhancedProviders[i];
      }

      return NextResponse.json(finalProviders);
    } catch (error) {
      console.error("Error enhancing providers with Google details:", error);
      // Return unenhanced providers if Google enhancement fails
      return NextResponse.json(providers);
    }
  } catch (error) {
    console.error("Error in providers API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
