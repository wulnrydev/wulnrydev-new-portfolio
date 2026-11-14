import type { Metadata, Viewport } from "next";
import "./globals.css";
import Loader from "@/components/Loader";
import { LanguageProvider } from "@/context/LanguageContext";

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
    type: "website",
    locale: "en_US",
    url: "https://wulnrydev.com",
    siteName: "wulnrydev",
    title: "wulnrydev — Full-Stack Developer",
    description:
      "Modern interfaces, advanced applications, Minecraft solutions and Discord bots.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "wulnrydev",
      },
    ],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Loader />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
