"use server";

import { createClient } from "@supabase/supabase-js";

/**
 * Updates provider coordinates directly in the database
 */
export async function updateProviderCoordinates(
  providerId: number,
  latitude: number,
  longitude: number,
): Promise<{ success: boolean; message: string }> {
  try {
    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    );

    // Check current values
    const { data: before, error: beforeError } = await supabase
      .from("providers")
      .select("id, business_name, latitude, longitude")
      .eq("id", providerId)
      .single();

    if (beforeError) {
      console.error(`Error fetching provider ${providerId}:`, beforeError);
      return {
        success: false,
        message: `Error fetching provider: ${beforeError.message}`,
      };
    }
    // Update the coordinates
    const { data, error } = await supabase
      .from("providers")
      .update({ latitude, longitude })
      .eq("id", providerId)
      .select();

    if (error) {
      console.error(`Error updating provider ${providerId}:`, error);
      return {
        success: false,
        message: `Error updating provider: ${error.message}`,
      };
    }

    // Check if update was successful
    const { data: after, error: afterError } = await supabase
      .from("providers")
      .select("id, business_name, latitude, longitude")
      .eq("id", providerId)
      .single();

    if (afterError) {
      console.error(
        `Error fetching updated provider ${providerId}:`,
        afterError,
      );
      return {
        success: false,
        message: `Error fetching updated provider: ${afterError.message}`,
      };
    }

    return {
      success: true,
      message: `Successfully updated coordinates for ${after.business_name}`,
    };
  } catch (error) {
    console.error("Error in updateProviderCoordinates:", error);
    return {
      success: false,
      message: `Server error: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
