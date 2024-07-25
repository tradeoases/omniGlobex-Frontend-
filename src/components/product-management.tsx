import { useState } from "react";

import { TProductNav, productNavs } from "@/data/data";
import { UnderConstruction } from "@/components/under-construction";
import { AddProductModal } from "./add-product-modal";
import { ProductManagementProductTab } from "./product-management-product-tab";

interface ProductProps {}

export const ProductManagement: React.FC<ProductProps> = () => {
  const [activeTab, setActiveTab] = useState<TProductNav>(productNavs[0]);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  return (
    <div className="w-full col-span-3">
      {openCreateModal && (
        <AddProductModal onClose={() => setOpenCreateModal(false)} />
      )}
      <div className="w-full  space-y-6 lg:p-8 rounded-xl  border-black">
        <div className="border-b w-full">
          <div className="w-10/12 xl:w-8/12 mx-auto flex items-center">
            {productNavs.map((nav, i) => (
              <p
                onClick={() => setActiveTab(nav)}
                key={i}
                className={`py-3 text-xs px-2 whitespace-nowrap md:px-7 border-b cursor-pointer ${
                  activeTab === nav ? " border-main " : " border-zinc-100 "
                }`}
              >
                {nav}
              </p>
            ))}
          </div>
        </div>

        {activeTab === "Products" && (
          <ProductManagementProductTab
            onOpen={() => setOpenCreateModal(true)}
          />
        )}
        {activeTab === "Orders" && <UnderConstruction />}
        {activeTab === "Other info" && <UnderConstruction />}
      </div>
    </div>
  );
};
