export interface Provider {
  id: number;
  created_at: string;
  updated_at: string;
  business_type: string; // This should be an enum type matching your USER-DEFINED type
  role: string; // This should be an enum type matching your USER-DEFINED type
  is_authorized: boolean;
  verification_documents: Record<string, any> | null;
  assessment_score: number | null;
  assessment_date: string | null;
  phone: string;
  website: string | null;
  status: string;
  assessment_notes: string | null;
  ip_address: string | null;
  business_name: string;
  legal_business_name: string;
  user_agent: string | null;
  first_name: string;
  last_name: string;
  email: string;
} 