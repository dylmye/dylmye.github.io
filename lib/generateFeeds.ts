import fs from "fs";
import { Feed } from "feed";
import { getAllPosts } from "./api";
import markdownToHtml from "./markdownToHtml";

const generateFeeds = async () => {
  const posts = getAllPosts(["title", "date", "slug", "coverImage", "content"]);

  const updatedDate = posts[0].date;

  const feed = new Feed({
    id: "https://dylmye.me",
    title: "Dylan Myers Blog",
    description: "Dylan Myers is a full-stack software engineer specialising in React & React Native, TypeScript, design and accessibility.",
    updated: new Date(updatedDate),
    generator: "DN Gottem",
    language: "en-GB",
    feedLinks: {
      json: "https://dylmye.me/feed.json",
      rss: "https://dylmye.me/feed.rss",
    },
    link: "https://dylmye.me",
    image: "https://dylmye.me/favicon/apple-touch-icon.png",
    favicon: "https://dylmye.me/favicon/apple-touch-icon.png",
    copyright: "All articles copyright Dylan Myers",
    author: {
      name: "Dylan Myers",
      link: "https://dylmye.me",
    },
  });

  feed.addCategory("Technology");

  for (const post of posts) {
    const content = await markdownToHtml(post.content);
    feed.addItem({
      title: post.title,
      id: post.slug,
      link: `https://dylmye.me/posts/${post.slug}`,
      image: `https://dylmye.me${post.coverImage}`,
      date: new Date(post.date),
      content,
    });
  }

  fs.writeFileSync("./public/feed.rss", feed.rss2());
  fs.writeFileSync("./public/feed.json", feed.json1());
};

export default generateFeeds;
