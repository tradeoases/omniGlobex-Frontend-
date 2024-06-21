import React from "react";
import { SectionHeader } from "./GameWorldSection";

const BestSeller = () => {
  return (
    <div className="w-full space-y-3">
      <SectionHeader name="Best Saller" view={true} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 lg:grid-cols-6 gap-x-4">
        {bestSellers.map((saller, i) => (
          <Card {...saller} key={i} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;

interface IBestSeller {
  name: string;
  image?: string;
}
const Card: React.FC<IBestSeller> = ({ image, name }) => {
  return (
    <div className="flex flex-col space-y-2 items-center">
      <div className="w-48 h-48 md:w-40 md:h-40 lg:w-32 lg:h-32 bg-white rounded-full flex items-center justify-center font-extrabold">
        some
      </div>
      <p className="text-base font-semibold">{name}</p>
    </div>
  );
};

const bestSellers: IBestSeller[] = [
  { name: "Shopno BD", image: "" },
  { name: "Eecoms Shop", image: "" },
  { name: "Fusion X", image: "" },
  { name: "Rekayi Rox", image: "" },
  { name: "Habbriyi", image: "" },
  { name: "Rayhans", image: "" },
];
