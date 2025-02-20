import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};

export const blogPostTable = pgTable("blog_posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull().unique(),
  views: integer().default(0),
  last_viewed: timestamp().defaultNow().notNull(),
  ...timestamps,
});
