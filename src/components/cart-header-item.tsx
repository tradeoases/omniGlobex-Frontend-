import { HiOutlineXMark } from "react-icons/hi2";
import { ICreateOrder } from "@/service/apis/order-service";


interface Props extends ICreateOrder {
  onClose: () => void;
}

export const CartHeaderItem: React.FC<Props> = ({
  image_url,
  name,
  onClose,
}) => {
  return (
    <div className="w-full flex justify-between py-2">
      <div className="flex gap-x-2">
        <div>
          <img
            src={image_url}
            alt={name}
            className="w-16 h-16 object-cover"
          />
        </div>
        <div className="space-y-1 flex flex-col font-medium">
          <p className="hover:text-blue-700">{name}</p>
          {/* <p className="text-red-500">{price}</p> */}
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
