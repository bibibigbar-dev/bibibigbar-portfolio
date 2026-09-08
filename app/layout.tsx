import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "BIBIBIGBAR — Creative Developer Portfolio",
  description:
    "BIBIBIGBAR's creative portfolio with dynamic typography and colorful animations.",
  keywords: ["portfolio", "creative developer", "frontend", "BIBIBIGBAR"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
