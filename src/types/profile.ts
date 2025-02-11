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
  created_at: string;
  updated_at: string;
  full_name?: string | null;
  username?: string | null;
  email?: string | null;
  avatar_url?: string | null;
  website?: string | null;
  bio?: string | null;
  location?: string | null;
  occupation?: string | null;
  company?: string | null;
  twitter_url?: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
  notification_preferences?: Json | null;
  theme_preference?: string | null;
  saved_research?: string[] | null;
  saved_chambers?: string[] | null;
  saved_articles?: string[] | null;
}
