import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";

interface Props {
  title: string;
  coverImage?: string;
  date: string;
  hackernoonUrl?: string;
  rrBlogUrl?: string;
}

const PostHeader = ({
  title,
  coverImage,
  date,
  hackernoonUrl,
  rrBlogUrl,
}: Props) => (
  <>
    <PostTitle>{title}</PostTitle>
    {coverImage && (
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
    )}
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 text-lg">
        <strong>
        <DateFormatter dateString={date} dateFormat="PPP" />
        {hackernoonUrl && (
          <span>
            {" "}
            • Originally shared on{" "}
            <a target="_blank" href={hackernoonUrl}>
              Hacker Noon
            </a>
          </span>
        )}
        {rrBlogUrl && (
          <span>
            {" "}
            • Originally shared on the{" "}
            <a target="_blank" href={rrBlogUrl}>
              Red River blog
            </a>
          </span>
        )}
        </strong>
      </div>
    </div>
  </>
);

export default PostHeader;
