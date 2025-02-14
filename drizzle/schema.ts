import { pgTable, index, foreignKey, unique, pgPolicy, check, uuid, timestamp, text, integer, serial, boolean, vector, date, varchar, bigint, bigserial, jsonb } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const profiles = pgTable("profiles", {
	id: uuid().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
	fullName: text("full_name"),
	username: text(),
	email: text(),
	avatarUrl: text("avatar_url"),
	website: text(),
	location: text(),
	company: text(),
	savedArticles: integer("saved_articles").array(),
}, (table) => [
	index("profiles_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("profiles_username_idx").using("btree", table.username.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.id],
			foreignColumns: [users.id],
			name: "profiles_id_fkey"
		}).onDelete("cascade"),
	unique("profiles_username_key").on(table.username),
	unique("profiles_email_key").on(table.email),
	pgPolicy("Users can delete own profile or admin can delete any", { as: "permissive", for: "delete", to: ["public"], using: sql`((auth.uid() = id) OR is_admin())` }),
	pgPolicy("Users can insert own profile or admin can insert any", { as: "permissive", for: "insert", to: ["public"] }),
	pgPolicy("Users can update own profile or admin can update any", { as: "permissive", for: "update", to: ["public"] }),
	pgPolicy("Profiles are viewable by everyone", { as: "permissive", for: "select", to: ["public"] }),
	pgPolicy("Users can update their own profile", { as: "permissive", for: "update", to: ["public"] }),
	pgPolicy("Users can insert their own profile", { as: "permissive", for: "insert", to: ["public"] }),
	pgPolicy("Public profiles are viewable by everyone", { as: "permissive", for: "select", to: ["public"] }),
	check("username_length", sql`char_length(username) >= 3`),
]);

export const customers = pgTable("customers", {
	id: serial().primaryKey().notNull(),
	email: text().notNull(),
	name: text().notNull(),
	isRefunded: boolean("is_refunded").default(false).notNull(),
	refundReason: text("refund_reason"),
}, (table) => [
	unique("customers_email_unique").on(table.email),
]);

