import { useTheme } from "next-themes";
import { getAllPortfolioPosts, getAllPosts } from "../../lib/api";
import Post from "../../interfaces/post";
import Card from "../../components/card";
import Container from "../../components/container";
import Layout from "../../components/layout";
import Unit from "../../components/unit";
import UnitsVerticalList from "../../components/units-vertical-list";
import PortfolioPost from "../../interfaces/portfolio-post";
import DateFormatter from "../../components/date-formatter";
import CardHeader from "../../components/card-header";
import profilePic from "../../public/assets/img/profile.jpg";
import Image from "next/image";
import Head from "next/head";

interface HomepageProps {
  allPosts: Post[];
  devPosts: PortfolioPost[];
  communityPosts: PortfolioPost[];
}

const TestHomepage = ({
  allPosts,
  devPosts,
  communityPosts,
}: HomepageProps) => (
  <Layout>
    <Head>
      <title>Homepage | Dylan Myers</title>
    </Head>
    <Container>
      <Card>
        <div className="flex flex-col sm:flex-row items-center py-12 px-4 xl:mr-48">
          <Image
            src={profilePic}
            alt="A headshot of me"
            className="rounded-full w-64 h-64"
          />
          <div className="mx-6 flex flex-col">
            <h2 className="text-6xl font-bold mb-2">Dylan Myers</h2>
            <h2 className="text-3xl font-bold mb-2">Full-stack software engineer specialising in React & React Native, Typescript, design and accessibility</h2>
            <div>
              <p>Social media icons here</p>
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <CardHeader title="Web & Mobile Dev" />
        <UnitsVerticalList>
          {devPosts?.length > 0 &&
            devPosts.map((d) => (
              <Unit key={d.slug} title={d.title} description={d.summary} image={d.image} />
            ))}
        </UnitsVerticalList>
      </Card>
      <Card>
        <CardHeader title="Community Management" />
        <UnitsVerticalList>
          {communityPosts?.length > 0 &&
            communityPosts.map((c) => (
              <Unit key={c.slug} title={c.title} description={c.summary} image={c.image} />
            ))}
        </UnitsVerticalList>
      </Card>
      <Card>
        <CardHeader title="Blog" readMoreUrl="aa" />
        <UnitsVerticalList>
          {allPosts?.length > 0 &&
            allPosts.map((p) => (
              <Unit
                key={p.slug}
                title={p.title}
                description={<DateFormatter dateString={p.date} />}
                image={p.coverImage}
              />
            ))}
        </UnitsVerticalList>
      </Card>
    </Container>
  </Layout>
);

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "date", "slug", "coverImage"]);

  const devPosts = getAllPortfolioPosts("dev", [
    "title",
    "date",
    "slug",
    "summary",
    "image",
  ]);

  const communityPosts = getAllPortfolioPosts("community", [
    "title",
    "date",
    "slug",
    "summary",
    "image",
  ]);

  return {
    props: { allPosts, devPosts, communityPosts },
  };
};

export default TestHomepage;
