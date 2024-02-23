import { relations, sql } from "drizzle-orm";
import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { tags } from "./tags";

export const posts = pgTable("post", {
  id: text("id")
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  media: text("media"),

  content: text("content"),
  authorId: text("authorId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
export const postTags = pgTable("post_tags", {
  postId: text("post_id")
    .notNull()
    .references(() => posts.id),
  tagId: text("tag_id")
    .notNull()
    .references(() => tags.id),

},(t)=>({
  primaryKey:primaryKey(t.postId,t.tagId)
}));


export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  postTags: many(postTags)

}));


export const postTagRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  }),
}));
export type Post = typeof posts.$inferSelect;
