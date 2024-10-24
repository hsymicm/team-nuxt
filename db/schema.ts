import { relations, sql, type InferSelectModel } from "drizzle-orm"
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("users", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	username: text().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	profile: text()
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}))

export const posts = sqliteTable("posts", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	authorId: integer("author_id"),
	postedAt: text("posted_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
	title: text(),
	imageUrl: text("image_url"),
	description: text(),
	content: text(),
})

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}))

export const testimonials = sqliteTable("testimonials", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
  rating: integer().notNull(),
	name: text(),
  position: text(),
  review: text(),
  profileUrl: text("profile_url"),
})

export const sessions = sqliteTable("session", {
	id: text("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id),
	expiresAt: integer("expires_at", {
		mode: "timestamp"
	}).notNull()
});

export type Sessions = InferSelectModel<typeof sessions>
export type Users = InferSelectModel<typeof users>
export type Posts = InferSelectModel<typeof posts>
export type Testimonials = InferSelectModel<typeof testimonials>