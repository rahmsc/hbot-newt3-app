import { getGeocodedProviders } from "~/actions/geocode-providers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // This will trigger the geocoding and update of all providers
    const providers = await getGeocodedProviders();

    return NextResponse.json({
      success: true,
      message: "Geocoding process completed",
      providers_processed: providers.length,
      providers: providers.map((p) => ({
        id: p.id,
        name: p.name,
        address: p.address,
        coordinates:
          p.latitude && p.longitude ? [p.latitude, p.longitude] : null,
      })),
    });
  } catch (error) {
    console.error("Error processing geocoding:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
