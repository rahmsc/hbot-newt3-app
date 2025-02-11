"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { Profile } from "types/database";

export async function updateProfile(data: Partial<Profile>) {
  const supabase = createServerActionClient({ cookies });

  try {
    const { error } = await supabase
      .from("profiles")
      .upsert({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id);

    if (error) throw error;

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error };
  }
}
