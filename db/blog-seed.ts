import { eq } from "drizzle-orm";
import { BlogPostCookieNames } from "@/app/(portfolio)/blog/utils";
import { db } from "./index";
import { blogPostTable } from "./schema";

async function seed() {
  for (let title of Object.values(BlogPostCookieNames)) {
    const blogPost = await db
      .select()
      .from(blogPostTable)
      .where(eq(blogPostTable.title, title));

    if (blogPost.length === 0) {
      const blog: typeof blogPostTable.$inferInsert = {
        title: title,
        views: 0,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };
      await db.insert(blogPostTable).values(blog);
      console.log(`New Blog created: ${title}`);
    }
  }

  const blogs = await db.select().from(blogPostTable);
  console.log("Getting all Blogs from the database: ", blogs);
}

seed();
