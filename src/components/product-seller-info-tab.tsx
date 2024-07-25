import { IProduct } from "@/service/apis/product-services";
import { ProductCard } from "./product-card";

interface Props {
  products: IProduct[] | null;
}

export const ProductSellerInfoTab: React.FC<Props> = ({ products }) => {
  return (
    <div className="w-full space-y-20">
      <div className=" space-y-10 lg:flex items-center justify-between border-b pb-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products ? (
            products
              .slice(0, 8)
              .map((product, i) => <ProductCard key={i} {...product} />)
          ) : (
            <div>loading</div>
          )}
        </div>
      </div>
    </div>
  );
};
