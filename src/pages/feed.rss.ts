import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import {
  formatRssPost,
  sortCollectionEntriesByDate,
} from "../utils/collections";

export async function GET(context: { site: string }) {
  const blog = await getCollection("blogPosts");
  return rss({
    title: "Dylan Myers Blog",
    description:
      "Dylan is a London-based full-stack engineer with nearly a decade of experience in building performant, accessible and beautiful websites and apps.",
    site: context.site,
    items: blog.sort(sortCollectionEntriesByDate).map(formatRssPost),
    customData: `<language>en-GB</language>\n<category>Technology</category>\n<copyright>All articles copyright Dylan Myers</copyright>`,
  });
}
