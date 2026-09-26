import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { IMAGES } from "@/constants/images.constant";
import { BRAND } from "@/constants/landing.constant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: `${BRAND.NAME} — ${BRAND.TAGLINE}`,
  description: BRAND.DESCRIPTION,
  keywords: [...BRAND.KEYWORDS],
  applicationName: BRAND.NAME,
  openGraph: {
    type: "website",
    title: `${BRAND.NAME} — ${BRAND.TAGLINE}`,
    description: BRAND.DESCRIPTION,
    siteName: BRAND.NAME,
    images: [
      {
        url: IMAGES.BRAND.OG,
        width: 1200,
        height: 630,
        alt: `${BRAND.NAME} — ${BRAND.TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.NAME} — ${BRAND.TAGLINE}`,
    description: BRAND.DESCRIPTION,
    images: [IMAGES.BRAND.OG],
  },
  icons: {
    icon: IMAGES.BRAND.FAVICON,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
