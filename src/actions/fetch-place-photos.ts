"use server";

import type { Provider } from "~/types/providers";

interface PhotoReference {
  photo_reference: string;
  height: number;
  width: number;
  html_attributions: string[];
}

interface GooglePlaceDetails {
  placeId?: string;
  googlePhotos?: string[];
  googleRating?: number;
  googleRatingsTotal?: number;
  googleFormattedAddress?: string;
}

/**
 * Fetches place details and photos for a provider using Google Places API
 *
 * @param provider The provider to fetch details for
 * @param maxPhotos Maximum number of photos to fetch
 * @returns Updated provider with Google details
 */
export async function fetchPlaceDetails(
  provider: Provider,
  maxPhotos = 5,
): Promise<Provider & GooglePlaceDetails> {
  const apiKey = process.env.GOOGLE_MAPS_SERVER_API_KEY;

  if (!apiKey) {
    console.error("Google Maps API key is missing");
    return provider;
  }

  if (!provider.address) {
    console.error("Provider address is missing, cannot fetch place details");
    return provider;
  }

  try {
    // Step 1: Find the place ID using the business name and address
    const searchQuery = encodeURIComponent(
      `${provider.name} ${provider.address}`,
    );
    const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${searchQuery}&inputtype=textquery&fields=place_id,photos&key=${apiKey}`;

    const findPlaceResponse = await fetch(findPlaceUrl);
    const findPlaceData = await findPlaceResponse.json();

    if (
      findPlaceData.status !== "OK" ||
      !findPlaceData.candidates?.[0]?.place_id
    ) {
      console.warn(
        `⚠️ Place not found for provider ${provider.id}: ${provider.name}`,
      );
      console.warn(`Response status: ${findPlaceData.status}`);
      if (findPlaceData.error_message) {
        console.error(`API Error: ${findPlaceData.error_message}`);
      }
      return provider;
    }

    const placeId = findPlaceData.candidates[0].place_id;

    // Step 2: Get place details including photos, rating, reviews count, and address
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos,rating,user_ratings_total,formatted_address&key=${apiKey}`;

    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    if (detailsData.status !== "OK") {
      console.warn(`⚠️ No details found for place ID ${placeId}`);
      return {
        ...provider,
        placeId,
      };
    }

    // Build the enhanced provider object - preserve booking_link and bookingLink from original provider
    const enhancedProvider = {
      ...provider,
      placeId,
      googleRating: detailsData.result?.rating,
      googleRatingsTotal: detailsData.result?.user_ratings_total,
      googleFormattedAddress: detailsData.result?.formatted_address,
      // Explicitly preserve booking links from the original provider
      booking_link: provider.booking_link,
      bookingLink: provider.bookingLink,
    };

    // Skip photos if none found
    if (!detailsData.result?.photos) {
      console.warn(`⚠️ No photos found for place ID ${placeId}`);
      return enhancedProvider;
    }

    // Get photo references and construct photo URLs
    const photoRefs = (detailsData.result.photos as PhotoReference[])
      .slice(0, maxPhotos)
      .map((photo) => photo.photo_reference);

    const photoUrls = photoRefs.map(
      (ref) =>
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${ref}&key=${apiKey}`,
    );

    // Return provider with all Google details
    return {
      ...enhancedProvider,
      googlePhotos: photoUrls,
    };
  } catch (error) {
    console.error("Error fetching place details:", error);
    return provider;
  }
}

/**
 * Backwards compatibility - use fetchPlaceDetails instead
 */
export async function fetchPlacePhotos(
  provider: Provider,
  maxPhotos = 5,
): Promise<Provider & GooglePlaceDetails> {
  return fetchPlaceDetails(provider, maxPhotos);
}
