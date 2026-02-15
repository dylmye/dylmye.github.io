// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://dylmye.me",
  integrations: [sitemap(), mdx()],
  experimental: {
    fonts: [
      {
        provider: fontProviders.bunny(),
        name: "Lacquer",
        cssVariable: "--font-display",
      },
      {
        provider: fontProviders.bunny(),
        name: "DM Sans",
        weights: [400, 700],
        styles: ["normal", "italic"],
        cssVariable: "--font-sans-serif",
      },
      {
        provider: fontProviders.bunny(),
        name: "DM Mono",
        weights: [400],
        styles: ["normal", "italic"],
        cssVariable: "--font-monospace",
      },
    ],
  },
});
