import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  tag: string;
  description: string;
  date: string;
  readTime: number;
};

const posts: Post[] = [
  {
    slug: "one-percent-ai",
    title: "1% AI",
    tag: "Essay",
    description:
      "How our engineering team went from writing 1% of production code with AI to 99%, and what changed along the way.",
    date: "2026-06-25",
    readTime: 5,
  },
  {
    slug: "remix-feature-flags",
    title: "Remix Feature Flags",
    tag: "Tools",
    description:
      "How to implement feature flags in a Remix app without a third-party service, keeping control in your own hands.",
    date: "2024-01-23",
    readTime: 7,
  },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase()
    .replace(",", "");
}

export default function Blog() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-theme(space.16))] max-w-[840px] flex-col bg-black p-6 dark:bg-black md:p-10 lg:px-16 lg:py-12">
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-white">
          Writing
        </h1>
        <p className="text-white-500">
          Thoughts on design, tools, and working quietly on the internet.
        </p>
      </div>

      <div className="border-t border-white-900">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <article className="grid grid-cols-[140px_1fr] gap-6 border-b border-white-900 py-8 transition-colors hover:bg-white/[0.02]">
              <time
                dateTime={post.date}
                className="pt-0.5 font-mono text-xs tracking-widest text-white-500"
              >
                {formatDate(post.date)}
              </time>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-base font-medium text-white">
                    {post.title}
                  </span>
                  <span className="rounded border border-white-800 px-2 py-0.5 text-xs text-white-500">
                    {post.tag}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-white-500">
                  {post.description}
                </p>
                <span className="text-xs text-white-700">
                  {post.readTime} min read
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
