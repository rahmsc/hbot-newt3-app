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

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
  }

  // Type assertion with proper type checking
  const profile = profileData as Profile | null;
  if (!profile) {
    return <div>No profile data found</div>;
  }

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
