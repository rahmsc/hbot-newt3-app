"use server";

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

    console.log(`Geocoding address: "${address}"`);

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
      console.log(
        `✅ Successfully geocoded address to: ${result.lat}, ${result.lng}`,
      );
      return result;
    }

    console.log(`⚠️ No coordinates found for address: "${address}"`);
    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}
