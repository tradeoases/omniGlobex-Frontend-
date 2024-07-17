import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { HiArrowPath } from "react-icons/hi2";
import { IoExpandOutline } from "react-icons/io5";
import { TbShoppingBag, TbShoppingBagCheck } from "react-icons/tb";

import { Button } from "./ui/button";
import { IProduct } from "@/service/apis/product-services";

export const ProductCard: React.FC<IProduct> = ({
  image_url,
  name,
  description,
  product_id,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [fav, setFav] = useState<boolean>(false);
  const [cartAdded, setCartAdded] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <div
      className="w-full rounded-xl p-6 relative shadow space-y-4 bg-white"
      onMouseEnter={() => setOpen(true)}
    >
      <div className="w-full h-52 rounded-xl flex items-center justify-center bg-gray-300">
        <img
          className="object-cover rounded-xl w-full h-full"
          src={image_url}
          alt={name}
        />
      </div>

      <div className="flex items-center gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="text-xl text-main">
            ★
          </span>
        ))}
      </div>

      <p className="font-bold line-clamp-2 text-sm hover:text-main relative">
        {description}
      </p>

      <p className="text-base font-semibold flex gap-x-4">
        <span className="text-gray-400 line-through">$28.27</span>
        <span className="text-red-600">$18.72</span>
      </p>

      <div>
        <span className="text-xs bg-green-500 uppercase right-7 px-3 rounded-full text-white absolute top-7">
          popular
        </span>
        {/* <div className="w-full  absolute top-5 left-0 px-6">
          <p className="h-1 w-2/3 bg-main"></p>
        </div> */}
      </div>

      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute -top-4 left-0 w-full bg-black/5 border rounded-xl h-full p-6"
        >
          <div className="absolute bottom-6 w-full right-0 left-0 px-6">
            <Button
              onClick={() => setCartAdded(!cartAdded)}
              className="w-full z-10 border-none flex items-center justify-center gap-x-4 bg-main hover:bg-main text-black"
            >
              {cartAdded ? (
                <TbShoppingBagCheck className="text-lg text-green-700" />
              ) : (
                <TbShoppingBag className="text-lg" />
              )}
              {cartAdded ? (
                <span className="whitespace-nowrap text-green-700">
                  added to cart
                </span>
              ) : (
                <span className="whitespace-nowrap">add to cart</span>
              )}
            </Button>
          </div>

          <div className="w-14 h-52 absolute  p-2 flex items-center gap-2 flex-col justify-center right-6">
            <Button
              onClick={() =>
                navigate(`/single-product/?product_id=${product_id}`)
              }
              className="w-10 h-10"
              variant="outline"
              size="icon"
            >
              <IoExpandOutline className="text-2xl" />
            </Button>
            <Button
              onClick={() => setFav(!fav)}
              className="w-10 h-10"
              variant="outline"
              size="icon"
            >
              {fav ? (
                <IoMdHeart className="text-2xl text-main" />
              ) : (
                <IoIosHeartEmpty className="text-2xl" />
              )}
            </Button>
            <Button className="w-10 h-10" variant="outline" size="icon">
              <HiArrowPath className="text-2xl" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
