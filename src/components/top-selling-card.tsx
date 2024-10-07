import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { AxiosResponse, HttpStatusCode } from "axios";
import { TbShoppingBag, TbShoppingBagCheck } from "react-icons/tb";
import { IoExpandOutline } from "react-icons/io5";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { HiArrowPath } from "react-icons/hi2";
import { BiLoader } from "react-icons/bi";

import { IProduct } from "@/service/apis/product-services";
import { Button } from "./ui/button";
import { IUser, userStore } from "@/store/user-store";
import { IOrder, OrdersStore } from "@/store/order-store";
import {
  createOrder,
  deleteOneOrderByUser,
  getAllUserOrders,
  ICreateOrder,
} from "@/service/apis/order-service";

export const TopSellingCard: React.FC<IProduct> = ({
  cover_image,
  product_id,
  name,
  description,
  price_currency,
  product_price
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [fav, setFav] = useState<boolean>(false);
  const [isAddedToCart, setIsAddToCart] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cartItems, setCartItems] = useRecoilState<IOrder[] | null>(
    OrdersStore
  );
  const userData = useRecoilValue<IUser | null>(userStore);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems) {
      cartItems.some((item) => item.product_id === product_id)
        ? setIsAddToCart(true)
        : setIsAddToCart(false);
    }
  }, [cartItems]);

  const addToCart = async () => {
    if (!userData) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const data: ICreateOrder = {
        product_id,
        quantity: 1,
      };
      const response: AxiosResponse = await createOrder(data);

      if (response.status === HttpStatusCode.Created) {
        await fetchOrdersByUser();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchOrdersByUser = async () => {
    try {
      const response: AxiosResponse = await getAllUserOrders();

      if (response.status === HttpStatusCode.Ok) {
        setCartItems(response.data.data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const removeToCart = async () => {
    if (!cartItems) {
      return;
    }

    try {
      setLoading(true);

      const orderId: string = cartItems?.filter(
        (item) => item.product_id === product_id
      )[0].order_id as string;

      const response: AxiosResponse = await deleteOneOrderByUser(orderId);

      if (response.status === HttpStatusCode.Ok) {
        setLoading(false);
        fetchOrdersByUser();
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      className="px-2 xl:px-4 rounded-xl md:px-6 relative p-4 md:py-6 grid grid-cols-12 gap-x-4 xl:gap-x-6 bg-white"
    >
      <div className="col-span-5 h-32 md:h-40 lg:h-48 p-2 flex items-center justify-center lg:text-3xl">
        <img
          src={cover_image?.thumbnail_url}
          alt={name}
          className="object-cover w-52 rounded-xl lg:w-32 xl:w-48 h-32 md:h-40 xl:h-48"
        />
      </div>

      <div className="space-y-1 h-32 col-span-7 md:h-40 xl:h-48 md:space-y-3 lg:space-y-2 xl:space-y-4">
        <div className="flex items-center gap-x-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <span className="text-lg text-main" key={i}>
              ★
            </span>
          ))}
        </div>

        <p className="font-semibold text-xs line-clamp-2 md:text-sm">
          {description}
        </p>
        <p className="text-sm lg:text-base font-bold flex items-center gap-x-3">
          {/* <span className="text-gray-400 line-through">$20.64</span>{" "} */}
          <span className="text-red-600">{price_currency} {product_price}</span>
        </p>
        {!open && (
          <Button className=" bg-main text-xs h-8 text-black">
            {isAddedToCart ? (
              <span className="text-green-700">Added to cart</span>
            ) : (
              <span>Add to cart</span>
            )}
          </Button>
        )}
      </div>

      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute top-0 rounded-xl left-0 w-full bg-black/5 border h-full p-6"
        >
          <div onClick={()=> navigate('/products')} className="absolute ml-7 bottom-4 md:bottom-6 lg:bottom-10 xl:bottom-6 w-full flex items-center md:ml-4 lg:ml-8 xl:ml-3 justify-center right-0 left-0 px-6">
            <Button
              disabled
              onClick={() => {
                isAddedToCart ? removeToCart() : addToCart();
              }}
              className="border-none flex items-center justify-center gap-x-2 bg-main hover:bg-main text-black"
            >
              {loading && (
                <span className="text-lg animate-spin">
                  <BiLoader />
                </span>
              )}

              {!loading && isAddedToCart ? (
                <TbShoppingBagCheck className="text-lg text-green-700" />
              ) : (
                <TbShoppingBag className="text-lg" />
              )}

              {!loading && isAddedToCart ? (
                <span className="whitespace-nowrap text-green-700">
                  added to cart
                </span>
              ) : (
                <span className="whitespace-nowrap">add to cart</span>
              )}
            </Button>
          </div>

          <div className="w-14 h-full top-0 absolute  p-2 flex items-center gap-2 flex-col justify-center right-4">
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
