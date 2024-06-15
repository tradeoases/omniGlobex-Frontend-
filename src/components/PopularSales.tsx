import React from "react";
import { SectionHeader } from "./GameWorldSection";

const PopularSales = () => {
  return (
    <div className="w-full space-y-3">
      <SectionHeader name="Popular Sales" route="" view={true} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-3">
        {popularSales.map((sale, i) => (
          <PopularSaleItem {...sale} key={i} />
        ))}
      </div>
    </div>
  );
};

export default PopularSales;

interface IBestSale {
  previousPrice: number;
  newPrice: number;
  image: string;
  description: string;
}

const PopularSaleItem: React.FC<IBestSale> = ({
  description,
  image,
  newPrice,
  previousPrice,
}) => {
  return (
    <div className="p-4 py-3 border-b border-light w-full flex items-center bg-white gap-x-3">
      <div className="w-16 h-16 bg-gray-400">1</div>
      <div>
        <p className="line-clamp-1 text-xs font-bold">{description}</p>
        <p className="text-sm font-bold flex items-center gap-2">
          <span className="line-through text-gray-400">${previousPrice}</span>
          <span className=" text-red-500">${newPrice}</span>
        </p>
      </div>
    </div>
  );
};

const popularSales: IBestSale[] = [
  {
    previousPrice: 49.99,
    newPrice: 39.99,
    image: "https://example.com/images/item1.jpg",
    description: "Comfortable cotton t-shirt",
  },
  {
    previousPrice: 79.99,
    newPrice: 59.99,
    image: "https://example.com/images/item2.jpg",
    description: "Stylish denim jeans",
  },
  {
    previousPrice: 199.99,
    newPrice: 149.99,
    image: "https://example.com/images/item3.jpg",
    description: "Elegant wristwatch",
  },
  {
    previousPrice: 29.99,
    newPrice: 19.99,
    image: "https://example.com/images/item4.jpg",
    description: "Classic white sneakers",
  },
  {
    previousPrice: 59.99,
    newPrice: 44.99,
    image: "https://example.com/images/item5.jpg",
    description: "Waterproof backpack",
  },
  {
    previousPrice: 99.99,
    newPrice: 79.99,
    image: "https://example.com/images/item6.jpg",
    description: "Wireless Bluetooth headphones",
  },
  {
    previousPrice: 15.99,
    newPrice: 9.99,
    image: "https://example.com/images/item7.jpg",
    description: "Ceramic coffee mug",
  },
  {
    previousPrice: 249.99,
    newPrice: 199.99,
    image: "https://example.com/images/item8.jpg",
    description: "Leather office chair",
  },
  {
    previousPrice: 34.99,
    newPrice: 24.99,
    image: "https://example.com/images/item9.jpg",
    description: "Wireless mouse",
  },
  {
    previousPrice: 119.99,
    newPrice: 99.99,
    image: "https://example.com/images/item10.jpg",
    description: "Portable power bank",
  },
  {
    previousPrice: 89.99,
    newPrice: 69.99,
    image: "https://example.com/images/item11.jpg",
    description: "Noise-canceling earphones",
  },
  {
    previousPrice: 59.99,
    newPrice: 49.99,
    image: "https://example.com/images/item12.jpg",
    description: "Stainless steel water bottle",
  },
];
