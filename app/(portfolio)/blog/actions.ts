import { eq } from "drizzle-orm";
import { db } from "@/db";
import { blogPostTable } from "@/db/schema";

export async function getBlogRecord(title: string) {
  const blogPost = await db
    .select()
    .from(blogPostTable)
    .where(eq(blogPostTable.title, title));

  return blogPost[0];
}

export async function getAllBlogRecords() {
  const blogPost = (await db.select().from(blogPostTable)).sort((a, b) => {
    if (a.views !== null && b.views !== null) {
      return b.views - a.views;
    }
    if (a.views === null && b.views !== null) {
      return 1;
    }
    if (a.views !== null && b.views === null) {
      return -1;
    }
    return 0;
  });

  return blogPost;
}

export async function incrementBlogViewCount(title: string) {
  const blogPost = await db
    .select({
      views: blogPostTable.views,
      id: blogPostTable.id,
      deleted_at: blogPostTable.deleted_at,
    })
    .from(blogPostTable)
    .where(eq(blogPostTable.title, title));

  if (
    blogPost.length === 0 ||
    (blogPost[0] && blogPost[0]?.deleted_at !== null)
  ) {
    return;
  }

  await db
    .update(blogPostTable)
    .set({
      views: blogPost[0].views === null ? 1 : blogPost[0].views + 1,
      updated_at: new Date(),
    })
    .where(eq(blogPostTable.id, blogPost[0].id));
}

export async function updateLastViewed(title: string) {
  await db
    .update(blogPostTable)
    .set({
      last_viewed: new Date(),
    })
    .where(eq(blogPostTable.title, title));
}

export async function softDeleteBlog(id: number) {
  await db
    .update(blogPostTable)
    .set({
      deleted_at: new Date(),
      updated_at: new Date(),
    })
    .where(eq(blogPostTable.id, id));
}
