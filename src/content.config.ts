import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blogPosts = defineCollection({
  loader: glob({ base: "./src/content/blog-posts", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      blurb: z.string().optional(),
      date: z.coerce.date(),
      category: z.string(),
      coverImage: image().optional(),
      coverImageAlt: z.string().optional(),
      coverCredit: z.string().optional(),
      coverCreditUrl: z.string().optional(),
      // for posts syndicated on hackernoon
      hackernoonUrl: z.string().url().optional(),
      // for posts written for former employers
      legacyBlogUrl: z.string().url().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      blurb: z.string().optional(),
      date: z.coerce.date(),
      coverImage: image().optional(),
      coverImageAlt: z.string().optional(),
      url: z.string().url().optional(),
      productHuntUrl: z.string().url().optional(),
      tags: z.array(z.string()),
    }),
});

const communityMgmtPortfolio = defineCollection({
  loader: glob({
    base: "./src/content/community-management",
    pattern: "**/*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      blurb: z.string().optional(),
      year: z.string(),
      coverImage: image().optional(),
      coverImageAlt: z.string().optional(),
    }),
});

export const collections = { blogPosts, projects, communityMgmtPortfolio };
