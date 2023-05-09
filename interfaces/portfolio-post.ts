interface PortfolioPostType {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  image?: string;
  githubUrl?: string;
  url?: string;
};

export default PortfolioPostType;
