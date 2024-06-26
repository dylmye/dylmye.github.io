import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";

import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";
import markdownToHtml from "../../lib/markdownToHtml";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import { HOME_OG_IMAGE_URL } from "../../lib/constants";
import type Post from "../../interfaces/post";

interface Props {
  post: Post;
}

const BlogPost = ({ post }: Props) => {
  const router = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const title = `${post.title} | Dylan Myers`;
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <article className="mb-24">
            <Head>
              <title>{title}</title>
              <meta property="og:title" content={post.title} />
              <meta property="og:type" content="article" />
              <meta
                property="og:image"
                content={origin + post.coverImage ?? HOME_OG_IMAGE_URL}
              />
              <meta property="og:image:alt" content={post.title} />
              <meta property="og:image:type" content="image/webp" />
              <meta property="og:image:width" content="1920" />
              <meta property="og:image:height" content="1080" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta property="article:author" content="Dylan Myers" />
              <meta property="article:published_time" content={post.date} />
            </Head>
            <Header />
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              hackernoonUrl={post.hackernoonUrl}
              legacyBlogUrl={post.legacyBlogUrl}
              coverCredit={post.coverCredit}
              coverCreditUrl={post.coverCreditUrl}
            />
            <PostBody content={post.content} />
          </article>
        )}
      </Container>
    </Layout>
  );
};

interface Params {
  params: {
    slug: string;
  };
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "content",
    "coverImage",
    "hackernoonUrl",
    "legacyBlogUrl",
    "coverCredit",
    "coverCreditUrl"
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default BlogPost;
