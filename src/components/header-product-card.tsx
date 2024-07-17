import { TbShoppingBag, TbShoppingBagCheck } from "react-icons/tb";

import { IProduct } from "@/service/apis/product-services";
import { Button } from "./ui/button";
import { useState } from "react";

export const HeaderProductCard: React.FC<IProduct> = ({
  image_url,
  description,
  name,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="mx-auto w-64 space-y-3 rounded-xl border bg-white p-4 shadow">
      <div className="h-3/5 w-56 rounded-lg bg-gray-100">
        <img src={image_url} alt={name} className="w-full h-full rounded-lg" />
      </div>

      <div className="space-y-1">
        <p className="line-clamp-1 font-bold text-sm ">{name}</p>
        <p className=" text-sm font-bold text-red-500">234 UGX</p>
        <p className="line-clamp-1  w-full text-xs font-light">{description}</p>
      </div>
      <Button
        onClick={() => setOpen(!open)}
        className="h-10 w-full rounded-lg bg-main gap-x-2 flex items-center justify-center text-black hover:bg-yellow-600"
      >
        {open ? (
          <TbShoppingBagCheck className="text-lg text-green-700" />
        ) : (
          <TbShoppingBag className="text-lg" />
        )}
        {open ? (
          <span className="text-green-700">added to cart</span>
        ) : (
          <span>add to cart</span>
        )}
      </Button>
    </div>
  );
};
