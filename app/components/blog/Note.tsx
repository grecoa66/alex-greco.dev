export const Note = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-4 flex flex-row gap-4">
      <div className="rounded-full border-2 border-everglade-600 dark:border-mint-600"></div>
      <p className=" rounded-lg bg-gray-100 p-2 dark:bg-gray-800">{children}</p>
    </div>
  );
};
