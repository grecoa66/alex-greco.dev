"use client";
import { useRef, useState } from "react";
import useOnClickOutside from "../hooks/useClickOutside";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { FaBars, FaCog, FaCoins, FaMoon, FaSun } from "react-icons/fa";
import Link from "next/link";
import { Transition } from "@headlessui/react";

export const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  const { setTheme } = useTheme();
  const buttonStyle =
    "right-0 top-6 flex w-36 flex-row items-center space-x-2 p-2 text-celtic dark:text-everglade-400 hover:text-everglade dark:hover:text-everglade-200";

  return (
    <div className="relative" ref={ref}>
      <button
        className="text-celtic duration-300 hover:scale-110 hover:text-everglade dark:text-everglade-400 dark:hover:text-everglade-200"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars className="text-lg" />
      </button>

      <Transition
        show={isOpen}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={twMerge(
            "absolute right-0 top-6 flex flex-col rounded-lg border-2 border-everglade bg-white transition-all duration-300 dark:bg-black",
            isOpen ? "opacity-100" : "opacity-0",
          )}
        >
          <Link className={buttonStyle} href="/under-over">
            <FaCoins />
            <p>Under Overs</p>
          </Link>
          <div className="h-0.5 border-t-2 border-celtic dark:border-everglade-400" />
          <button className={buttonStyle} onClick={() => setTheme("system")}>
            <FaCog /> <span>System</span>
          </button>
          <button className={buttonStyle} onClick={() => setTheme("light")}>
            <FaSun /> <span>Light</span>
          </button>
          <button className={buttonStyle} onClick={() => setTheme("dark")}>
            <FaMoon /> <span>Dark</span>
          </button>
        </div>
      </Transition>
    </div>
  );
};