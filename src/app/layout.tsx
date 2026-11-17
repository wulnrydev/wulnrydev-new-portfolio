import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wulnrydev.com"),
  title: {
    default: "wulnrydev — Minecraft Developer & Full-Stack Developer",
    template: "%s | wulnrydev",
  },
  description:
    "wulnry (wulnrydev) is a Minecraft developer and full-stack web developer building custom server setups, plugins, Discord bots and modern web interfaces, with 6+ years of experience across 15+ technologies.",
  applicationName: "wulnrydev",
  keywords: [
    "wulnrydev",
    "wulnry",
    "wulnry dev",
    "wulnry site",
    "wulnry portfolio",
    "wulnry portfolyo",
    "wulnrydev site",
    "wulnrydev portfolio",
    "wulnrydev portfolyo",
    "wulnrydev developer",
    "minecraft developer",
    "minecraft geliştirici",
    "minecraft plugin developer",
    "minecraft server setup",
    "minecraft sunucu kurulumu",
    "discord bot developer",
    "discord bot geliştirici",
    "full-stack developer",
    "portfolio",
    "typescript",
    "react",
    "next.js",
    "java",
  ],
  authors: [{ name: "wulnrydev", url: "https://github.com/wulnrydev" }],
  creator: "wulnrydev",
  publisher: "wulnrydev",
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "tr-TR": "/",
    },
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
    alternateLocale: ["tr_TR"],
    url: "https://www.wulnrydev.com",
    siteName: "wulnrydev",
    title: "wulnrydev — Minecraft Developer & Full-Stack Developer",
    description:
      "Minecraft developer and full-stack web developer. Custom server setups, plugins, Discord bots and modern web interfaces.",
  },
  twitter: {
    card: "summary_large_image",
    title: "wulnrydev — Minecraft Developer & Full-Stack Developer",
    description:
      "Minecraft developer and full-stack web developer. Custom server setups, plugins, Discord bots and modern web interfaces.",
    creator: "@wulnrydev",
  },
};

/* Structured data: tells Google the site and the person are the same entity,
   including the alternative spellings people actually search for. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.wulnrydev.com/#person",
      name: "wulnrydev",
      alternateName: [
        "wulnry",
        "wulnry dev",
        "wulnrydev site",
        "wulnry portfolio",
        "wulnrydev portfolio",
        "wulnrydev developer",
      ],
      url: "https://www.wulnrydev.com",
      image: "https://github.com/wulnrydev.png",
      jobTitle: "Minecraft Developer & Full-Stack Developer",
      description:
        "Minecraft developer and full-stack web developer building custom server setups, plugins, Discord bots and modern web interfaces.",
      knowsAbout: [
        "Minecraft server development",
        "Minecraft plugin development",
        "Discord bot development",
        "Java",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
      ],
      sameAs: [
        "https://github.com/wulnrydev",
        "https://discord.com/users/902241075316535366",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.wulnrydev.com/#website",
      url: "https://www.wulnrydev.com",
      name: "wulnrydev",
      alternateName: ["wulnry", "wulnrydev portfolio", "wulnry portfolyo"],
      inLanguage: ["en", "tr"],
      publisher: { "@id": "https://www.wulnrydev.com/#person" },
    },
    {
      "@type": "ProfilePage",
      "@id": "https://www.wulnrydev.com/#profile",
      url: "https://www.wulnrydev.com",
      name: "wulnrydev — Minecraft Developer & Full-Stack Developer",
      isPartOf: { "@id": "https://www.wulnrydev.com/#website" },
      mainEntity: { "@id": "https://www.wulnrydev.com/#person" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
