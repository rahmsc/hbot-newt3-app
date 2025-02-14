import { pgTable, integer, text, varchar, boolean, timestamp, vector, index } from "drizzle-orm/pg-core";

export const studies = pgTable("studies", {
  id: integer("id").primaryKey(),
  condition_id: integer("condition_id"),
  heading: text("heading").notNull(),
  published_date: varchar("published_date", { length: 255 }),
  study_link: text("study_link"),
  authors: text("authors"),
  pressure_used: text("pressure_used"),
  number_of_treatments: integer("number_of_treatments"),
  peer_reviewed: boolean("peer_reviewed"),
  public_data: boolean("public_data"),
  funded: boolean("funded"),
  outcome_rating: text("outcome_rating"),
  summary: text("summary"),
  introduction: text("introduction"),
  outcomes: text("outcomes"),
  results: text("results"),
  conclusion: text("conclusion"),
  conflicts_of_interest: text("conflicts_of_interest"),
  content_embedding: vector("content_embedding", { dimensions: 1536 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow()
}, (table) => [
  index("content_embedding_idx").using(
    "hnsw",
    table.content_embedding.op("vector_cosine_ops"),
  ),
]); 