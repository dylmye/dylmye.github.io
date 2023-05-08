interface PortfolioPostType {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  githubUrl?: string;
  url?: string;
};

export default PortfolioPostType;
