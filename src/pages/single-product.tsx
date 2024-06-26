import { Button } from "@/components/ui/button";
import { FaFacebookF, FaTwitter } from "react-icons/fa6";
import {
  HiChevronDown,
  HiMiniFlag,
  HiMiniHeart,
  HiOutlineMinusSmall,
  HiOutlinePlusSmall,
} from "react-icons/hi2";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { useState } from "react";
import { ProductCard } from "@/components/GameWorldSection";

const SingleProduct = () => {
  const [activeTab, setActiveTab] = useState<string>(productDetailNavs[0]);
  return (
    <div className="my-20 w-full space-y-20">
      <div className="w-10/12 xl:w-8/12 mx-auto grid grid-cols-2 gap-x-20">
        <div className="space-y-8">
          <div className="w-full border p-8">
            <div className="w-full h-96 bg-gray-400"></div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-full p-4 border">
                <div className="h-20 bg-gray-400"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="uppercase font-light text-sm text-gray-600">
            Mobile Phones
          </p>
          <p className="font-semibold">
            Samsung Galaxy Z Fold3 5G 3 colors in 512GB
          </p>

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

          <p className="text-sm font-light">
            It is a long established fact that a reader will be distracted by
            the readable there content of a page when looking at its layout.
          </p>

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
            <div className="border w-32 bg-white flex items-center">
              <Button className="bg-white hover:bg-white rounded-none text-black shadow-none h-12 space-x-8">
                <HiOutlineMinusSmall />
              </Button>
              <span className="w-10 text-center">1</span>

              <Button className="bg-white hover:bg-white rounded-none text-black shadow-none h-12 space-x-8">
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
            >
              Add To Cart
            </Button>
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

          <div className="text-red-600 flex items-center gap-x-4">
            <HiMiniFlag />
            <span>Report This Item</span>
          </div>

          <div className="flex items-center gap-x-4">
            <span>Share this </span>
            <FaFacebookF className="text-xl text-blue-800" />
            <BiLogoInstagramAlt className="text-xl text-pink-600" />
            <FaTwitter className="text-xl text-sky-600" />
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
                className={`py-3 px-7 border-b cursor-pointer ${
                  activeTab === nav ? " border-main " : " border-zinc-100 "
                }`}
              >
                {nav}
              </p>
            ))}
          </div>
        </div>
        <div className=" w-10/12 xl:w-8/12 mx-auto space-y-8">
          {activeTab === "Description" && <Description />}
          {activeTab === "Seller Info" && <SellerInfo />}
          {activeTab === "Reviews" && <ReviewContent />}
        </div>
      </div>

      <div className="w-10/12 xl:w-8/12 mx-auto space-y-8">
        <p className="text-3xl font-bold">Related Products</p>

        <div className="w-full grid grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

const productDetailNavs = [`Description`, `Reviews`, `Seller Info`];

const Description = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-lg font-semibold">Introduction</p>
        <p className="text-gray-400">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries but also the on leap into electronic typesetting,
          remaining essentially unchanged. It wasn’t popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages,
          andei more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum to make a type specimen
          book.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-lg font-semibold">Features: </p>
        <ul className="text-gray-400 list-disc list-inside text-sm">
          <li>slim body with metal cover</li>
          <li>latest Intel Core i5-1135G7 processor (4 cores / 8 threads)</li>
          <li>8GB DDR4 RAM and fast 512GB PCIe SSD</li>
          <li>
            NVIDIA GeForce MX350 2GB GDDR5 graphics card backlit keyboard,
            touchpad with gesture support
          </li>
        </ul>
      </div>
    </div>
  );
};

const SellerInfo = () => {
  return (
    <div className="w-full space-y-20">
      <div className="flex items-center justify-between border-b pb-8">
        <div className="flex items-center gap-x-4">
          <img
            src="https://ik.imagekit.io/2ujnunod7moo/profile1_6ynm5mYwy.jpeg?updatedAt=1691099202935"
            alt="seller"
            className="w-16 h-16 rounded-full bg-contain"
          />

          <div className="space-y-3">
            <p className="text-md font-semibold">Ridoy Rock</p>
            <p className="text-sm font-light">London,United Kingdom</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="text-xl text-main">
                    ★
                  </span>
                ))}
              </div>
              <span>(4.5)</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p>
            Products: <span className="text-gray-400">120</span>
          </p>
          <p>
            Category:{" "}
            <span className="text-gray-400">
              Mobile Phone, Sports, Gaming, Electronics
            </span>
          </p>
          <p>
            Products: <span className="text-gray-400">Beer, Foamer</span>
          </p>
        </div>

        <div className="space-y-3">
          <p>
            Products: <span className="text-gray-400">120</span>
          </p>
          <p>
            Category:{" "}
            <span className="text-gray-400">
              Mobile Phone, Sports, Gaming, Electronics
            </span>
          </p>
          <p>
            Products: <span className="text-gray-400">Beer, Foamer</span>
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <p className="text-lg font-semibold">Product from Shop</p>

        <div className="grid grid-cols-4 gap-x-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ReviewContent = () => {
  return (
    <div className="w-full h-full flex items-center justify-center text-4xl font-bold animate-pulse">
      coming soon...
    </div>
  );
};
