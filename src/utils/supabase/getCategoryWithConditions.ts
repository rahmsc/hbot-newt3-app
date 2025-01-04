import { createClient } from "./client";

export interface CategoryWithConditions {
  id: number;
  category_id: number;
  category_name: string;
  condition_id: number;
  condition_name: string;
}

export async function getCategoryWithConditions(): Promise<
  CategoryWithConditions[]
> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("condition-with-category")
      .select("*");

    if (!data) {
      return [];
    }

    return data as CategoryWithConditions[];
  } catch (error) {
    console.error("Error in getCategoryWithConditions:", error);
    throw new Error("Failed to fetch categories and conditions");
  }
}
