import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import type { Key } from "node:readline";

export interface ProviderProps {
  id: string;
  name: string;
  rating: number;
  location: string;
  address: string;
  hours: string;
  phone: string;
  type: string;
  image: string;
  pressure: string;
  website: string;
  directions: string;
  latitude: number;
  longitude: number;
  email: string;
  description: string;
  distance?: number;
}

export interface ProviderMapCardProps {
  provider: ProviderProps;
}

export interface ProviderCardProps {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
  latitude?: number;
  longitude?: number;
  distance?: number;
  onQuickView?: () => void;
}

// This interface extends ProviderCardProps to include additional details
// that might be needed for the quick view or other provider displays
export interface Provider extends ProviderCardProps {
  address?: string;
  phone?: string;
  website?: string;
  hours?: string;
  business_name?: string;
  email?: string;
  status?: string;
  business_type?: string;
  is_authorized?: boolean;
  nextAvailable?: string;
  categories?: string[];
  description?: string;
  pressure?: string;
  type?: string;
  directions?: string;
  bookingLink?: string;
  booking_link?: string;
  googlePhotos?: string[]; // Array of photo URLs from Google Places API
  placeId?: string; // Google Maps Place ID for the business
  googleRating?: number; // Rating from Google (1.0-5.0)
  googleRatingsTotal?: number; // Number of ratings on Google
  googleFormattedAddress?: string; // Formatted address from Google
}

// Optional: Create a specific type for the quick view if needed
export interface ProviderQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  provider: Provider;
}
