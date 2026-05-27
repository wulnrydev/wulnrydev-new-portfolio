import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wulnrydev.com"),
  title: "wulnrydev — Full-Stack Developer",
  description:
    "wulnrydev designs and develops modern interfaces, advanced applications, Minecraft solutions and Discord bots. +6 years of experience across +15 technologies.",
  keywords: [
    "wulnrydev",
    "developer",
    "portfolio",
    "full-stack",
    "discord bot",
    "minecraft",
    "typescript",
    "react",
    "next.js",
  ],
  authors: [{ name: "wulnrydev", url: "https://github.com/wulnrydev" }],
  creator: "wulnrydev",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "wulnrydev — Full-Stack Developer",
    description:
      "Modern interfaces, advanced applications, Minecraft solutions and Discord bots.",
    url: "https://wulnrydev.com",
    siteName: "wulnrydev",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "wulnrydev Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "wulnrydev — Full-Stack Developer",
    description:
      "Modern interfaces, advanced applications, Minecraft solutions and Discord bots.",
    creator: "@wulnrydev",
    images: ["/og-image.png"],
  },
};
import Loader from "@/components/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        <Loader />
        {children}
      </body>
    </html>
  );
}
