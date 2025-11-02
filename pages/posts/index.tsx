import Head from "next/head";

import { getAllPosts } from "../../lib/api";
import Post from "../../interfaces/post";
import Container from "../../components/container";
import Layout from "../../components/layout";
import Header from "../../components/header";
import AllPostsUnit from "../../components/all-posts-unit";

interface AllPostsProps {
  allPosts: Post[];
}

const AllPosts = ({ allPosts }: AllPostsProps) => (
  <Layout>
    <Head>
      <title>All Posts | Dylan Myers</title>
    </Head>
    <Container>
      <Header />
      <main>
        <h3 className="text-xl md:text-3xl font-bold tracking-tight md:tracking-tighter leading-tight mb-4">
          All Posts
        </h3>
        <div className="grid grid-flow-row gap-3 grid-cols-1 md:grid-cols-2">
          {allPosts.map((p) => (
            <AllPostsUnit key={`allposts-post-${p.slug}`} post={p} />
          ))}
        </div>
      </main>
    </Container>
  </Layout>
);

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "date", "slug", "coverImage"]);

  return {
    props: { allPosts },
  };
};

export default AllPosts;
