import { RecoilState, atom } from "recoil";

export const SidemenuStore: RecoilState<boolean> = atom<boolean>({
  key: "sidue-menu-store",
  default: false,
});
