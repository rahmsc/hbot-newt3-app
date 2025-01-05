import { createClient } from "./client";

export interface RandomArticleItemProps {
  id: number;
  heading: string;
  conditionId: number;
  summary?: string;
  pressure_used?: string;
  number_of_treatments?: number;
  published_date?: Date;
  peer_reviewed?: boolean;
  public_data?: boolean;
  funded?: boolean;
  outcome_rating?: string;
}

export default async function getRandomArticles(
  count = 4,
  conditionId?: string,
): Promise<RandomArticleItemProps[]> {
  const supabase = createClient();
  try {
    let query = supabase
      .from("studies")
      .select(
        `
        id,
        heading,
        condition_id,
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
      .lte("id", 99)
      .limit(count);

    if (conditionId) {
      query = query.eq("condition_id", conditionId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching data:", error);
      throw error;
    }

    if (!data) {
      return [];
    }

    return data.map((record) => ({
      id: record.id as number,
      heading: record.heading as string,
      conditionId: record.condition_id as number,
      summary: record.summary as string,
      pressure_used: record.pressure_used as string,
      number_of_treatments: record.number_of_treatments as number,
      published_date: record.published_date as Date,
      peer_reviewed: record.peer_reviewed as boolean,
      public_data: record.public_data as boolean,
      funded: record.funded as boolean,
      outcome_rating: record.outcome_rating as string,
    }));
  } catch (error) {
    console.error("Error in getRandomArticles:", error);
    throw error;
  }
}
