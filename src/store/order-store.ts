import {ICreateOrder} from "@/service/apis/order-service";
import { RecoilState, atom } from "recoil";

export const OrdersInCartStore: RecoilState<ICreateOrder[]> = atom<
  ICreateOrder[] 
>({
  key: "orders-in-cart-store",
  default: [],
});