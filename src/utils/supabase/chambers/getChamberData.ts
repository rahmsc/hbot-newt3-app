/* eslint-disable @typescript-eslint/no-unsafe-call */

import { createClient } from "~/utils/supabase/server";
import type { ChamberProps } from "~/types/chambers";

export async function getChamberData(
  slug: string,
): Promise<ChamberProps | null> {
  const supabase = await createClient();

  try {
    const searchName = slug.split("-").join(" ").toLowerCase();

    const { data, error } = await supabase
      .from("chamber_products")
      .select(
        `
        id,
        name,
        type,
        info,
        capacity,
        ata,
        features,
        size_guide,
        warranty,
        certification,
        benefits,
        tech_dco,
        inclusion,
        who_for,
        images
      `,
      )
      .ilike("name", searchName)
      .single();

    if (error) {
      console.error("Error fetching chamber data:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getChamberData:", error);
    return null;
  }
}

export async function getAllChambers(): Promise<ChamberProps[]> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("chamber_products")
      .select(
        `
        id,
        name,
        type,
        info,
        capacity,
        ata,
        features,
        size_guide,
        warranty,
        certification,
        benefits,
        tech_dco,
        inclusion,
        who_for,
        images
      `,
      )
      .order("name");

    if (error) {
      console.error("Error fetching all chambers:", error);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error in getAllChambers:", error);
    return [];
  }
}
