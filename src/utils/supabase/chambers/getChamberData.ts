/* eslint-disable @typescript-eslint/no-unsafe-call */

import { createClient } from "~/utils/supabase/server";
import type { ChamberProps } from "~/types/chambers";

export async function getChamberData(slug: string): Promise<ChamberProps | null> {
  const supabase = await createClient();

  try {
    console.log('Incoming slug:', slug);
    const searchName = slug.split("-").join(" ").toLowerCase();
    console.log('Searching for name:', searchName);

    const { data, error } = await supabase
      .from("chamber_products")
      .select("*")
      .ilike("name", searchName)
      .single();

    if (error) {
      console.error("Error fetching chamber data:", error);
      console.log("Query details:", {
        table: "chamber_products",
        searchName,
        error
      });
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getChamberData:", error);
    return null;
  }
}
  