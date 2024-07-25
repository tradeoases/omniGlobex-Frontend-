/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse, HttpStatusCode } from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { getAllProductByUser, IProduct } from "@/service/apis/product-services";
import { ProductByUserStore } from "@/store/product-store";
import { Button } from "./ui/button";
import { ProductCard } from "./product-card";

interface Props {
  onOpen: () => void;
}

export const ProductManagementProductTab: React.FC<Props> = ({ onOpen }) => {
  const [products, setProducts] = useRecoilState<IProduct[] | null>(
    ProductByUserStore
  );

  const fetchProducts = async () => {
    try {
      const response: AxiosResponse<any, any> = await getAllProductByUser();

      if (response.status === HttpStatusCode.Ok) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !products && fetchProducts();
  }, []);

  return (
    <div className="space-y-10 w-full">
      <div className="w-full">
        <Button onClick={onOpen} className="text-xs" size={"sm"}>
          New Product
        </Button>
      </div>

      <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {products ? (
          products
            .slice(0, 8)
            .map((product, i) => <ProductCard key={i} {...product} />)
        ) : (
          <div>no product</div>
        )}
      </div>
    </div>
  );
};
