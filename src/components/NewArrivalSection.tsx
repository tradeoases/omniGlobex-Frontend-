import { IProduct } from "@/service/apis/product-services";
import { SectionHeader } from "./GameWorldSection";
import { ProductCard } from "./product-card";

interface Props {
  products: IProduct[] | null;
}

const NewArrivalSection: React.FC<Props> = ({ products }) => {
  return (
    <div className="w-full space-y-3">
      <SectionHeader name="New Arrivals" view={true} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products ? (
          products
            .slice(0, 8)
            .map((product, i) => <ProductCard key={i} {...product} />)
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default NewArrivalSection;
