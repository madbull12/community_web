import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const posts = pgTable("post",{
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
	title:text("title").notNull(),
	media:text("media"),
	link:text("link").array(),
    content: text('content'),
    authorId:text("authorId").notNull().references(()=>users.id,{ onDelete: "cascade" }),
	createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const postsRelations = relations(posts, ({ one }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id],
	}),
}));

export type Post = typeof posts.$inferSelect;