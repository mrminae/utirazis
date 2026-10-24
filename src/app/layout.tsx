import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Keep language and direction centralized so RTL can be enabled without
// rewriting component layout styles.
const STORE_LANGUAGE = "en";
const STORE_DIRECTION = "ltr";

export const metadata: Metadata = {
  title: "Utirazis | Computing, Refined",
  description:
    "Discover thoughtfully selected PC components and computing essentials at Utirazis.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang={STORE_LANGUAGE}
      dir={STORE_DIRECTION}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
