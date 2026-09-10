"use client";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

const emptySubscribe = () => () => {};

export const DarkModeButton = () => {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const { theme, systemTheme, setTheme } = useTheme();

  if (!mounted) {
    return null;
  }

  const iconClass = "hover:fill-everglade hover:dark:fill-mint h-5 w-5";

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      {resolvedTheme === "dark" ? (
        <button onClick={() => setTheme("light")}>
          <FaSun className={iconClass} />
        </button>
      ) : (
        <button onClick={() => setTheme("dark")}>
          <FaMoon className={iconClass} />
        </button>
      )}
    </>
  );
};
