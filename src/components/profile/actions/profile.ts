"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateProfile(formData: {
  full_name: string;
  username: string;
  website?: string;
  bio?: string;
}) {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      ...formData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", session.user.id);

  if (error) throw error;

  revalidatePath("/profile");
}
