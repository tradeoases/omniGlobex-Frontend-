import React from "react";
import { Button } from "./ui/button";
import { SectionHeader } from "./GameWorldSection";

const TopSellingProducts = () => {
  return (
    <div className="space-y-3">
      <SectionHeader name="Top Selling Products" view={true} route="" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} />
        ))}
      </div>
    </div>
  );
};

export default TopSellingProducts;

const Card = () => {
  return (
    <div className="px-4 md:px-6 p-4 md:py-6 flex items-center gap-x-4 lg:gap-x-6 bg-white">
      <div className="w-52 lg:w-48 h-32 md:h-40 lg:h-48 p-2 bg-gray-400 flex items-center justify-center lg:text-3xl">
        200X200
      </div>

      <div className="space-y-1 md:space-y-3 lg:space-y-4">
        <div className="flex items-center gap-x-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span className="text-lg text-main" key={i}>
              ★
            </span>
          ))}
        </div>

        <p className="font-semibold line-clamp-2 md:text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae
          voluptates aspernatur omnis impedit repellat, inventore amet
          consequatur quaerat totam laborum atque eaque enim dolore voluptas
          quod veniam nostrum illum! Cum?
        </p>
        <p className="text-sm lg:text-base font-bold flex items-center gap-x-3">
          <span className="text-gray-400 line-through">$20.64</span>{" "}
          <span className="text-red-600">$27.61</span>
        </p>
        <Button className="rounded-none bg-main text-xs h-8 text-black">
          Add To Cart
        </Button>
      </div>
    </div>
  );
};
