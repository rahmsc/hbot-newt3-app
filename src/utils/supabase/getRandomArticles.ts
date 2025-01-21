/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { PostgrestError } from "@supabase/supabase-js";

import { createClient } from "./client";

interface StudyRecord {
  id: number;
  heading: string;
  condition_id: number;
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
  number_of_treatments?: number;
  published_date?: Date;
  peer_reviewed?: boolean;
  public_data?: boolean;
  funded?: boolean;
  outcome_rating?: string;
}

export default async function getRandomArticles(
  count = 5,
  conditionId?: string,
): Promise<RandomArticleItemProps[]> {
  const supabase = createClient();

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

  // Handle multiple condition IDs
  if (conditionId) {
    const conditionIds = conditionId
      .split(",")
      .map((id) => Number.parseInt(id.trim()));
    query = query.in("condition_id", conditionIds);
  }

  return Promise.resolve(
    query.then(
      ({
        data,
        error,
      }: {
        data: StudyRecord[] | null;
        error: PostgrestError | null;
      }) => {
        if (error) {
          console.error("Error fetching data:", error);
          throw new Error(error.message);
        }

        if (!data) {
          return [];
        }

        return data.map(
          (record: StudyRecord): RandomArticleItemProps => ({
            id: record.id,
            heading: record.heading,
            conditionId: record.condition_id,
            summary: record.summary ?? undefined,
            pressure_used: record.pressure_used ?? undefined,
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
      },
    ),
  ).catch((error: unknown) => {
    console.error("Error in getRandomArticles:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch articles: ${error.message}`);
    }
    throw new Error("Failed to fetch articles");
  });
}
