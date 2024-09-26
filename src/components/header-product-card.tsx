import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { AxiosResponse, HttpStatusCode } from "axios";
import { BiLoader } from "react-icons/bi";
import { TbShoppingBag, TbShoppingBagCheck } from "react-icons/tb";

import { IProduct } from "@/service/apis/product-services";
import { Button } from "./ui/button";
import { IOrder, OrdersStore } from "@/store/order-store";
import { IUser, userStore } from "@/store/user-store";
import {
  createOrder,
  deleteOneOrderByUser,
  getAllUserOrders,
  ICreateOrder,
} from "@/service/apis/order-service";

export const HeaderProductCard: React.FC<IProduct> = ({
  image_url,
  description,
  name,
  product_id,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isAddedToCart, setIsAddToCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useRecoilState<IOrder[] | null>(
    OrdersStore
  );
  const navigate = useNavigate();
  const userData = useRecoilValue<IUser | null>(userStore);

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
        console.log(response);
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
        onClick={() => {
          isAddedToCart ? removeToCart() : addToCart();
        }}
        className="h-10 w-full rounded-lg bg-main gap-x-2 flex items-center justify-center text-black hover:bg-yellow-600"
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
          <span className="text-green-700">added to cart</span>
        ) : (
          <span>add to cart</span>
        )}
      </Button>
    </div>
  );
};
