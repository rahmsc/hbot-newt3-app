import { createClient } from "./client";

export async function getConditionWithCategory(conditionId: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("condition-with-category")
    .select(
      `
      category_name,
      condition_name
    `,
    )
    .eq("condition_id", conditionId)
    .single();

  if (error) {
    console.error("Error fetching condition with category:", error);
    return null;
  }

  return {
    condition_name: data.condition_name,
    category_name: data.category_name,
  };
}
