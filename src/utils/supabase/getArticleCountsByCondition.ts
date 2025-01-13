import { createClient } from "@supabase/supabase-js";

export async function getArticleCountsByCondition() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  );

  // Using count() with groupBy for more efficient counting
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error } = await supabase
    .from("articles")
    .select("condition_id, count(*)", { count: "exact" });

  if (error) {
    console.error("Error fetching article counts:", error);
    return {};
  }

  // Transform the response into a Record<number, number>
  console.log(data);
  return data;
}
