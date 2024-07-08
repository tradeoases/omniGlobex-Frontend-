import { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { tableHeader, wishlistItems } from "@/data/data";
import { Input } from "@/components/ui/input";

export const ShoppingCartPage = () => {
  const [wishlist, setWishlist] = useState(wishlistItems);

  const handleDecreaseQuantity = (itemId: number) => {
    const updatedWishlist = wishlist.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setWishlist(updatedWishlist);
  };

  const handleIncreaseQuantity = (itemId: number) => {
    const updatedWishlist = wishlist.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setWishlist(updatedWishlist);
  };

  const handleRemoveItem = (itemId: number) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== itemId);
    setWishlist(updatedWishlist);
  };

  // const handleRemoveAll = () => {
  //   setWishlist([]);
  // };

  return (
    <div className="bg-white w-full">
      <PageHeader route="/ cart" name="Your Cart" />
      {wishlist.length > 0 ? (
        <div className="w-10/12 text-center xl:w-8/12 mx-auto space-y-8 my-8">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
                {tableHeader.map((header, i) => (
                  <td
                    key={i}
                    className={`py-4 whitespace-nowrap text-center ${
                      header === " Product " ? " min-w-[300px] pl-10 " : " "
                    }`}
                  >
                    {header}
                  </td>
                ))}
              </tr>

              {wishlist.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="pl-10 py-4 w-[380px]">
                    <div className="flex space-x-6 items-center">
                      <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED] relative">
                        <span className="box-border block overflow-hidden w-auto h-auto opacity-100 border-none m-0 p-0 absolute inset-0">
                          <img
                            src={item.icon}
                            alt={item.product}
                            className="w-full h-full object-contain absolute inset-0 box-border p-0 border-none m-auto block min-w-[100%] min-h-[100%] max-h-[100%]"
                          />
                        </span>
                      </div>

                      <div className="flex-1 fle flex-col">
                        <p className="font-medium text-[15px] text-gray-800">
                          {item.product}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="text-center py-4 px-2">
                    <div className="flex justify-center items-center">
                      <span
                        className={`w-5 h-5 block rounded-full bg-[${item.color}]`}
                      ></span>
                    </div>
                    <span
                      className="w-5 h-5 inline-block rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <span className="px-2 inline-block text-xs leading-5 font-semibold rounded-full text-gray-500">
                      {item.size}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <span className="text-xs leading-5 font-semibold text-gray-500">
                      {item.price}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="border w-32 flex items-center justify-between">
                      <Button
                        className="text-base shadow-none border-none rounded-none text-gray-500 px-4 bg-white hover:bg-gray-50"
                        onClick={() => handleDecreaseQuantity(item.id)}
                      >
                        -
                      </Button>
                      <span className="text-gray-500 border-l border-r px-4">
                        {item.quantity}
                      </span>
                      <Button
                        className="text-base shadow-none border-none rounded-none text-gray-500 px-4 bg-white hover:bg-gray-50"
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <span className="text-xs leading-5 font-semibold text-gray-500">
                      {item.total}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-right">
                    <span
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <HiOutlineXMark />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-full gap-8 grid grid-cols-1 md:grid-cols-4">
            <div className="md:col-span-2 xl:col-span-3">
              <div className="border xl:w-72 w-full flex items-center">
                <Input
                  className="py-2 border-none shadow-none rounded-none"
                  placeholder="Discount code"
                />
                <Button className="border-none shadow-none rounded-none h-11">
                  Apply
                </Button>
              </div>
            </div>

            <div className="md:col-span-2 xl:col-span-1 space-y-8">
              <div className="w-full flex justify-between gap-x-2">
                <Button
                  variant="secondary"
                  className="rounded-none shadow-none w-full h-12"
                >
                  Continue Shopping
                </Button>

                <Button
                  variant="secondary"
                  className="rounded-none shadow-none w-full h-12"
                >
                  Update Cart
                </Button>
              </div>

              <div className="border p-4 space-y-8">
                <p className="flex items-center border-b justify-between font-medium pb-4">
                  <span>Subtotal</span>
                  <span className="text-red-500">$321</span>
                </p>

                <p className="font-medium text-left">Shopping</p>

                <form className="flex text-xs flex-col space-y-6">
                  <label className="flex items-center justify-between">
                    <span className="inline-flex gap-x-2  items-center">
                      <input
                        type="radio"
                        className="custom-radio"
                        name="option"
                        value="1"
                      />
                      <span className="">Free Shipping</span>
                    </span>
                    <span>+$00.00</span>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="inline-flex gap-x-2  items-center">
                      <input
                        type="radio"
                        className="custom-radio"
                        name="option"
                        value="2"
                      />
                      <span className="">Flat Rate</span>
                    </span>
                    <span>+$00.00</span>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="inline-flex gap-x-2 items-center">
                      <input
                        type="radio"
                        className="custom-radio"
                        name="option"
                        value="3"
                      />
                      <span className="">Local Delivery</span>
                    </span>
                    <span>+$00.00</span>
                  </label>

                  <p className="font-medium text-left text-base">
                    Calculate Shopping
                  </p>

                  <Input
                    placeholder="Select Country"
                    className="h-11 rounded-none shadow-none"
                  />
                  <Input
                    placeholder="Postcode / ZIP"
                    className="h-11 rounded-none shadow-none"
                  />
                  <Button
                    variant="secondary"
                    className="rounded-none shadow-none w-full h-11"
                  >
                    Update Cart
                  </Button>

                  <p className="flex text-base items-center justify-between font-medium">
                    <span>Total</span>
                    <span className="text-red-500">$321</span>
                  </p>

                  <Button className="rounded-none shadow-none w-full h-11">
                    Checkout
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-10/12 xl:w-8/12 my-8 flex items-center justify-center mx-auto">
          <p className="text-lg font-medium text-gray-400">
            Wish list is empty
          </p>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartPage;
