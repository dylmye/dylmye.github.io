import React from "react";

interface SocialButtonProps {
  url: string;
  title: string;
  children: React.ReactNode;
}

const SocialButton = ({ url, title, children }: SocialButtonProps) => (
  <a
    href={url}
    target="_blank"
    className="rounded-md p-2 bg-black/10 hover:bg-black/20 dark:bg-dylan-lighternavy/50 dark:hover:bg-dylan-lighternavy/75"
    title={title}
  >
    {children}
  </a>
);

export default SocialButton;
