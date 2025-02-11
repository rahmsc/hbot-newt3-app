export async function fetchSavedItems(
  supabase: SupabaseClient,
  userId: string,
) {
  const { data: savedArticles, error: articlesError } = await supabase
    .from("saved_articles")
    .select("article_id")
    .eq("user_id", userId);

  if (articlesError) {
    console.error("Error fetching saved articles:", articlesError);
    return [];
  }

  return savedArticles;
}
