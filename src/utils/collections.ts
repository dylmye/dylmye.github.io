import type { CollectionEntry } from "astro:content";
import type { RSSFeedItem } from "@astrojs/rss";
import type CollectionEntryBase from "../types/CollectionEntryBase";

export const sortCollectionEntriesByDate = (
  a: { data: { date: Date } },
  b: { data: { date: Date } },
) => b.data.date.valueOf() - a.data.date.valueOf();

export const sortCollectionEntriesByYear = (
  a: { data: { year: string } },
  b: { data: { year: string } },
) => Number(b.data.year) - Number(a.data.year);

export const formatItemForDisplay = ({
  id,
  data: { title, date, blurb, category },
}: {
  id: string;
  data: CollectionEntryBase;
}): CollectionEntryBase => ({
  id,
  title,
  blurb,
  date,
  category,
});

export const formatBlogPost = ({
  id,
  data: { title, blurb, date, category },
}: CollectionEntry<"blogPosts">): CollectionEntryBase => ({
  id,
  title,
  blurb,
  date,
  category,
});

export const formatRssPost = ({
  id,
  data: { title, blurb, date, category, coverImage },
}: CollectionEntry<"blogPosts">): RSSFeedItem => ({
  title,
  pubDate: date,
  description: blurb,
  link: `/blog/${id}`,
  categories: [category],
  enclosure: coverImage
    ? {
        url: coverImage?.src,
        type: `image/${coverImage?.format}`,
        length: 0,
      }
    : undefined,
});

export const formatProject = ({
  id,
  data: { title, blurb, date, tags },
}: CollectionEntry<"projects">): CollectionEntryBase => ({
  id,
  title,
  blurb,
  date,
  category: tags.join(", "),
});

export const formatCmPortfolioItems = ({
  id,
  data: { title, blurb, year },
}: CollectionEntry<"communityMgmtPortfolio">): CollectionEntryBase => ({
  id,
  title,
  blurb,
  date: new Date(year),
  category: "community management",
});
