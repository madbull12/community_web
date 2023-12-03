import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./users";

export const posts = pgTable("post",{
    id: serial("id").notNull().primaryKey(),
    content: text('content'),
    authorId:text("authorId").notNull()
})

export const postsRelations = relations(posts, ({ one }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id],
	}),
}));