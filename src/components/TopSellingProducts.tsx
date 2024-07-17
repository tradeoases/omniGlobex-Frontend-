import { SectionHeader } from "./GameWorldSection";
import { IProduct } from "@/service/apis/product-services";
import { TopSellingCard } from "./top-selling-card";

interface Props {
  products: IProduct[] | null;
}

const TopSellingProducts: React.FC<Props> = ({ products }) => {
  return (
    <div className="space-y-3">
      <SectionHeader name="Top Selling Products" view={true} route="" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {products ? (
          products
            .slice(0, 4)
            .map((product, i) => <TopSellingCard key={i} {...product} />)
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default TopSellingProducts;
