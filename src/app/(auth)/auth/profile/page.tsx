import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import type { Profile } from "~/types/profile";
import { ProfileHeader } from "~/components/profile/profile-header";
import { ProfileTabs } from "~/components/profile/profile-tabs";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // Try to fetch the profile
  // eslint-disable-next-line prefer-const
  let { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // If profile doesn't exist or there's an error, upsert it
  if (profileError?.code === 'PGRST116' || profileError) {
    const { data: upsertedProfile, error: upsertError } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          full_name: user.user_metadata.full_name,
          avatar_url: user.user_metadata.avatar_url,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'id',
          returning: 'minimal'
        }
      )
      .select()
      .single();

    if (upsertError) {
      console.error("Error upserting profile:", upsertError);
      return <div>Error creating profile</div>;
    }

    profileData = upsertedProfile;
  }

  const profile = profileData as Profile;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="space-y-8">
        <ProfileHeader profile={profile} isLoading={false} />
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileTabs profile={profile} />
        </Suspense>
      </div>
    </div>
  );
}
