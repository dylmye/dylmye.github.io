import { AppProps } from "next/app";
import "../styles/index.css";
import { ThemeProvider } from "next-themes";

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider attribute="class">
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
