import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { blogPostTable } from "./schema";

const db = drizzle(process.env.NEON_POSTGRES_DATABASE_URL!);

async function main() {
  const user: typeof blogPostTable.$inferInsert = {
    title: "Test Blog",
    views: 0,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  };

  await db.insert(blogPostTable).values(user);
  console.log("New Blog created!");

  const blogs = await db.select().from(blogPostTable);
  console.log("Getting all Blogs from the database: ", blogs);

  await db
    .update(blogPostTable)
    .set({
      views: 1,
    })
    .where(eq(blogPostTable.title, blogs[0].title));
  console.log("Blog info updated!");

  await db.delete(blogPostTable).where(eq(blogPostTable.title, blogs[0].title));
  console.log("Blog deleted!");
}

main();
