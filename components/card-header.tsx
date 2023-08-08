import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface CardHeaderProps {
  title: string;
  readMoreUrl?: string;
  readMoreText?: string;
}

const CardHeader = ({
  title,
  readMoreUrl,
  readMoreText = "Read more",
}: CardHeaderProps) => (
  <div className="flex justify-between mb-4 whitespace-nowrap">
    <h2 className="text-xl sm:text-2xl font-bold text-ellipsis overflow-hidden">
      {title}
    </h2>
    {readMoreUrl && (
      <Link href={readMoreUrl} className="flex flex-row items-center">
        <p>{readMoreText}</p>
        <ChevronRightIcon className="h-4 w-4 ml-1" />
      </Link>
    )}
  </div>
);

export default CardHeader;
