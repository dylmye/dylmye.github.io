interface PostType {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  coverCredit?: string;
  coverCreditUrl?: string;
  hackernoonUrl?: string;
  legacyBlogUrl?: string;
  content: string;
};

export default PostType;
