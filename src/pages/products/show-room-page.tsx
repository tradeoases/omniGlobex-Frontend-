/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// import { PageHeader } from "@/components/PageHeader";
import { useRecoilState } from "recoil";
import { getAllProducts, IProduct } from "@/service/apis/product-services";
import { ProductStore } from "@/store/product-store";
import { AxiosResponse, HttpStatusCode } from "axios";
import { Header } from "@/components/header";
// import AllProductsPage from "./all-products-page";

const ShowRoomPage = () => {
  // const [activeCategory, setActiveCategory] = useState<string>(
  //   categories[0].name
  // );
  // const sliderRef = useRef<HTMLDivElement>(null);
  // const [searchParams] = useSearchParams();
  // const country = searchParams.get(`country`);
  const [products, setProducts] = useRecoilState<IProduct[] | null>(
    ProductStore
  );

  const fetchProducts = async () => {
    try {
      const response: AxiosResponse<any, any> = await getAllProducts(
        `?page=1&pageSize=25`
      );
      // console.log({ response });

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
    <div className="w-full">
      
      <div className="w-10/12 mt-8 xl:w-8/12 mx-auto">
        <Header products={products} />
      </div>
    </div>
  );
};

export default ShowRoomPage;



export function CarouselPlugin() {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  const products = [
    { id: 1, name: "Product 1", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Product 2", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Product 3", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Product 4", image: "https://via.placeholder.com/150" },
    { id: 5, name: "Product 5", image: "https://via.placeholder.com/150" },
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-10/12 xl:w-8/12 mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="h-96">
        {products.map((product) => (
          <CarouselItem key={product.id}>
            <div className="p-1 h-full">
              <Card className="h-full">
                <CardContent className="flex aspect-square items-center justify-center p-6 h-full">
                  <img src={product.image} alt={product.name} className="" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
