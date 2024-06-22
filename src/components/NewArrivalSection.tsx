import { ProductCard, SectionHeader } from "./GameWorldSection";

const NewArrivalSection = () => {
  return (
    <div className="w-full space-y-3">
      <SectionHeader name="New Arrivals" view={true} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivalSection;
