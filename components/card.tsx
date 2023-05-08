import React from "react";

interface CardProps {
  children: React.ReactNode;
  extraClasses?: string;
}

const Card = ({ children, extraClasses = "" }: CardProps) => (
  <div
    className={`bg-white dark:bg-dylan-lightnavy rounded-lg flex flex-col p-4 my-4 ${extraClasses}`}
  >
    {children}
  </div>
);

export default Card;
