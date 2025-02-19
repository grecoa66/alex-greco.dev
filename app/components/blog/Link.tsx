export const Link = ({ href, text }: { href: string; text: string }) => {
  return (
    <a
      href={href}
      target="_blank"
      className="text-everglade-400 hover:text-everglade-200 dark:text-mint-500 hover:dark:text-mint-600"
    >
      {text}
    </a>
  );
};
