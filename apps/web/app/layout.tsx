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
  title: "Claude Code - Turn every post into every language",
  description: "Auto-dub your Twitter videos and Spaces into 20+ languages. Grow fans, engagement, and community — no extra work.",
  keywords: "Twitter dubbing, video translation, automatic dubbing, social media localization, X dubbing",
  openGraph: {
    title: "Claude Code - Turn every post into every language",
    description: "Auto-dub your Twitter videos and Spaces into 20+ languages",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://claudecode.com",
    siteName: "Claude Code",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code - Turn every post into every language",
    description: "Auto-dub your Twitter videos and Spaces into 20+ languages",
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
