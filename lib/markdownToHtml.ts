import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkPrism from "remark-prism";
import remarkGfm from "remark-gfm";

import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeFigure from "rehype-figure";
import rehypeExternalLinks from "rehype-external-links";

const markdownToHtml = async (markdown: string): Promise<string> => {
  const result = await remark()
    .use(remarkParse)
    .use(remarkGfm)
    // @ts-expect-error old plugin but it still works
    .use(remarkPrism, {
      transformInlineCode: false,
      plugins: ["line-numbers"],
    })
    .use(remarkRehype)
    .use(rehypeFigure, { className: "shadow-sm" })
    .use(rehypeExternalLinks, { target: "_blank" })
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
};

export default markdownToHtml;
