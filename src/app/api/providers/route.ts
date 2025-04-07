import { NextResponse } from "next/server";
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
  approved: boolean | string;
}

/**
 * Helper function to safely parse coordinates
 */
function parseCoordinate(value: unknown): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

/**
 * API endpoint for fetching all approved providers
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

    console.log(
      `Fetched ${data?.length ?? 0} approved providers from Supabase`,
    );

    // Transform the data to match our Provider type
    const providers: Provider[] = (data as SupabaseProvider[]).map(
      (provider) => {
        // Parse coordinates
        const latitude = parseCoordinate(provider.latitude);
        const longitude = parseCoordinate(provider.longitude);

        return {
          id: provider.id?.toString() ?? "",
          name: provider.business_name ?? "",
          rating: provider.rating ?? 4.5,
          reviewCount: provider.review_count ?? 0,
          location:
            provider.address?.split(",").slice(1).join(",").trim() ?? "",
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
        };
      },
    );

    return NextResponse.json(providers);
  } catch (error) {
    console.error("Error in providers API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
