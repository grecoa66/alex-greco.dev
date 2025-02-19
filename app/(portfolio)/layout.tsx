import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProvider } from "../components/providers";
import { Header } from "../components/Header";

import "../globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

const domain =
  process.env.NODE_ENV === "production"
    ? process.env.domain!
    : "http://localhost:3000";

export const metadata: Metadata = {
  title: "Alex Greco",
  description: "Frontend Engineer",
  metadataBase: new URL(domain),
  openGraph: {
    title: "Alex Greco",
    description: "Frontend Engineer",
    images: {
      url: "/sharing-card.jpg",
      width: 800,
      height: 520,
    },
  },
  twitter: {
    title: "Alex Greco",
    description: "Frontend Engineer",
    card: "summary_large_image",
    images: { url: "/sharing-card.jpg", width: 800, height: 520 },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={twMerge(inter.className, "relative bg-white  dark:bg-black")}
      >
        <AppProvider attribute="class">
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
