"use client";

import { ThemeProvider } from "next-themes";

type ThemeProviderProps = Parameters<typeof ThemeProvider>[0];

export function AppProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider {...props} enableSystem>
      {children}
    </ThemeProvider>
  );
}
