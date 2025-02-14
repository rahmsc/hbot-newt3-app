CREATE TABLE "studies" (
	"id" integer PRIMARY KEY NOT NULL,
	"condition_id" integer,
	"heading" text NOT NULL,
	"published_date" varchar(255),
	"study_link" text,
	"authors" text,
	"pressure_used" text,
	"number_of_treatments" integer,
	"peer_reviewed" boolean,
	"public_data" boolean,
	"funded" boolean,
	"outcome_rating" text,
	"summary" text,
	"introduction" text,
	"outcomes" text,
	"results" text,
	"conclusion" text,
	"conflicts_of_interest" text,
	"content_embedding" vector(1536) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX "content_embedding_idx" ON "studies" USING hnsw ("content_embedding" vector_cosine_ops);