export const memories = pgTable("memories", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	content: text().notNull(),
	tokenCount: integer("token_count").notNull(),
	embedding: vector({ dimensions: 256 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("embedding_index").using("hnsw", table.embedding.asc().nullsLast().op("vector_cosine_ops")),
]);

export const categories = pgTable("categories", {
	id: serial().primaryKey().notNull(),
	categoryName: text("category_name").notNull(),
});

export const studiesOld = pgTable("studies_old", {
	id: serial().notNull(),
	conditionId: integer("condition_id").notNull(),
	heading: text().notNull(),
	publishedDate: date("published_date"),
	studyLink: text("study_link"),
	authors: text(),
	pressureUsed: text("pressure_used"),
	numberOfTreatments: integer("number_of_treatments"),
	peerReviewed: boolean("peer_reviewed").default(false),
	publicData: boolean("public_data").default(false),
	funded: boolean().default(false),
	outcomeRating: text("outcome_rating"),
	summary: text().primaryKey().notNull(),
	introduction: text(),
	outcomes: text(),
	results: text(),
	conclusion: text(),
	conflictsOfInterest: text("conflicts_of_interest"),
	imageUrl: text("image_url"),
	contentEmbedding: vector("content_embedding", { dimensions: 1536 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	funding: text(),
	outcome: text(),
}, (table) => [
	index("idx_studies_condition_id").using("btree", table.conditionId.asc().nullsLast().op("int4_ops")),
	index("idx_studies_embedding").using("ivfflat", table.contentEmbedding.asc().nullsLast().op("vector_cosine_ops")).with({lists: "100"}),
	foreignKey({
			columns: [table.conditionId],
			foreignColumns: [conditions.id],
			name: "studies_condition_id_fkey"
		}),
	check("studies_outcome_rating_check", sql`outcome_rating = ANY (ARRAY['Positive'::text, 'Neutral'::text, 'Negative'::text, 'N/A'::text])`),
]);

export const conditions = pgTable("conditions", {
	id: serial().primaryKey().notNull(),
	conditionName: varchar("condition_name", { length: 255 }).notNull(),
}, (table) => [
	unique("conditions_condition_name_key").on(table.conditionName),
]);

export const categoryCondition = pgTable("category_condition", {
	id: serial().primaryKey().notNull(),
	categoryId: integer("category_id").notNull(),
	conditionId: integer("condition_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "category_condition_category_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.conditionId],
			foreignColumns: [conditions.id],
			name: "category_condition_condition_id_fkey"
		}).onDelete("cascade"),
	unique("category_condition_category_id_condition_id_key").on(table.categoryId, table.conditionId),
]);

export const faqs = pgTable("faqs", {
	id: serial().primaryKey().notNull(),
	studyId: integer("study_id").notNull(),
	question: text().notNull(),
	answer: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	index("idx_faqs_study_id").using("btree", table.studyId.asc().nullsLast().op("int4_ops")),
]);

export const conditionWithCategory = pgTable("condition-with-category", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	categoryId: bigint("category_id", { mode: "number" }),
	categoryName: text("category_name"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	conditionId: bigint("condition_id", { mode: "number" }),
	conditionName: text("condition_name"),
}, (table) => [
	pgPolicy("Enable read access for all users", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
]);

export const studies = pgTable("studies", {
	id: integer().default(sql`nextval('studies_id_seq'::regclass)`).primaryKey().notNull(),
	conditionId: integer("condition_id").notNull(),
	heading: text().notNull(),
	publishedDate: text("published_date"),
	studyLink: text("study_link"),
	authors: text(),
	pressureUsed: text("pressure_used"),
	numberOfTreatments: integer("number_of_treatments"),
	peerReviewed: boolean("peer_reviewed").default(false),
	publicData: boolean("public_data").default(false),
	funded: boolean().default(false),
	outcomeRating: text("outcome_rating"),
	summary: text().notNull(),
	introduction: text(),
	outcomes: text(),
	results: text(),
	conclusion: text(),
	conflictsOfInterest: text("conflicts_of_interest"),
	imageUrl: text("image_url"),
	contentEmbedding: vector("content_embedding", { dimensions: 1536 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	funding: text(),
	outcome: text(),
	authours: text().array(),
}, (table) => [
	index("studies_duplicate_condition_id_idx").using("btree", table.conditionId.asc().nullsLast().op("int4_ops")),
	index("studies_duplicate_content_embedding_idx").using("ivfflat", table.contentEmbedding.asc().nullsLast().op("vector_cosine_ops")).with({lists: "100"}),
	foreignKey({
			columns: [table.conditionId],
			foreignColumns: [conditions.id],
			name: "studies_duplicate_condition_id_fkey"
		}),
	check("studies_outcome_rating_check", sql`outcome_rating = ANY (ARRAY['Positive'::text, 'Neutral'::text, 'Negative'::text, 'N/A'::text])`),
]);

export const documents = pgTable("documents", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	content: text(),
	metadata: jsonb(),
	embedding: vector({ dimensions: 1536 }),
	studyId: integer("study_id"),
});

export const subscribe = pgTable("subscribe", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "subscribe_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	email: text().notNull(),
	userId: uuid("user_id"),
}, (table) => [
	pgPolicy("Allow authenticated users to delete their emails", { as: "permissive", for: "delete", to: ["authenticated"], using: sql`true` }),
	pgPolicy("Allow authenticated users to select emails", { as: "permissive", for: "select", to: ["authenticated"] }),
	pgPolicy("Allow authenticated users to insert emails", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Enable read for service role", { as: "permissive", for: "select", to: ["service_role"] }),
	pgPolicy("Enable insert for service role", { as: "permissive", for: "insert", to: ["service_role"] }),
]);
