import type { Provider } from "~/types/providers";

/**
 * Default map center coordinates for Australia
 * Centered on the geographic center of Australia with a zoom level to show the entire continent
 */
export const defaultMapCenter = {
  lat: -25.2744, // Center of Australia (near Mount Isa)
  lng: 133.7751, // Center of Australia longitude
  zoom: 4, // Lower zoom level to show the entire continent
};

/**
 * Helper function to transform provider data into marker format
 * @param providers Array of providers from database
 * @returns Array of provider markers for map display
 */
export const getProviderMarkers = (providers: Provider[] = []) => {
  return providers.map((provider) => ({
    id: provider.id,
    name: provider.name,
    position: [provider.latitude ?? 0, provider.longitude ?? 0] as [
      number,
      number,
    ],
    address: provider.address,
    phone: provider.phone,
    website: provider.website,
    type: provider.type,
    pressure: provider.pressure,
    hours: provider.hours,
    image: provider.image ?? "/images/providers/provider_1.png",
  }));
};
