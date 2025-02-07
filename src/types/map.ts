export interface HyperbaricCenter {
  latitude: number;
  longitude: number;
  id: string;
  name: string;
  rating: number;
  location: string;
  address: string;
  hours: string;
  phone: string;
  type: string;
  pressure: string;
  website: string;
  directions: string;
  position: [number, number]; // Latitude and longitude
  distance?: number;
}
