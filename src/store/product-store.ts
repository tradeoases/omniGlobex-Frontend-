import { IProduct } from "@/service/apis/product-services";
import { RecoilState, atom } from "recoil";

export const ProductStore: RecoilState<IProduct[] | null> = atom<
  IProduct[] | null
>({
  key: "product-store",
  default: null,
});

export const SingleProductStore: RecoilState<IProduct | null> =
  atom<IProduct | null>({
    key: "single-product-store",
    default: null,
  });
