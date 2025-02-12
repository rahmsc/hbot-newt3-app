import { createClient } from "~/utils/supabase/client";

interface StudyRecord {
  id: number;
  heading: string;
  condition_id: number;
  authors: string | null;
  summary: string | null;
  pressure_used: string | null;
  number_of_treatments: number | null;
  published_date: string | null;
  peer_reviewed: boolean | null;
  public_data: boolean | null;
  funded: boolean | null;
  outcome_rating: string | null;
}

export interface RandomArticleItemProps {
  id: number;
  heading: string;
  conditionId: number;
  summary?: string;
  pressure_used?: string;
  authors?: string;
  number_of_treatments?: number;
  published_date?: Date;
  peer_reviewed?: boolean;
  public_data?: boolean;
  funded?: boolean;
  outcome_rating?: string;
  conditionName?: string;
}

export default async function getLatestArticles(
  count = 5,
  conditionId?: string,
): Promise<RandomArticleItemProps[]> {
  const supabase = createClient();

  // console.log(
  //   `Fetching ${count} latest articles. Condition ID: ${conditionId || "None"}`,
  // );

  let query = supabase
    .from("studies")
    .select(
      `
      id,
      heading,
      condition_id,
      authors,
      summary,
      pressure_used,
      number_of_treatments,
      published_date,
      peer_reviewed,
      public_data,
      funded,
      outcome_rating
    `,
    )
    .not("published_date", "is", null) // Exclude null dates
    .order("published_date", { ascending: false }) // Latest dates first
    .limit(count);

  // Handle multiple condition IDs
  if (conditionId) {
    const conditionIds = conditionId
      .split(",")
      .map((id) => Number.parseInt(id.trim()));
    query = query.in("condition_id", conditionIds);
    // console.log(`Filtering by condition IDs: ${conditionIds.join(", ")}`);
  }

  try {
    const { data, error } = await query;

    if (error) {
      console.error("Error fetching data:", error);
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      console.log("No articles found");
      return [];
    }

    // console.log(`Found ${data.length} articles`);

    return data.map(
      (record: StudyRecord): RandomArticleItemProps => ({
        id: record.id,
        heading: record.heading,
        conditionId: record.condition_id,
        summary: record.summary ?? undefined,
        pressure_used: record.pressure_used ?? undefined,
        authors: record.authors ?? undefined,
        number_of_treatments: record.number_of_treatments ?? undefined,
        published_date: record.published_date
          ? new Date(record.published_date)
          : undefined,
        peer_reviewed: record.peer_reviewed ?? undefined,
        public_data: record.public_data ?? undefined,
        funded: record.funded ?? undefined,
        outcome_rating: record.outcome_rating ?? undefined,
      }),
    );
  } catch (error: unknown) {
    console.error("Error in getRandomArticles:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch articles: ${error.message}`);
    }
    throw new Error("Failed to fetch articles");
  }
}
