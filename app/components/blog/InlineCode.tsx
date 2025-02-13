export const InlineCode = ({ children }: { children: React.ReactNode }) => {
  return (
    <code className="rounded bg-gray-200 px-1 dark:bg-gray-600">
      {children}
    </code>
  );
};
