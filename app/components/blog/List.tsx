import { twMerge } from "tailwind-merge";

export const List = ({ children }: { children: React.ReactNode }) => {
  return <ul className="list-inside list-disc">{children}</ul>;
};

export const ListItem = ({
  children,
  indented = false,
}: {
  children: React.ReactNode;
  indented?: boolean;
}) => {
  return <li className={twMerge("my-2", indented && "ml-4")}>{children}</li>;
};
