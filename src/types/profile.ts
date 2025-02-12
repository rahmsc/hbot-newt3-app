export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Profile;
        Update: Partial<Profile>;
      };
    };
  };
}

export interface Profile {
  id: string;
  created_at?: string;
  updated_at?: string;
  full_name?: string | null;
  username?: string | null;
  email?: string | null;
  avatar_url?: string | null;
  website?: string | null;
  location?: string | null;
  company?: string | null;
  saved_articles: number[];
}
