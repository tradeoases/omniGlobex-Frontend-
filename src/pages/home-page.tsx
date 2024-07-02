/* eslint-disable @typescript-eslint/no-explicit-any */
import AnnounceBanner from "@/components/AnnounceBanner";
import BestSeller from "@/components/BestSeller";
import GameWorldSection from "@/components/GameWorldSection";
import NewArrivalSection from "@/components/NewArrivalSection";
import PopularSales from "@/components/PopularSales";
import ShopBrandSection from "@/components/ShopBrandSection";
import TopSellingProducts from "@/components/TopSellingProducts";
import { IProduct, getAllProducts } from "@/service/apis/product-services";
import { ProductStore } from "@/store/product-store";
import { AxiosResponse, HttpStatusCode } from "axios";
import { useEffect } from "react";
import { BsMinecartLoaded } from "react-icons/bs";
import { GoTrophy } from "react-icons/go";
import { MdOutlineSecurity } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

export default function HomePage() {
  const [products, setProducts] = useRecoilState<IProduct[] | null>(
    ProductStore
  );

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

  return (
    <main className="w-10/12 xl:w-8/12 mx-auto py-8 space-y-20">
      <Header products={products} />
      <OurServices />
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

interface IHeader {
  products: IProduct[] | null;
}

const Header: React.FC<IHeader> = ({ products }) => {
  if(!products) {
    return (
      <div>loading...</div>
    )
  }
  return (
    <div className="gap-x-0 space-y-8 xl:space-y-0 xl:grid grid-cols-3 xl:gap-x-8">
      <Link
        to={`/single-product/?product_id=${products && products[0].product_id}`}
        className="col-span-2 bg-gray-300 h-96 xl:h-[600px] flex items-center justify-center"
      >
        <img
          className="w-full h-full object-cover"
          src={products && (products[0].image_url as string)}
          alt={products && (products[0].name as string)}
        />
      </Link>

      <div className="col-span-1 flex gap-x-8 xl:gap-x-0 justify-between w-full items-center xl:block space-y-0 xl:space-y-8  xl:h-[600px]">
        <div className="h-72 bg-gray-300 w-full flex items-center justify-center">
          <img
            className="w-full h-full object-cover"
            src={products && (products[1].image_url as string)}
            alt={products && (products[1].name as string)}
          />
        </div>
        <div className="h-72 w-full bg-gray-300 flex items-center justify-center">
          <img
            className="w-full h-full object-cover"
            src={products && (products[0].image_url as string)}
            alt={products && (products[0].name as string)}
          />
        </div>
      </div>
    </div>
  );
};

interface IOurService {
  title: string;
  description: string;
  icon: JSX.Element;
  id: number;
}

const OurServices = () => {
  return (
    <div className="w-full bg-white space-y-10 lg:space-y-0 lg:flex items-center justify-between p-6 xl:p-12">
      {ourServices.map((service, i) => (
        <OurServiceItem key={i} {...service} />
      ))}
    </div>
  );
};

const OurServiceItem: React.FC<IOurService> = ({
  description,
  icon,
  title,
  id,
}) => {
  return (
    <div className="flex items-center gap-x-4">
      <span className={`text-main  ${id === 2 ? "text-5xl" : "text-4xl"}`}>
        {icon}
      </span>
      <div className="space-y-1">
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
};

const ourServices: IOurService[] = [
  {
    id: 1,
    title: "Free Shipping",
    description: "When order over $100",
    icon: <BsMinecartLoaded />,
  },
  {
    id: 2,
    title: "Free Return",
    description: "Get Return within 30 days",
    icon: <TbTruckReturn />,
  },
  {
    id: 3,
    title: "Secure Payment",
    description: "100% Secure Online Payment",
    icon: <MdOutlineSecurity />,
  },
  {
    id: 4,
    title: "Best Quality",
    description: "Original Product Guaranteed",
    icon: <GoTrophy />,
  },
];
