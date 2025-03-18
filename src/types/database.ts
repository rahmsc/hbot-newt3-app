export interface ChamberProduct {
  id: number;
  name: string | null;
  type: string | null;
  info: string | null;
  capacity: string | null;
  ata: string | null;
  features: string | null;
  size_guide: string | null;
  warranty: string | null;
  certification: string | null;
  benefits: string | null;
  tech_dco: string | null;
  inclusion: string | null;
  who_for: string | null;
  images: string[] | null;
}

export type Database = {
  public: {
    Tables: {
      chamber_products: {
        Row: ChamberProduct;
        Insert: Omit<ChamberProduct, "id">;
        Update: Partial<ChamberProduct>;
      };
    };
  };
};
