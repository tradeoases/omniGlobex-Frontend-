import React from "react";

interface Props {
  name: string;
  route?: string;
}

export const PageHeader: React.FC<Props> = ({ name, route }) => {
  return (
    <div className="w-full bg-[#FFFAEF] py-10">
      <p className="text-sm font-light w-10/12 xl:w-8/12 mx-auto">
        Home {route}
      </p>
      <div className="text-3xl font-bold w-full text-center">{name}</div>
    </div>
  );
};
