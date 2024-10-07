/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse, HttpStatusCode } from "axios";

import { getAllProductByUser, IProduct } from "@/service/apis/product-services";
import { Button } from "../../../components/ui/button";
import { ProductCard } from "../../../components/product-card";
import { useQuery } from "@tanstack/react-query";

interface Props {
  onOpen: () => void;
}

export const ProductManagementProductTab: React.FC<Props> = ({ onOpen }) => {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllProductByUser();

      if (response.status === HttpStatusCode.Ok) {
        return response.data.data;
      }
    },
  });

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
            ?.slice(0, 8)
            ?.map((product: IProduct) => <ProductCard {...product} />)
        ) : (
          <div>no product</div>
        )}
      </div>
    </div>
  );
};
