import { PortfolioTags } from "./tags";

interface PortfolioPostType {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  image?: string;
  githubUrl?: string;
  url?: string;
  tags: PortfolioTags[];
};

export default PortfolioPostType;
