/* eslint-disable @typescript-eslint/no-unsafe-call */
import { getGeocodedProviders } from "~/actions/geocode-address";
import type { Provider } from "~/types/providers";

/**
 * Fetches providers from Supabase with valid coordinates for map display
 * Filters out providers without coordinates and formats them for Google Maps
 * @returns Array of providers with valid coordinates
 */
export async function getMapProviders(): Promise<Provider[]> {
  try {
    // Fetch providers from Supabase with geocoded addresses
    const providers = await getGeocodedProviders();

    // Filter providers to only include those with valid coordinates
    const validProviders = providers.filter(
      (provider: Provider) =>
        provider.latitude !== undefined &&
        provider.longitude !== undefined &&
        provider.latitude !== 0 &&
        provider.longitude !== 0,
    );

    return validProviders;
  } catch (error) {
    console.error("Error loading map providers:", error);
    return [];
  }
}

/**
 * Creates a custom map marker configuration for a provider
 * @param provider The provider to create a marker for
 * @returns The marker configuration object or undefined
 */
export function createProviderMarker(provider: Provider) {
  if (!provider.latitude || !provider.longitude) return undefined;

  // Base marker configuration
  const markerConfig = {
    position: {
      lat: provider.latitude,
      lng: provider.longitude,
    },
    title: provider.name,
    // Add additional data needed for the marker
    providerData: {
      id: provider.id,
      name: provider.name,
      rating: provider.rating,
      address: provider.address,
      website: provider.website,
      directions: provider.directions,
    },
  };

  return markerConfig;
}

/**
 * Default center position for the map when no specific location is selected
 */
export const defaultMapCenter = {
  lat: -33.8688, // Sydney, Australia as default
  lng: 151.2093,
  zoom: 12,
};
