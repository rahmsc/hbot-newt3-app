import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Database, Profile } from "types/database";

import { ProfileForm } from "~/components/profile/profile-form";
import { ProfileHeader } from "~/components/profile/profile-header";
import { SavedArticles } from "~/components/profile/saved-articles";
import { SavedChambers } from "~/components/profile/saved-chambers";
import { SavedResearch } from "~/components/profile/saved-research";

export default async function ProfilePage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const profile = data as Profile | null;
  const profileError = error;

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    // Handle error, maybe show an error message to the user
  }
  // Type assertion to ensure profile matches our Profile type
  const typedProfile: Profile | null = profile;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="space-y-16">
        <section>
          <ProfileHeader profile={typedProfile} />
          <ProfileForm profile={typedProfile} />
        </section>

        <section>
          <h2 className="mb-8 border-b border-gray-200 pb-4 text-2xl font-bold">
            Saved Research
          </h2>
          <SavedResearch userId={user.id} />
        </section>

        <section>
          <h2 className="mb-8 border-b border-gray-200 pb-4 text-2xl font-bold">
            Saved Chambers
          </h2>
          <SavedChambers userId={user.id} />
        </section>

        <section>
          <h2 className="mb-8 border-b border-gray-200 pb-4 text-2xl font-bold">
            Saved Articles
          </h2>
          <SavedArticles userId={user.id} />
        </section>
      </div>
    </div>
  );
}
