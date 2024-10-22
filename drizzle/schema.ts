import { sqliteTable, AnySQLiteColumn, integer, text } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const users = sqliteTable("users", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	username: text(),
	name: text(),
	email: text(),
});

export const posts = sqliteTable("posts", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	authorId: integer("author_id"),
	postedAt: text("posted_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
	title: text(),
	imageUrl: text("image_url"),
	description: text(),
	content: text(),
});

