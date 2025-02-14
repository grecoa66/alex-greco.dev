export const Heading = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  return (
    <h2
      id={`${id}`}
      className="mt-4 text-xl text-celtic-200 dark:text-mint-600"
    >
      {children}
    </h2>
  );
};
