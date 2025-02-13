import type { StaticImageData } from "next/image";

export interface ProviderProps {
  id: string;
  name: string;
  rating: number;
  location: string;
  address: string;
  hours: string;
  phone: string;
  type: string;
  image: StaticImageData;
  pressure: string;
  website: string;
  directions: string;
  latitude: number;
  longitude: number;
  distance?: number;
}

export interface ProviderMapCardProps {
  provider: ProviderProps;
}

export interface ProviderCardProps {
  name: string;
  rating: number;
  reviewCount: number;
  location: string;
  categories: string[];
  nextAvailable: string;
  phone: string;
  hours: string;
  image: string;
  pressure: string;
  type: string;
  onQuickView?: () => void;
}
