import { relations, sql } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { users } from "./users";

export const posts = pgTable("post",{
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    content: text('content'),
    authorId:text("authorId").notNull().references(()=>users.id,{ onDelete: "cascade" })
})

export const postsRelations = relations(posts, ({ one }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id],
	}),
}));

export type Post = typeof posts.$inferSelect;