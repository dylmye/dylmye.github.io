import React from "react";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

interface UnitProps {
  title?: string;
  description?: React.ReactNode;
  extraClasses?: string;
  image?: ImageProps["src"];
  link?: string;
  type: 'blog' | 'portfolio';
}

/** A unit that lives inside a [`<Card />`](./Card.tsx), or a [`<UnitsVerticalList />`](./UnitsVerticalList.tsx) */
const HomepageUnit = ({
  extraClasses = "",
  title,
  description,
  image,
  link,
  type,
}: UnitProps) => (
  <Link
    as={link ?? "#"}
    href={`${type === "blog" ? "posts" : "portfolio"}/[slug]`}
    className={`bg-white dark:bg-slate-500 rounded-md flex flex-col w-56 drop-shadow-md hover:drop-shadow-xl no-underline ${extraClasses}`}
    title={`Read more about '${title}'`}
  >
    {image && (
      <Image
        src={image}
        alt={title}
        className="object-fill w-96 rounded-t-md"
        width="224"
        height="126"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPkE1WvBwABTgDLCdetEgAAAABJRU5ErkJggg=="
      />
    )}
    <div className="flex flex-col p-4">
      {title && <p className="font-bold text-m dark:text-white">{title}</p>}
      {description && <p className="text-sm dark:text-white">{description}</p>}
    </div>
  </Link>
);

export default HomepageUnit;
