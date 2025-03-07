import { Title } from "@/app/components/blog/Title";

export default async function RemixFeatureFlags() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-theme(space.16))] max-w-[740px] flex-col content-center bg-white p-6 dark:bg-black md:p-10 lg:p-8 lg:px-16 lg:py-12">
      <Title title="CSS Solar System" />
    </main>
  );
}
