import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { postTags } from "./";

export const tags = pgTable("tags",{
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
	tag:text("tag").notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
    postTags: many(postTags),
  }));
  
export type Tag = typeof tags.$inferSelect;
