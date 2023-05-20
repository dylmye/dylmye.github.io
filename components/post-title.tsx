import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  centered?: boolean;
}

const PostTitle = ({ children, centered = false }: Props) => {
  return (
    <h1 className={`text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center ${!centered && "md:text-left"}`}>
      {children}
    </h1>
  );
};

export default PostTitle;
