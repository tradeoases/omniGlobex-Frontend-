import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "./ui/button";
import { SlHandbag } from "react-icons/sl";
import { useState } from "react";
import { IWishList, wishlistItems } from "@/data/data";
import { CartHeaderItem } from "./cart-header-item";
import { useNavigate } from "react-router-dom";
import { ICreateOrder } from "@/service/apis/order-service";
import { OrdersInCartStore } from "@/store/order-store";
import { useRecoilState } from "recoil";


export const HeaderCartNav = () => {
  const [wishlist, setWishlist] = useState<IWishList[]>(wishlistItems);
  const navigate = useNavigate();

  const handleRemoveItem = (itemId: string) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== itemId);
    setWishlist(updatedWishlist);
  };

  const [cartItems, setCartItems] =
    useRecoilState<ICreateOrder[]>(OrdersInCartStore);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="relative p-0 m-0">
          <span className="bg-main w-5 h-5 rounded-full text-xs flex items-center justify-center absolute top-0 -right-3">
            3
          </span>
          <SlHandbag className="text-lg" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72 rounded-none p-0">
        <div className="bg-main w-full h-1" />
        <div className="px-4 text-xs">
          <div className="h-72 scrollbar pr-2 mb-4 space-y-4 overflow-y-scroll">
            {cartItems.map((product: ICreateOrder, i:number) => (
              <CartHeaderItem
                {...product}
                onClose={() => handleRemoveItem(product.product_id)}
                key={i}
              />
            ))}
          </div>

          <div className="border-t py-2 space-y-4">
            <p className="flex text-sm font-medium items-center justify-between">
              <span>Subtotal</span>
              <span className="text-red-500 font-medium">$234</span>
            </p>

            <div className="w-full flex space-y-2 flex-col">
              <Button
                onClick={() => navigate("/cart")}
                variant="secondary"
                className="rounded-none shadow-none w-full h-12"
              >
                View Cart
              </Button>
              <Button
                onClick={() => navigate("/checkout")}
                className="rounded-none bg-main text-black hover:bg-main/80 shadow-none w-full h-12"
              >
                Checkout Now
              </Button>
            </div>

            <div className="border-t text-gray-500 pt-4 text-sm text-center">
              <p>
                Get Return within{" "}
                <span className="text-black font-medium">30 days</span>
              </p>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
