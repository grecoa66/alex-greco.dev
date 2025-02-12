import Link from "next/link";

export default function Blog() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-theme(space.16))] max-w-[840px] flex-col content-center bg-white p-6 dark:bg-black md:p-10 lg:p-8 lg:px-16 lg:py-12">
      <div>List of blog posts</div>
      <Link href="/blog/remix-feature-flags">
        {" "}
        <button className="z-20 inline-block w-auto text-celtic-400 hover:translate-x-1 hover:rotate-3 hover:text-celtic-200 dark:text-mint-400 hover:dark:text-mint-700">
          Remix Feature Flags
        </button>
      </Link>
    </main>
  );
}
