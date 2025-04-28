import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Simple geocoding function
async function geocodeAddress(address: string) {
  try {
    if (!address) return null;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
      {
        headers: { "User-Agent": "HBOT Provider Locator" },
        cache: "no-store", // Force fresh request
      },
    );

    if (!response.ok) {
      throw new Error(`Geocoding error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data && data.length > 0) {
      const coordinates = {
        latitude: Number.parseFloat(data[0].lat),
        longitude: Number.parseFloat(data[0].lon),
      };
      return coordinates;
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

    // Fetch all providers, including unapproved ones
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

    // Track results
    const results = [];

    // Process each provider
    for (const provider of data) {
      if (!provider.address) {
        results.push({
          id: provider.id,
          name: provider.business_name,
          status: "skipped - no address",
        });
        continue;
      }

      // Get geocoded coordinates
      const coordinates = await geocodeAddress(provider.address);

      if (!coordinates) {
        results.push({
          id: provider.id,
          name: provider.business_name,
          status: "failed - no coordinates found",
        });
        continue;
      }

      // Update provider with coordinates
      const { error: updateError } = await supabase
        .from("providers")
        .update({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        })
        .eq("id", provider.id);

      if (updateError) {
        console.error(`Failed to update provider ${provider.id}:`, updateError);
        results.push({
          id: provider.id,
          name: provider.business_name,
          status: "error updating database",
        });
      } else {
        results.push({
          id: provider.id,
          name: provider.business_name,
          coordinates: coordinates,
          status: "success",
        });
      }

      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return NextResponse.json({ success: true, results }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
