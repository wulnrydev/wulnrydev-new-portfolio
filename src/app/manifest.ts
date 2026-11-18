import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "wulnrydev — Minecraft & Full-Stack Developer",
    short_name: "wulnrydev",
    description:
      "Minecraft developer and full-stack web developer building custom server setups, plugins, Discord bots and modern web interfaces.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0d0d",
    theme_color: "#0d0d0d",
    lang: "en",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
