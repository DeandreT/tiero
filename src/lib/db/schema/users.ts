import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
	'users',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		email: text('email').notNull().unique(),
		name: text('name').notNull(),
		created: integer('created').notNull(),
		updated: integer('updated'),
    image: text('image')
	},
	(table) => {
		return {
			idxUsersEmail: index('idx_users_email').on(table.email)
		};
	}
);

export const activities = sqliteTable(
  'activities',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    activity: text('activity').notNull(),
    created: integer('created').notNull()
  },
  (table) => {
    return {
      idxActivitiesActivity: index('idx_activities_activity').on(table.activity)
    };
  }
);

export const userActivity = sqliteTable(
  'user_activity',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').references(() => users.id).notNull(),
    activityId: integer('activity_id').references(() => activities.id).notNull(),
    created: integer('created').notNull()
  },
  (table) => {
    return {
      idxUserActivityUserId: index('idx_user_activity_user_id').on(table.userId),
      idxUserActivityActivityId: index('idx_user_activity_activity_id').on(table.activityId)
    };
  }
);

export const userRelations = {
  userActivity: {
    fields: [users.id],
    references: [userActivity.userId]
  }
};

export const userActivityRelations = {
  user: {
    fields: [userActivity.userId],
    references: [users.id]
  }
};

export const activityRelations = {
  userActivity: {
    fields: [activities.id],
    references: [userActivity.activityId]
  }
};

export type User = typeof users.$inferSelect;