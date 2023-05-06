import Container from "../components/container";
import MoreStories from "../components/more-stories";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import Post from "../interfaces/post";

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => (
  <Layout>
    <Head>
      <title>Homepage | Dylan Myers</title>
    </Head>
    <Container>
      {allPosts.length > 0 && <MoreStories posts={allPosts} />}
    </Container>
  </Layout>
);

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
  ]);

  return {
    props: { allPosts },
  };
};

export default Index;
