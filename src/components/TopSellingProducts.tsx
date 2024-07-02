import { Button } from "./ui/button";
import { SectionHeader } from "./GameWorldSection";
import { IProduct } from "@/service/apis/product-services";
import { Link } from "react-router-dom";

interface Props {
  products: IProduct[] | null;
}

const TopSellingProducts: React.FC<Props> = ({ products }) => {
  return (
    <div className="space-y-3">
      <SectionHeader name="Top Selling Products" view={true} route="" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {products ? (
          products.slice(0, 4).map((product, i) => <Card key={i} {...product} />)
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default TopSellingProducts;

const Card: React.FC<IProduct> = ({
  image_url,
  product_id,
  name,
  description,
}) => {
  return (
    <Link
      to={`/single-product/?product_id=${product_id}`}
      className="px-4 md:px-6 p-4 md:py-6 grid grid-cols-12 gap-x-4 lg:gap-x-6 bg-white"
    >
      <div className="col-span-5  h-32 md:h-40 lg:h-48 p-2 flex items-center justify-center lg:text-3xl">
        <img
          src={image_url}
          alt={name}
          className="object-cover w-52 lg:w-48 h-32 md:h-40 lg:h-48"
        />
      </div>

      <div className="space-y-1 col-span-7 md:space-y-3 lg:space-y-4">
        <div className="flex items-center gap-x-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span className="text-lg text-main" key={i}>
              ★
            </span>
          ))}
        </div>

        <p className="font-semibold line-clamp-2 md:text-sm">{description}</p>
        <p className="text-sm lg:text-base font-bold flex items-center gap-x-3">
          <span className="text-gray-400 line-through">$20.64</span>{" "}
          <span className="text-red-600">$27.61</span>
        </p>
        <Button className="rounded-none bg-main text-xs h-8 text-black">
          Add To Cart
        </Button>
      </div>
    </Link>
  );
};
