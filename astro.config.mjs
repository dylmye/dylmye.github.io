// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

import indexnow from "astro-indexnow";

// https://astro.build/config
export default defineConfig({
  site: "https://dylmye.me",
  integrations: [
    sitemap(),
    mdx(),
    // yes it's a key in source, no it doesn't matter because
    // it's just bing webmaster
    // https://github.com/velohost/astro-indexnow/issues/2
    // indexnow({ key: "X" }),
  ],
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
});
