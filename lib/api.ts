import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import PortfolioTypes from "../interfaces/portfolio-types";

const postsDirectory = join(process.cwd(), "_posts");
const portfolioDirectory = (category: PortfolioTypes) => join(process.cwd(), category === "dev" ? "_devportfolio" : "_commportfolio");

export const getPostSlugs = (): string[] => {
  return fs.readdirSync(postsDirectory);
}

export const getPortfolioSlugs = (category: PortfolioTypes): string[] => {
  return fs.readdirSync(portfolioDirectory(category));
}

export const getPostDateBySlug = (slug: string): string => {
  const split = slug.split("-");
  // there is no date + text = no date
  if (split.length < 4) {
    return "";
  }
  return split.slice(0, 3).join("-");
};

export const getPostBySlug = (slug: string, fields: string[] = []): Record<string, string> => {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Record<string, string> = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (field === "date") {
      items[field] = getPostDateBySlug(realSlug);
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export const getPortfolioPostBySlug = (slug: string, category: PortfolioTypes, fields: string[] = []): Record<string, string> => {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(portfolioDirectory(category), `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Record<string, string> = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export const getAllPosts = (fields: string[] = []): Record<string, string>[] => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export const getPaginatedPosts = (fields: string[] = [], limit = 6, offset = 0): Record<string, string>[] => {
  const slugs = getPostSlugs();
  const posts = slugs
    // sort posts by date in descending order
    .sort((slug1, slug2) => (getPostDateBySlug(slug1) > getPostDateBySlug(slug2) ? -1 : 1))
    .slice(offset, offset + limit)
    .map((slug) => getPostBySlug(slug, fields));
  return posts;
};

export const getAllPortfolioPosts = (category: PortfolioTypes, fields: string[] = []): Record<string, string>[] => {
  const slugs = getPortfolioSlugs(category);
  const posts = slugs
    .map((slug) => getPortfolioPostBySlug(slug, category, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export const getPaginatedPortfolio = (category: PortfolioTypes, fields: string[] = [], limit = 6, offset = 0): Record<string, string>[] => {
  const slugs = getPortfolioSlugs(category);
  const posts = slugs
    .slice(offset, offset + limit)
    .map((slug) => getPortfolioPostBySlug(slug, category, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
};
