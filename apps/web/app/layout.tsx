import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "X Dub - Dub your videos into every language",
  description: "Auto-dub your X videos and Spaces into 30 languages. Grow your global crypto community — no extra work.",
  keywords: "X dubbing, video translation, automatic dubbing, crypto content, Web3, Spaces dubbing, AI translation",
  openGraph: {
    title: "X Dub - Dub your videos into every language",
    description: "Auto-dub your X videos and Spaces into 30 languages",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://xdub.app",
    siteName: "X Dub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "X Dub - Dub your videos into every language",
    description: "Auto-dub your X videos and Spaces into 30 languages",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
