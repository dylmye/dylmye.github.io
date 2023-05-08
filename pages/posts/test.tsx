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
    <Container>
      <Card>
        <h2 className="text-2xl font-bold">Dylan Myers</h2>
      </Card>
      <Card>
        <h2 className="text-2xl font-bold mb-4">Web & Mobile Dev</h2>
        <UnitsVerticalList>
          {devPosts?.length > 0 &&
            devPosts.map((d) => (
              <Unit key={d.slug} title={d.title} description={d.summary} />
            ))}
        </UnitsVerticalList>
      </Card>
      <Card>
        <h2 className="text-2xl font-bold mb-4">Community Management</h2>
        <UnitsVerticalList>
          {communityPosts?.length > 0 &&
            communityPosts.map((c) => (
              <Unit key={c.slug} title={c.title} description={c.summary} />
            ))}
        </UnitsVerticalList>
      </Card>
      <Card>
        <h2 className="text-2xl font-bold mb-4">Blog</h2>
        <UnitsVerticalList>
          {allPosts?.length > 0 &&
            allPosts.map((p) => <Unit key={p.slug} title={p.title} description={<DateFormatter dateString={p.date} />} />)}
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
  ]);

  const communityPosts = getAllPortfolioPosts("community", [
    "title",
    "date",
    "slug",
    "summary",
  ]);

  return {
    props: { allPosts, devPosts, communityPosts },
  };
};

export default TestHomepage;
