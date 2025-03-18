export interface ChamberProps {
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
  images?: string[] | null;
}

// You might want to create a helper type for required fields
export type RequiredChamberFields = Pick<Required<ChamberProps>, 'id' | 'name' | 'type'>;