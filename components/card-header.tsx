import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

interface CardHeaderProps {
  title: string;
  readMoreUrl?: string;
}

const CardHeader = ({ title, readMoreUrl }: CardHeaderProps) => (
  <div className="flex justify-between mb-4 whitespace-nowrap">
    <h2 className="text-2xl font-bold text-ellipsis overflow-hidden">
      {title}
    </h2>
    {readMoreUrl && (
      <a href={readMoreUrl} className="flex flex-row items-center">
        <p>Read more</p>
        <ChevronRightIcon className="h-4 w-4 ml-1" />
      </a>
    )}
  </div>
);

export default CardHeader;
