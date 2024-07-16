import { IWishList } from "@/data/data";
import { HiOutlineXMark } from "react-icons/hi2";

interface Props extends IWishList {
  onClose: () => void;
}

export const CartHeaderItem: React.FC<Props> = ({
  icon,
  product,
  price,
  onClose,
}) => {
  return (
    <div className="w-full flex justify-between py-2">
      <div className="flex gap-x-2">
        <div>
          <img src={icon} alt={product} className="w-16 h-16 object-cover" />
        </div>
        <div className="space-y-1 flex flex-col font-medium">
          <p className="hover:text-blue-700">{product}</p>
          <p className="text-red-500">{price}</p>
        </div>
      </div>

      <div>
        <span className="cursor-pointer hover:text-red-500" onClick={onClose}>
          <HiOutlineXMark />
        </span>
      </div>
    </div>
  );
};
