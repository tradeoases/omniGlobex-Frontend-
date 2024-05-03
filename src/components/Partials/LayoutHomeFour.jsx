import { useState } from "react";
import DiscountBanner from "../HomeFour/DiscountBanner";
import Drawer from "../Mobile/Drawer";
import HeaderFour from "./HeaderFour";
import FooterFour from "./FooterFour";

export default function LayoutHomeFour({ children, childrenClasses, type }) {
  const [drawer, setDrawer] = useState(false);
  return (
    <>
      <Drawer open={drawer} action={() => setDrawer(!drawer)} />
      <div className="w-full overflow-x-hidden">
        <HeaderFour type={4} drawerAction={() => setDrawer(!drawer)} />
        <div className={`w-full  ${childrenClasses || "pt-[30px] pb-[60px]"}`}>
          {children && children}
        </div>
        <DiscountBanner />
        <FooterFour />
      </div>
    </>
  );
}
