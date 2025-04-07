import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Helper function to geocode an address
async function geocodeAddress(
  address: string,
): Promise<{ lat: number; lng: number } | null> {
  try {
    if (!address) return null;

    // Add a small delay to avoid hitting rate limits
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
      {
        headers: { "User-Agent": "HBOT Provider Locator" },
        cache: "no-store", // Force fresh requests
      },
    );

    if (!response.ok) {
      throw new Error(`Geocoding error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data && data.length > 0) {
      return {
        lat: Number.parseFloat(data[0].lat),
        lng: Number.parseFloat(data[0].lon),
      };
    }

    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}

// API route handler
export async function GET() {
  try {
    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    );

    // Fetch ALL providers, even unapproved ones
    const { data, error } = await supabase.from("providers").select("*");

    if (error) {
      console.error("Error fetching providers:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: "No providers found" },
        { status: 404 },
      );
    }

    // Results tracking
    const results = {
      total: data.length,
      updated: 0,
      failed: 0,
      skipped: 0,
      details: [] as Array<{
        id: string | number;
        business_name: string;
        address: string | null;
        result: string;
      }>,
    };

    // Process each provider
    for (const provider of data) {
      // Track provider result
      const providerResult = {
        id: provider.id,
        business_name: provider.business_name,
        address: provider.address,
        result: "",
      };

      try {
        // Skip providers without addresses
        if (!provider.address) {
          providerResult.result = "Skipped (no address)";
          results.skipped++;
          results.details.push(providerResult);
          continue;
        }

        // Get geocoded coordinates
        const geoResult = await geocodeAddress(provider.address);

        if (!geoResult) {
          providerResult.result = "Failed (no coordinates found)";
          results.failed++;
          results.details.push(providerResult);
          continue;
        }

        // Update provider with coordinates
        const { error: updateError } = await supabase
          .from("providers")
          .update({
            latitude: geoResult.lat,
            longitude: geoResult.lng,
          })
          .eq("id", provider.id);

        if (updateError) {
          providerResult.result = `Failed to update: ${updateError.message}`;
          results.failed++;
        } else {
          providerResult.result = `Updated: ${geoResult.lat}, ${geoResult.lng}`;
          results.updated++;
        }
      } catch (err) {
        providerResult.result = `Error: ${err instanceof Error ? err.message : String(err)}`;
        results.failed++;
      }

      results.details.push(providerResult);
    }

    return NextResponse.json({ success: true, results }, { status: 200 });
  } catch (error) {
    console.error("Error running geocoding:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
