export interface HyperbaricCenter {
  id: string;
  name: string;
  position: [number, number]; // [latitude, longitude]
  address: string;
  phone?: string;
  website?: string;
  distance?: number; // Will be calculated when searching
}
