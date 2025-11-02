import React from "react";

import Post from "../interfaces/post";
import Card from "./card";
import DateFormatter from "./date-formatter";
import Image from "next/image";
import Link from "next/link";

interface AllPostsUnitProps {
  post: Post;
}

const AllPostsUnit = ({ post }: AllPostsUnitProps) => (
  <Link href={`posts/${post.slug}`} className="no-underline">
    <Card extraClasses="drop-shadow-md hover:drop-shadow-lg" noMargin>
      <div className="flex flex-row items-center">
        {post.coverImage && (
          <div className="flex flex-1">
            <Image
              src={post.coverImage}
              alt={post.title}
              className="w-96 rounded-md"
              width="224"
              height="126"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPkE1WvBwABTgDLCdetEgAAAABJRU5ErkJggg=="
            />
          </div>
        )}
        <div className="flex flex-col flex-1 ml-4">
          <p className="font-bold text-lg">{post.title}</p>
          <p>
            <DateFormatter dateString={post.date} />
          </p>
        </div>
      </div>
    </Card>
  </Link>
);

export default AllPostsUnit;
