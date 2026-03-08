import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Comet Navigation — Your Academic Life, Automatically Organized",
  description:
    "Connect your classes, events, and goals in one rugged, smart workspace designed for explorers of knowledge. Stop managing schedules, start mastering subjects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-[#121212] text-[#f1f5f9]">{children}</body>
    </html>
  );
}
