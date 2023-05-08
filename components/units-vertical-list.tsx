import React from "react";

interface UnitsVLProps {
  children: React.ReactNode;
  extraClasses?: string;
}

/** A vertical, overflow-handling list intended for one or more [`<Unit />`](./unit.tsx)s */
const UnitsVerticalList = ({ children, extraClasses = "" }: UnitsVLProps) => (
  <div
    className={`grid gap-2 grid-flow-col auto-cols-max overflow-x-auto scrollbar scrollbar-thumb-dylan-lighternavy scrollbar-track-dylan-navy scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg pb-2 ${extraClasses}`}
  >
    {children}
  </div>
);

export default UnitsVerticalList;
