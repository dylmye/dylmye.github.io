interface PostType {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  hackernoon_url?: string;
  rr_blog_url?: string;
  content: string;
};

export default PostType;
