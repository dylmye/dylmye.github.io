import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";
import { PortfolioTags, PostTags as PostTagsType } from "../interfaces/tags";
import PostTags from "./post-tags";

interface Props {
  title: string;
  coverImage?: string;
  date?: string;
  /** HackerNoon URL */
  hackernoonUrl?: string;
  /** RR Blog URL */
  legacyBlogUrl?: string;
  /** Credit attribution for header image */
  coverCredit?: string;
  /** URL to link credit attribution to */
  coverCreditUrl?: string;
  portfolioUrl?: string;
  centeredHeader?: boolean;
  tags?: (PostTagsType | PortfolioTags)[];
}

const PostHeader = ({
  title,
  coverImage,
  date,
  hackernoonUrl,
  legacyBlogUrl,
  coverCredit,
  coverCreditUrl,
  portfolioUrl,
  centeredHeader = false,
  tags = [],
}: Props) => (
  <>
    <PostTitle centered={centeredHeader}>{title}</PostTitle>
    {coverImage && (
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
    )}
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 text-lg">
        {(coverCreditUrl || coverCredit) && (
          <small>
            {coverCreditUrl ? (
              <a href={coverCreditUrl}>
                ({coverCredit ? `Photo credit: ${coverCredit}` : "Photo credit"})
              </a>
            ) : (
              `Photo credit: ${coverCredit}`
            )}
          </small>
        )}
        <br />
        <strong>
          {date && <DateFormatter dateString={date} dateFormat="PPP" />}
          {hackernoonUrl && (
            <span>
              {" "}
              • Originally shared on{" "}
              <a target="_blank" href={hackernoonUrl}>
                Hacker Noon
              </a>
            </span>
          )}
          {legacyBlogUrl && (
            <span>
              {" "}
              • Originally shared on the{" "}
              <a target="_blank" href={legacyBlogUrl}>
                Red River blog
              </a>
            </span>
          )}
          {tags && (
            <div className="flex justify-center mb-4">
              <PostTags tags={tags} />
            </div>
          )}
          {portfolioUrl && (
            <span>
              🔗 <strong>Visit</strong>:{" "}
              <a target="_blank" href={`https://${portfolioUrl}`}>
                {portfolioUrl}
              </a>
            </span>
          )}
        </strong>
      </div>
    </div>
  </>
);

export default PostHeader;
