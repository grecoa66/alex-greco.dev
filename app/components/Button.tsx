import Link from "next/link";
import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

type buttonVariants = "base" | "danger";

const getbuttonStyles = (variant: buttonVariants) => {
  const baseStyles =
    "flex flex-row items-center justify-center space-x-2 rounded-lg border-2";
  switch (variant) {
    case "base": {
      return twMerge(
        baseStyles,
        "border-everglade p-2 hover:bg-everglade hover:text-white dark:border-mint dark:hover:bg-mint dark:hover:text-black",
      );
    }
    case "danger": {
      return twMerge(
        baseStyles,
        "border-red-400 p-3 text-red-400 hover:bg-red-400 hover:text-white",
      );
    }
    default: {
      const exhaustiveCheck: never = variant;
      return exhaustiveCheck;
    }
  }
};

export const Button = ({
  text,
  variant = "base",
  className,
  StartIcon,
  EndIcon,
  ...props
}: {
  text: string;
  variant?: buttonVariants;
  className?: string;
  StartIcon?: IconType;
  EndIcon?: IconType;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props} className={twMerge(getbuttonStyles(variant), className)}>
      {StartIcon && <StartIcon />}
      <span>{text}</span>
      {EndIcon && <EndIcon />}
    </button>
  );
};

export const LinkButton = ({
  href,
  text,
  variant = "base",
  className,
  StartIcon,
  EndIcon,
}: {
  href: string;
  text: string;
  variant?: buttonVariants;
  className?: string;
  StartIcon?: IconType;
  EndIcon?: IconType;
}) => {
  return (
    <Link href={href} className={twMerge(getbuttonStyles(variant), className)}>
      {StartIcon && <StartIcon />}
      <button type="button">{text}</button>
      {EndIcon && <EndIcon />}
    </Link>
  );
};