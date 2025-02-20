import { db } from "./index";
import { blogPostTable } from "./schema";

async function seed() {
  const user: typeof blogPostTable.$inferInsert = {
    title: "remix-feature-flags",
    views: 0,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  };

  await db.insert(blogPostTable).values(user);
  console.log("New Blog created!");

  const blogs = await db.select().from(blogPostTable);
  console.log("Getting all Blogs from the database: ", blogs);
}

seed();
