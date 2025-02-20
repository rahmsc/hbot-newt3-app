import { SAMPLE_PROVIDERS } from "~/components/landing/sections/providers-section";

export const defaultMapCenter = {
  lat: -33.8688,
  lng: 151.2093,
  zoom: 12,
};

export const getProviderMarkers = () => {
  return SAMPLE_PROVIDERS.map(provider => ({
    id: provider.id,
    name: provider.name,
    position: [provider.latitude, provider.longitude] as [number, number],
    address: provider.address,
    phone: provider.phone,
    website: provider.website,
    type: provider.type,
    pressure: provider.pressure,
    hours: provider.hours,
    image: provider.image,
  }));
};

export { SAMPLE_PROVIDERS }; 