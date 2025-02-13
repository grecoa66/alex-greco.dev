export const Heading = ({ title, id }: { title: string; id: string }) => {
  return (
    <h2
      id={`${id}`}
      className="mt-4 text-xl text-celtic-200 dark:text-mint-600"
    >
      {title}
    </h2>
  );
};
