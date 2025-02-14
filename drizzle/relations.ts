import { relations } from "drizzle-orm/relations";
import { usersInAuth, profiles, conditions, studiesOld, categories, categoryCondition, studies } from "./schema";

export const profilesRelations = relations(profiles, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [profiles.id],
		references: [usersInAuth.id]
	}),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	profiles: many(profiles),
}));

export const studiesOldRelations = relations(studiesOld, ({one}) => ({
	condition: one(conditions, {
		fields: [studiesOld.conditionId],
		references: [conditions.id]
	}),
}));

export const conditionsRelations = relations(conditions, ({many}) => ({
	studiesOlds: many(studiesOld),
	categoryConditions: many(categoryCondition),
	studies: many(studies),
}));

export const categoryConditionRelations = relations(categoryCondition, ({one}) => ({
	category: one(categories, {
		fields: [categoryCondition.categoryId],
		references: [categories.id]
	}),
	condition: one(conditions, {
		fields: [categoryCondition.conditionId],
		references: [conditions.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	categoryConditions: many(categoryCondition),
}));

export const studiesRelations = relations(studies, ({one}) => ({
	condition: one(conditions, {
		fields: [studies.conditionId],
		references: [conditions.id]
	}),
}));