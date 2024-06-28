import AnnounceBanner from "@/components/AnnounceBanner";
import BestSeller from "@/components/BestSeller";
import GameWorldSection from "@/components/GameWorldSection";
import NewArrivalSection from "@/components/NewArrivalSection";
import PopularSales from "@/components/PopularSales";
import ShopBrandSection from "@/components/ShopBrandSection";
import TopSellingProducts from "@/components/TopSellingProducts";
import { BsMinecartLoaded } from "react-icons/bs";
import { GoTrophy } from "react-icons/go";
import { MdOutlineSecurity } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";

export default function HomePage() {
  return (
    <main className="w-10/12 xl:w-8/12 mx-auto py-8 space-y-20">
      <Header />
      <OurServices />
      <GameWorldSection name="Country showrooms" route="" />
      <ShopBrandSection />
      <AnnounceBanner />
      <TopSellingProducts />
      <BestSeller />
      <GameWorldSection name="Popular Sales" route="" />
      <NewArrivalSection />
      <PopularSales />
    </main>
  );
}

const Header = () => {
  return (
    <div className="gap-x-0 space-y-8 xl:space-y-0 xl:grid grid-cols-3 xl:gap-x-8">
      <div className="col-span-2 bg-gray-300 h-96 xl:h-[600px] flex items-center justify-center">
        <p className="font-bold text-5xl">740X600</p>
      </div>

      <div className="col-span-1 flex gap-x-8 xl:gap-x-0 justify-between w-full items-center xl:block space-y-0 xl:space-y-8  xl:h-[600px]">
        <div className="h-72 bg-gray-300 w-full flex items-center justify-center">
          <p className="font-bold text-lg md:text-5xl">400X285</p>
        </div>
        <div className="h-72 w-full bg-gray-300 flex items-center justify-center">
          <p className="font-bold text-lg md:text-5xl">400X285</p>
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
