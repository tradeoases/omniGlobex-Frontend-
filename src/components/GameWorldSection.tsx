import { IProduct } from "@/service/apis/product-services";
import { GoArrowRight } from "react-icons/go";
import { LuChevronRight } from "react-icons/lu";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  route?: string;
  products: IProduct[] | null;
}

const GameWorldSection: React.FC<Props> = ({ name, products }) => {
  return (
    <div className="w-full pt-8 space-y-3">
      <SectionHeader name={name} view={true} />
      <div className="hidden lg:grid grid-cols-1 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <GameSectionSidebar />
        {products ? (
          products
            .slice(1, 4)
            .map((product, i) => <ProductCard key={i} {...product} />)
        ) : (
          <div>loading...</div>
        )}
      </div>

      <div className="lg:hidden grid grid-cols-1 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <GameSectionSidebar />
        {products ? (
          products.map((product, i) => <ProductCard key={i} {...product} />)
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default GameWorldSection;

interface ISectionHeader {
  name: string;
  view?: boolean;
  route?: string;
}

export const SectionHeader: React.FC<ISectionHeader> = ({
  name,
  view = false,
}) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-2xl font-bold">{name}</p>
      <div>
        {view && (
          <p className="flex items-center justify-end gap-3">
            <span className="text-sm font-bold">View More</span>
            <GoArrowRight className="text-sm animate-ping" />
          </p>
        )}
      </div>
    </div>
  );
};

const GameSectionSidebar = () => {
  return (
    <div className="hidden xl:block w-full p-8 bg-gray-200">
      <div className="space-y-6">
        <p className="text-base font-bold">Mobile & Tablet</p>

        <div className="space-y-4">
          {gameSectionNavs.map((nav, i) => (
            <Link
              to={`/show-room/?country=${nav.title}`}
              key={i}
              className="text-gray-400 block"
            >
              {nav.title}
            </Link>
          ))}
          <p className="font-bold flex items-center gap-4">
            <span>Shop Now </span>
            <LuChevronRight />
          </p>
        </div>
      </div>
    </div>
  );
};

const gameSectionNavs = [
  { title: "Uganda", route: "" },
  { title: "Kenya", route: "" },
  { title: "Rwanda", route: "" },
  { title: "South Africa", route: "" },
];

export const ProductCard: React.FC<IProduct> = ({
  image_url,
  name,
  description,
  product_id,
}) => {
  return (
    <Link
      to={`/single-product/?product_id=${product_id}`}
      className="w-full p-6 space-y-4 bg-[#fff]"
    >
      <div className="w-full h-52 flex items-center justify-center bg-gray-300">
        <img className="object-cover w-full h-full" src={image_url} alt={name} />
      </div>

      <div className="flex items-center gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="text-xl text-main">
            ★
          </span>
        ))}
      </div>

      <p className="font-bold line-clamp-2">{description}</p>

      <p className="text-base font-semibold flex gap-x-4">
        <span className="text-gray-400 line-through">$28.27</span>
        <span className="text-red-600">$18.72</span>
      </p>
    </Link>
  );
};
