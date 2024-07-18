import { IProduct } from "@/service/apis/product-services";
import { Link } from "react-router-dom";
import { SectionHeader } from "./section-header";

interface Props {
  products: IProduct[] | null;
}

const PopularSales: React.FC<Props> = ({ products }) => {
  return (
    <div className="w-full ">
      <div className="bg-black p-2 pb-3">
        <SectionHeader
          classList="text-main"
          name="Popular Sales"
          route=""
          view={true}
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {products ? (
          products
            .slice(0, 9)
            .map((product, i) => <PopularSaleItem key={i} {...product} />)
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default PopularSales;

const PopularSaleItem: React.FC<IProduct> = ({
  description,
  image_url,
  product_id,
  name,
}) => {
  return (
    <Link
      to={`/single-product/?product_id=${product_id}`}
      className="p-4 rounded-xl py-3 border-b border-light w-full grid grid-cols-12 bg-white gap-x-3"
    >
      <img
        className="object-cover rounded-xl col-span-3"
        src={image_url}
        alt={name}
      />

      <div className="col-span-9 space-y-1 flex flex-col justify-center">
        <p className="line-clamp-1 text-xs font-bold">{name}</p>
        <p className="line-clamp-2 text-xs font-light">{description}</p>
        <p className="text-sm font-bold flex items-center gap-2">
          <span className="line-through text-gray-400">$ 20.12</span>
          <span className=" text-red-500">$18</span>
        </p>
      </div>
    </Link>
  );
};
