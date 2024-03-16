import { sqliteTable, index, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm'
import { users } from './users';

export const items = sqliteTable(
	'items',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		listId: integer('list_id')
			.references(() => lists.id)
			.notNull(),
		tierId: integer('tier_id').references(() => tiers.id),
		position: integer('position').notNull(),
		name: text('name').notNull(),
		description: text('description').notNull(),
		image: text('image').notNull(),
		lastUpdated: integer('last_updated').notNull(),
		updatedBy: integer('updated_by')
			.references(() => users.id)
			.notNull(),
		created: integer('created').notNull(),
		createdBy: integer('created_by')
			.references(() => users.id)
			.notNull(),
		deletedBy: integer('deleted_by').references(() => users.id),
		deleted: integer('deleted')
	},
	(table) => {
		return {
			idxItemsName: index('idx_items_name').on(table.name),
			idxItemsPosition: index('idx_items_position').on(table.position),
			idxItemsDeleted: index('idx_items_deleted').on(table.deleted)
		};
	}
);

export const itemRelations = relations(items, ({ one }) => ({
	tier: one(tiers, {
		fields: [items.tierId],
		references: [tiers.id]
	}),
	list: one(lists, {
		fields: [items.listId],
		references: [lists.id]
	}),
	createdByUser: one(users, {
		fields: [items.createdBy],
		references: [users.id]
	}),
	updatedByUser: one(users, {
		fields: [items.updatedBy],
		references: [users.id]
	}),
	deletedByUser: one(users, {
		fields: [items.deletedBy],
		references: [users.id]
	})
}));

export const tiers = sqliteTable(
	'tiers',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		listId: integer('list_id')
			.references(() => lists.id)
			.notNull(),
		position: integer('position').notNull(),
		color: text('color').notNull(),
		name: text('name').notNull(),
		description: text('description').notNull(),
		lastUpdated: integer('last_updated').notNull(),
		updatedBy: integer('updated_by')
			.references(() => users.id)
			.notNull(),
		created: integer('created').notNull(),
		createdBy: integer('created_by')
			.references(() => users.id)
			.notNull(),
		deletedBy: integer('deleted_by').references(() => users.id),
		deleted: integer('deleted')
	},
	(table) => {
		return {
			idxTiersName: index('idx_tiers_name').on(table.name),
			idxTiersListId: index('idx_tiers_list_id').on(table.listId),
			idxTiersPosition: index('idx_tiers_position').on(table.position),
			idxTiersDeleted: index('idx_tiers_deleted').on(table.deleted)
		};
	}
);

export const tierRelations = relations(tiers, ({ one, many }) => ({
	list: one(lists, {
		fields: [tiers.listId],
		references: [lists.id]
	}),
	items: many(items),
	createdByUser: one(users, {
		fields: [tiers.createdBy],
		references: [users.id]
	}),
	updatedByUser: one(users, {
		fields: [tiers.updatedBy],
		references: [users.id]
	}),
	deletedByUser: one(users, {
		fields: [tiers.deletedBy],
		references: [users.id]
	})
}));

export const lists = sqliteTable(
	'lists',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		name: text('name').notNull(),
		description: text('description').notNull(),
		lastUpdated: integer('last_updated').notNull(),
		updatedBy: integer('updated_by')
			.references(() => users.id)
			.notNull(),
		created: integer('created').notNull(),
		createdBy: integer('created_by')
			.references(() => users.id)
			.notNull(),
		deletedBy: integer('deleted_by').references(() => users.id),
		deleted: integer('deleted')
	},
	(table) => {
		return {
			idxListsName: index('idx_lists_name').on(table.name),
			idxListsDeleted: index('idx_lists_deleted').on(table.deleted)
		};
	}
);

export const listRelations = relations(lists, ({ one, many }) => ({
	tiers: many(tiers),
	items: many(items),
	createdByUser: one(users, {
		fields: [lists.createdBy],
		references: [users.id]
	}),
	updatedByUser: one(users, {
		fields: [lists.updatedBy],
		references: [users.id]
	}),
	deletedByUser: one(users, {
		fields: [lists.deletedBy],
		references: [users.id]
	})
}));

export type Item = typeof items.$inferSelect;
export type Tier = typeof tiers.$inferSelect;
export type TierList = typeof lists.$inferSelect & { tiers: Tier[] };
