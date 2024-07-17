import { IProduct } from "@/service/apis/product-services";
import { GoArrowRight } from "react-icons/go";
import { ProductCard } from "./product-card";
import { GameSectionSidebar } from "./game-section-side-bar";
import { ProductSkeleton } from "./product-skeleton";

interface Props {
  name: string;
  route?: string;
  products: IProduct[] | null;
}

const GameWorldSection: React.FC<Props> = ({ name, products }) => {
  return (
    <div className="w-full pt-8 space-y-3 bg-slate-950 p-8">
      <SectionHeader classList="text-white" name={name} view={true} />
      <div className="hidden lg:grid grid-cols-1 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <GameSectionSidebar />
        {products
          ? products
              .slice(0, 3)
              .map((product, i) => <ProductCard key={i} {...product} />)
          : Array.from({ length: 3 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
      </div>

      <div className="lg:hidden space-y-8">
        <GameSectionSidebar />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products
            ? products
                .slice(0, 2)
                .map((product, i) => <ProductCard key={i} {...product} />)
            : Array.from({ length: 2 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default GameWorldSection;

interface ISectionHeader {
  name: string;
  view?: boolean;
  route?: string;
  classList?: string;
}

export const SectionHeader: React.FC<ISectionHeader> = ({
  name,
  view = false,
  classList,
}) => {
  return (
    <div className={`flex items-center justify-between ${classList}`}>
      <p className="text-base md:text-2xl font-bold">{name}</p>
      <div>
        {view && (
          <p className="flex items-center justify-end gap-3">
            <span className="text-xs font-bold">View More</span>
            <GoArrowRight className="text-sm animate-in" />
          </p>
        )}
      </div>
    </div>
  );
};
