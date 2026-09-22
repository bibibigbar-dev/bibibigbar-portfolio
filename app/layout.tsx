import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getCurrentUser, getActiveBoards } from "@/lib/queries";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "Living in Dallas",
    template: "%s · Living in Dallas",
  },
  description:
    "A community hub for people building everyday life in Dallas — tips, housing, food, jobs, and neighbor talk.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, boards] = await Promise.all([getCurrentUser(), getActiveBoards()]);

  return (
    <html lang="en">
      <body className={`${manrope.variable} ${fraunces.variable} font-sans antialiased`}>
        <SiteHeader user={user} boards={boards} />
        <main className="min-h-[70vh]">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
