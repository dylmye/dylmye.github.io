import React from "react";
import { PortfolioTags, PostTags as PostTagsType } from "../interfaces/tags";
import {
  IconType,
  SiAmazonaws,
  SiDiscord,
  SiFirebase,
  SiGooglechrome,
  SiJavascript,
  SiReact,
  SiTerraform,
  SiTwitch,
  SiTypescript,
} from "@icons-pack/react-simple-icons";

type Tags = PortfolioTags | PostTagsType;

interface PostTagsProps {
  tags: Tags[];
  extraClasses?: string;
}

const getIconForTag = (tag: Tags): JSX.Element => {
  let IconElement: IconType = null;
  switch (tag) {
    case "react": {
      IconElement = SiReact;
      break;
    }
    case "typescript": {
      IconElement = SiTypescript;
      break;
    }
    case "terraform": {
      IconElement = SiTerraform;
      break;
    }
    case "discord": {
      IconElement = SiDiscord;
      break;
    }
    case "aws": {
      IconElement = SiAmazonaws;
      break;
    }
    case "front end": {
      IconElement = SiGooglechrome;
      break;
    }
    case "firebase": {
      IconElement = SiFirebase;
      break;
    }
    case "twitch": {
      IconElement = SiTwitch;
      break;
    }
    case "javascript": {
      IconElement = SiJavascript;
      break;
    }
  }
  return <IconElement size={24} title={tag} className="mr-2" />;
};

const PostTags = ({ tags, extraClasses = "" }: PostTagsProps) => (
  <div className={`grid gap-1 grid-flow-col auto-cols-max ${extraClasses}`}>
    {tags.map((t) => (
      <div
        key={`post-tag-${t}`}
        className="rounded-md p-2 bg-black/10 hover:bg-black/20 dark:bg-dylan-lighternavy/50 dark:hover:bg-dylan-lighternavy/75 flex flex-row"
      >
        {getIconForTag(t)}
        {" " + t}
      </div>
    ))}
  </div>
);

export default PostTags;
