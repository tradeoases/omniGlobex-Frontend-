import { atom, RecoilState } from "recoil";

export const NotFoundStore: RecoilState<boolean> = atom<boolean>({
  key: "not-found-store",
  default: false,
});
