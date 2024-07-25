/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { AxiosResponse, HttpStatusCode } from "axios";

import AnnounceBanner from "@/components/AnnounceBanner";
import BestSeller from "@/components/BestSeller";
import GameWorldSection from "@/components/GameWorldSection";
import NewArrivalSection from "@/components/NewArrivalSection";
import { OurServiceSection } from "@/components/our-service-section";
import PopularSales from "@/components/PopularSales";
import ShopBrandSection from "@/components/ShopBrandSection";
import TopSellingProducts from "@/components/TopSellingProducts";
import { IProduct, getAllProducts } from "@/service/apis/product-services";
import { ProductStore } from "@/store/product-store";
import { HeaderSection } from "@/components/header-section";
import { useRef } from "react";

export default function HomePage() {
  const [products, setProducts] = useRecoilState<IProduct[] | null>(
    ProductStore
  );
  const sectionRef = useRef<HTMLDivElement>(null);

  const fetchProducts = async () => {
    try {
      const response: AxiosResponse<any, any> = await getAllProducts(
        `?page=1&pageSize=25`
      );

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

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="w-10/12 xl:w-8/12 mx-auto py-8 space-y-10">
      <HeaderSection onScroll={() => scrollToSection()} />
      <OurServiceSection sectionRef={sectionRef} />
      <GameWorldSection products={products} name="Country showrooms" route="" />
      <ShopBrandSection />
      <AnnounceBanner />
      <TopSellingProducts products={products} />
      <BestSeller />
      <GameWorldSection products={products} name="Popular Sales" route="" />
      <NewArrivalSection products={products} />
      <PopularSales products={products} />
    </main>
  );
}
