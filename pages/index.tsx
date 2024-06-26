import Image from "next/image";
import Head from "next/head";
import {
  SiGithub,
  SiMastodon,
  SiLinkedin,
  SiStackoverflow,
} from "@icons-pack/react-simple-icons";
import { EnvelopeIcon, RssIcon } from "@heroicons/react/24/solid";

import { getAllPortfolioPosts, getPaginatedPosts } from "../lib/api";
import Post from "../interfaces/post";
import Card from "../components/card";
import Container from "../components/container";
import Layout from "../components/layout";
import HomepageUnit from "../components/homepage-unit";
import UnitsVerticalList from "../components/units-vertical-list";
import PortfolioPost from "../interfaces/portfolio-post";
import DateFormatter from "../components/date-formatter";
import CardHeader from "../components/card-header";
import profilePic from "../public/assets/img/profile.webp";
import SocialButton from "../components/social-button";
import { HOME_OG_IMAGE_URL } from "../lib/constants";
import generateFeeds from "../lib/generateFeeds";

interface HomepageProps {
  allPosts: Post[];
  devPosts: PortfolioPost[];
  communityPosts: PortfolioPost[];
}

const Homepage = ({ allPosts, devPosts, communityPosts }: HomepageProps) => (
  <Layout>
    <Head>
      <title>Homepage | Dylan Myers</title>
      <meta name="description" content="Dylan Myers is a full-stack software engineer specialising in React & React Native, TypeScript, design and accessibility."></meta>
      <meta property="og:title" content="Dylan Myers" />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <Container>
      <Card extraClasses="mt-8">
        <div className="flex flex-col sm:flex-row items-center py-12 px-4 xl:mr-48">
          <Image
            src={profilePic}
            alt="A headshot of me"
            className="rounded-full w-48 h-48 sm:w-64 sm:h-64"
            priority
          />
          <div className="mx-6 flex flex-col">
            <h2 className="text-5xl sm:text-6xl font-bold mb-2">Dylan Myers</h2>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Full-stack software engineer specialising in React & React Native,
              TypeScript, design and accessibility
            </h2>
            <div className="grid gap-1 grid-flow-col auto-cols-max">
              <SocialButton url="https://github.com/dylmye" title="My GitHub profile">
                <SiGithub size={24} title="My GitHub profile" aria-hidden />
              </SocialButton>
              <SocialButton url="https://www.linkedin.com/in/dylan--m/" title="My LinkedIn account">
                <SiLinkedin size={24} title="My LinkedIn account" aria-hidden />
              </SocialButton>
              <SocialButton url="https://stackoverflow.com/users/2710385" title="My Stack Overflow profile">
                <SiStackoverflow size={24} title="My Stack Overflow profile" aria-hidden />
              </SocialButton>
              <SocialButton url="https://infosec.exchange/@dylan" title="My Mastodon account">
                <SiMastodon size={24} title="My Mastodon account" aria-hidden />
              </SocialButton>
              <SocialButton url="https://mailhide.io/e/8KxEiUWX" title="My email address">
                <EnvelopeIcon className="h-[24px] w-[24px]" title="My email address" aria-hidden />
              </SocialButton>
              <SocialButton url="https://dylmye.me/feed.rss" title="RSS Feed">
                <RssIcon className="h-[24px] w-[24px]" title="RSS Feed" aria-hidden />
              </SocialButton>
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <CardHeader title="Web & Mobile Development Portfolio" />
        <UnitsVerticalList>
          {devPosts?.length > 0 &&
            devPosts.map((d) => (
              <HomepageUnit
                key={`homepage-devpost-${d.slug}`}
                title={d.title}
                description={d.summary}
                image={d.image}
                link={`portfolio/${d.slug}`}
                type="portfolio"
              />
            ))}
        </UnitsVerticalList>
      </Card>
      <Card>
        <CardHeader title="Community Management Portfolio" />
        <UnitsVerticalList>
          {communityPosts?.length > 0 &&
            communityPosts.map((c) => (
              <HomepageUnit
                key={`homepage-devpost-${c.slug}`}
                title={c.title}
                description={c.summary}
                image={c.image}
                link={`portfolio/${c.slug}`}
                type="portfolio"
              />
            ))}
        </UnitsVerticalList>
      </Card>
      <Card>
        <CardHeader title="Blog" readMoreUrl="posts/" readMoreText="More Posts" />
        <UnitsVerticalList>
          {allPosts?.length > 0 &&
            allPosts.map((p) => (
              <HomepageUnit
                key={`homepage-devpost-${p.slug}`}
                title={p.title}
                description={<DateFormatter dateString={p.date} />}
                image={p.coverImage}
                link={`posts/${p.slug}`}
                type="blog"
              />
            ))}
        </UnitsVerticalList>
      </Card>
    </Container>
  </Layout>
);

export const getStaticProps = async () => {
  await generateFeeds();
  const allPosts = getPaginatedPosts(["title", "date", "slug", "coverImage"]);

  const devPosts = getAllPortfolioPosts([
    "title",
    "date",
    "slug",
    "summary",
    "image",
  ], "dev");

  const communityPosts = getAllPortfolioPosts([
    "title",
    "date",
    "slug",
    "summary",
    "image",
  ], "community");

  return {
    props: { allPosts, devPosts, communityPosts },
  };
};

export default Homepage;
