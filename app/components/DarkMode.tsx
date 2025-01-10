"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

export const DarkModeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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
