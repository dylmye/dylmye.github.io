import { Html, Head, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="en-GB" prefix="og: https://ogp.me/ns#
  article: https://ogp.me/ns/article#">
      <Head />
      <body className="bg-slate-100 dark:bg-dylan-navy text-slate-900 dark:text-slate-200">
        <Main />
        <NextScript />
      </body>
    </Html>
);

export default Document;