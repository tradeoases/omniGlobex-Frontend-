import { atom, RecoilState } from "recoil";

export const SidemenuStore: RecoilState<boolean> = atom<boolean>({
  key: "side-menu-store",
  default: false,
});
