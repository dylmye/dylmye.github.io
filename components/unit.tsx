import React from "react";

interface UnitProps {
  title?: string;
  description?: React.ReactNode;
  extraClasses?: string;
}

/** A unit that lives inside a [`<Card />`](./Card.tsx), or a [`<UnitsVerticalList />`](./UnitsVerticalList.tsx) */
const Unit = ({ extraClasses = "", title, description, }: UnitProps) => (
  <div
    className={`bg-white dark:bg-slate-500 rounded-md flex flex-col p-4 m-x-3 w-56 ${extraClasses}`}
  >
    <div className="flex flex-col">
      {title && (<p className="font-bold text-m">{title}</p>)}
      {description && (<p className="text-s">{description}</p>)}
    </div>
  </div>
);

export default Unit;
