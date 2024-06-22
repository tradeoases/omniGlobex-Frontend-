
import { SectionHeader } from "./GameWorldSection";

const ShopBrandSection = () => {
  return (
    <div className="w-full space-y-3">
      <SectionHeader name="Shop by Brand" />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 child">
        {Array.from({ length: 12 }).map((_, i) => (
          <Brand key={i} />
        ))}
      </div>
    </div>
  );
};

export default ShopBrandSection;

const Brand = () => {
  return (
    <div className="w-full  border-[0.1px] border-light py-8 bg-white flex items-center justify-center">
      <p className="text-lg font-bold text-gray-400">brand Logo</p>
    </div>
  );
};
