import React from "react";
import { useSearchParams } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import AllProductsPage from "./all-products-page";
import { PageHeader } from "@/components/PageHeader";

const ShowRoomPage = () => {
  // const [activeCategory, setActiveCategory] = useState<string>(
  //   categories[0].name
  // );
  // const sliderRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const country = searchParams.get(`country`);

  return (
    <div className="w-full">
      <PageHeader
        name={`show room: ${country || ``}`}
        route={`/ ${country || ``}`}
      />
      <div className="w-10/12 xl:w-8/12 mx-auto flex items-center justify-center font-bold text-gray-400 border rounded-md bg-gray-50 h-96 mt-10">
        advert...
      </div>
      <AllProductsPage />
    </div>
  );
};

export default ShowRoomPage;

export const categories = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Health" },
  { id: 3, name: "Finance" },
  { id: 4, name: "Education" },
  { id: 5, name: "Travel" },
  { id: 6, name: "Food" },
  { id: 7, name: "Lifestyle" },
  { id: 8, name: "Entertainment" },
  { id: 9, name: "Sports" },
  { id: 10, name: "Science" },
  { id: 11, name: "Fashion" },
  { id: 9, name: "Sports" },
  { id: 10, name: "Science" },
  { id: 11, name: "Fashion" },
  { id: 9, name: "Sports" },
  { id: 10, name: "Science" },
  { id: 11, name: "Fashion" },
  { id: 12, name: "Business" },
];

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
