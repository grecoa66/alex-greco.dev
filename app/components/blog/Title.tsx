import "~/components/Header.css";
export const Title = ({ title }: { title: string }) => {
  return <h1 className="name-gradient my-4 text-4xl font-bold">{title}</h1>;
};
