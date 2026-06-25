Hello, my name is Alex Greco. This application is my personal portfolio built with NextJS and Typescript. You can contact me via email here: alex.k.greco.4@gmail.com.

## Adding a New Blog Post to Stats Tracking

Blog post view counts are tracked in a Neon Postgres database via Drizzle ORM. When you add a new blog post, follow these steps to have it appear on the `/blog/stats` page.

### 1. Add an entry to the `BlogPostCookieNames` enum

Open `app/(portfolio)/blog/utils.ts` and add a new value to the enum. The value should match the URL slug of the new post.

```ts
export enum BlogPostCookieNames {
  REMIX_FEATURE_FLAGS = "remix-feature-flags",
  ONE_PERCENT_AI = "one-percent-ai", // new entry
}
```

### 2. Run the seed script

The seed script checks for existing rows and only inserts missing ones, so it is safe to run at any time.

```bash
npx dotenv-cli -e .env.local -- npx tsx db/blog-seed.ts
```

You should see `New Blog created: <slug>` printed for each newly inserted row, followed by a list of all records in the table.
