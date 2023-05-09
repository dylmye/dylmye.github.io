import React from "react";
import Image, { ImageProps } from "next/image";

interface UnitProps {
  title?: string;
  description?: React.ReactNode;
  extraClasses?: string;
  image?: ImageProps["src"];
  link?: string;
}

/** A unit that lives inside a [`<Card />`](./Card.tsx), or a [`<UnitsVerticalList />`](./UnitsVerticalList.tsx) */
const Unit = ({ extraClasses = "", title, description, image }: UnitProps) => (
  <a href="#"
    className={`bg-white dark:bg-slate-500 rounded-md flex flex-col w-56 drop-shadow-md hover:drop-shadow-xl no-underline ${extraClasses}`}
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
      {title && <p className="font-bold text-m">{title}</p>}
      {description && <p className="text-s">{description}</p>}
    </div>
  </a>
);

export default Unit;
