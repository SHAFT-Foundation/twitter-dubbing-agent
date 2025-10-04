import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PrivyProvider } from "@/providers/PrivyProvider";
import { LogRocketInit } from "@/components/LogRocketInit";
import { StructuredData } from "@/components/StructuredData";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://xdub.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "X Dub - AI Video Dubbing for Social Media | Multilingual Voice-Over Tool",
  description: "AI video dubbing platform for influencers. Automatic video localization with voice cloning technology and lip-sync dubbing. Multilingual video dubbing service for X (Twitter) content in 30+ languages.",
  keywords: "AI video dubbing, multilingual video dubbing, social media dubbing service, automatic video localization, voice cloning technology, lip-sync dubbing, multilingual voice-over for social media, video dubbing for influencers, AI voice-over translation, global video dubbing tool, X dubbing, Twitter Spaces dubbing, crypto content translation",
  authors: [{ name: "SHAFT Foundation", url: "https://shaft.finance" }],
  creator: "SHAFT Foundation",
  publisher: "SHAFT Foundation",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "X Dub - AI Video Dubbing & Multilingual Voice-Over for Social Media",
    description: "AI video dubbing platform with voice cloning technology. Automatic video localization for influencers in 30+ languages.",
    url: baseUrl,
    siteName: "X Dub",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "X Dub - AI Video Dubbing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Video Dubbing for Social Media Influencers",
    description: "Multilingual video dubbing service with voice cloning and automatic localization for X content",
    images: [`${baseUrl}/og-image.png`],
    creator: "@xdub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LogRocketInit />
        <PrivyProvider>
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}
