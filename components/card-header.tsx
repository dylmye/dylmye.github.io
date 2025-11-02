import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

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
        <FontAwesomeIcon icon={faChevronRight} size="xs" className="ml-1" />
      </Link>
    )}
  </div>
);

export default CardHeader;
