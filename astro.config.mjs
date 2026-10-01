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
    // key is intentionally kept in source code
    // as it is required to be public
    indexnow({ key: "97207b9f71074544b8950f4ff122a871" }),
  ],
  fonts: [
    {
      provider: fontProviders.bunny(),
      name: "Grenze",
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
