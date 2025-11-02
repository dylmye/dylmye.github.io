import Footer from "./footer";
import Meta from "./meta";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
