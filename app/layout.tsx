import type { Metadata } from "next";
import "./globals.css";

import { Oxanium, Noto_Kufi_Arabic } from "next/font/google";

const latin = Oxanium({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-latin",
});

const arabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-ar",
});

export const metadata: Metadata = {
  title: "Novel Site",
  description: "Cyberpunk novel weekly unlocks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${latin.variable} ${arabic.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
