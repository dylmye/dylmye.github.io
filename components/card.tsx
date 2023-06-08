import React from "react";

interface CardProps {
  children: React.ReactNode;
  extraClasses?: string;
  noMargin?: boolean;
}

const Card = ({ children, extraClasses = "", noMargin = false }: CardProps) => (
  <div
    className={`bg-white dark:bg-dylan-lightnavy rounded-lg flex flex-col p-4 ${!noMargin ? "my-4" : ""} ${extraClasses}`}
  >
    {children}
  </div>
);

export default Card;
