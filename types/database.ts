export type Profile = {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string | null;
  username: string | null;
  email: string | null;
  avatar_url: string | null;
  website: string | null;
  bio: string | null;
  location: string | null;
  occupation: string | null;
  company: string | null;
  twitter_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  notification_preferences: {
    email: boolean;
    push: boolean;
  };
  theme_preference: "light" | "dark" | "system";
  saved_research: string[];
  saved_chambers: string[];
  saved_articles: string[];
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Profile, "id">>;
      };
    };
  };
};
