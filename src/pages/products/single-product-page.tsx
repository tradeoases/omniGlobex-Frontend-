/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { FaFacebookF, FaTwitter } from "react-icons/fa6";
import {
  HiChevronDown,
  HiMiniFlag,
} from "react-icons/hi2";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { IProduct, getOneProduct } from "@/service/apis/product-services";
import { ProductStore, SingleProductStore } from "@/store/product-store";
import { useSearchParams } from "react-router-dom";
import { AxiosResponse, HttpStatusCode } from "axios";
import { ProductCard } from "@/components/product-card";
import { ProductSellerInfoTab } from "@/components/product-seller-info-tab";
import { ProductDescriptionTab } from "@/components/product-description-tab";
import { ProductReviewTab } from "@/components/product-review-tab";
import { productDetailNavs } from "@/data/product-data";

const SingleProduct = () => {
  // const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(productDetailNavs[0]);
  const products = useRecoilValue<IProduct[] | null>(ProductStore);
  const [product, setProduct] = useRecoilState<IProduct | null>(
    SingleProductStore
  );
  // const [count, setCount] = useState<number>(1);
  const [searchParams] = useSearchParams();

  const product_id = searchParams.get(`product_id`);

  const fetchProduct = async () => {
    if (!product_id) {
      return;
    }

    try {
      const response: AxiosResponse<any, any> = await getOneProduct(product_id);

      if (response.status === HttpStatusCode.Ok) {
        setProduct(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !product && fetchProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!product)
    return (
      <div className="h-screen w-screen flex items-center justify-center text-xl animate-pulse">
        Loading...
      </div>
    );

  return (
    <div className="my-20 w-full space-y-20">
      <div className="w-10/12 xl:w-8/12 mx-auto lg:grid grid-cols-2 space-y-8 lg:space-y-0 gap-x-20">
        <div className="space-y-8">
          <div className="w-full border p-8">
            <div className="w-full h-96 flex items-center justify-center bg-gray-400">
              <img
                src={product.cover_image?.thumbnail_url}
                alt={product.name}
                className="object-cover h-full w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-full p-4 border">
                <div className="h-20 bg-gray-400">
                  <img
                    src={product.cover_image?.thumbnail_url}
                    alt={product.name}
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="uppercase font-light text-sm text-gray-600">
            Mobile Phones
          </p>
          <p className="font-semibold">{product.name}</p>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="text-xl text-main">
                  ★
                </span>
              ))}
            </div>
            <p>4 reviews</p>
          </div>

          <p className="flex items-center gap-2">
            <span className="line-through text-gray-400 font-semibold">
              $99.09
            </span>
            <span className="text-2xl font-medium text-red-600">$99.09</span>
          </p>

          <p className="text-sm font-light">{product.description}</p>

          <div>
            <p>Color</p>
            <p className="flex items-center gap-x-4">
              <span className="w-6 h-6 rounded-full flex items-center justify-center bg-black">
                1
              </span>
              <span className="w-6 h-6 rounded-full flex items-center justify-center bg-pink-400">
                1
              </span>
              <span className="w-6 h-6 rounded-full flex items-center justify-center bg-yellow-400">
                1
              </span>
              <span className="w-6 h-6 rounded-full flex items-center justify-center bg-green-400">
                1
              </span>
            </p>
          </div>

          <div>
            <p className="font-light">SIZE</p>
            <Button
              className="bg-white w-full hover:bg-white flex items-center justify-between rounded-none text-black h-12 space-x-8"
              size="lg"
            >
              <span>small</span> <HiChevronDown />
            </Button>
          </div>

          <div className="w-full flex items-center gap-x-2 text-lg">
            {/* <div className="border w-32 bg-white flex items-center">
              <Button
                onClick={() => {
                  if (count === 1) return;

                  setCount(count - 1);
                }}
                className="bg-white hover:bg-white rounded-none text-black shadow-none h-12 space-x-8"
              >
                <HiOutlineMinusSmall />
              </Button>
              <span className="w-10 text-center">{count}</span>

              <Button
                onClick={() => setCount(count + 1)}
                className="bg-white hover:bg-white rounded-none text-black shadow-none h-12 space-x-8"
              >
                <HiOutlinePlusSmall />
              </Button>
            </div>

            <Button
              className="bg-black w-24 rounded-none h-12 space-x-8"
              size="icon"
            >
              <HiMiniHeart className="text-3xl" />
            </Button>

            <Button
              className="bg-black w-full rounded-none h-12 space-x-8"
              size="lg"
              onClick={() => navigate("/login")}
            >
              Add To Cart
            </Button> */}
          </div>

          <div className="space-y-2">
            <p className="text-black text-sm font-light">
              Category : <span className="text-gray-400">Kitchen</span>
            </p>
            <p className="text-black text-sm font-light">
              Tag : <span className="text-gray-400"> Beer, Foamer</span>
            </p>
            <p className="text-black text-sm font-light">
              SKU : <span className="text-gray-400">KE-91039</span>
            </p>
          </div>

          <div className="text-red-600 flex items-center gap-x-4 cursor-pointer">
            <HiMiniFlag />
            <span>Report This Item</span>
          </div>

          <div className="flex items-center gap-x-4">
            <span>Share this </span>
            <FaFacebookF className="text-xl text-blue-800 cursor-pointer" />
            <BiLogoInstagramAlt className="text-xl text-pink-600 cursor-pointer" />
            <FaTwitter className="text-xl text-sky-600 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="w-full space-y-20 pb-20 bg-zinc-100">
        <div className="border-b">
          <div className="w-10/12 xl:w-8/12 mx-auto flex items-center">
            {productDetailNavs.map((nav, i) => (
              <p
                onClick={() => setActiveTab(nav)}
                key={i}
                className={`py-3 px-7 border-b whitespace-nowrap cursor-pointer ${
                  activeTab === nav ? " border-main " : " border-zinc-100 "
                }`}
              >
                {nav}
              </p>
            ))}
          </div>
        </div>
        <div className=" w-10/12 xl:w-8/12 mx-auto space-y-8">
          {activeTab === "Description" && <ProductDescriptionTab />}
          {activeTab === "Seller Info" && (
            <ProductSellerInfoTab products={products} />
          )}
          {activeTab === "Reviews" && <ProductReviewTab />}
        </div>
      </div>

      <div className="w-10/12 xl:w-8/12 mx-auto space-y-8">
        <p className="text-3xl font-bold">Related Products</p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products ? (
            products
              .slice(0, 4)
              .map((product, i) => <ProductCard key={i} {...product} />)
          ) : (
            <div>loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
