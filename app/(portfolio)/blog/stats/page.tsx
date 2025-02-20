import { Title } from "@/app/components/blog/Title";
import { getAllBlogRecords } from "../actions";

export default async function RemixFeatureFlags() {
  const blogRecords = await getAllBlogRecords();

  return (
    <main className="mx-auto flex min-h-[calc(100vh-theme(space.16))] max-w-[740px] flex-col content-center bg-white p-6 dark:bg-black md:p-10 lg:p-8 lg:px-16 lg:py-12">
      <Title title="Blog Stats" />
      <div>
        {blogRecords.map((record) => (
          <div
            key={record.id}
            className="my-4 rounded-lg border-2 border-everglade-500 p-4 dark:border-mint-400"
          >
            <p>Title: {record.title}</p>
            <p>Views: {record.views}</p>
            <p>Created: {new Date(record.created_at).toLocaleDateString()}</p>
            {record.updated_at && (
              <p>
                Last Updated: {new Date(record.updated_at).toLocaleString()}
              </p>
            )}
            <p>Last Viewed: {new Date(record.last_viewed).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
