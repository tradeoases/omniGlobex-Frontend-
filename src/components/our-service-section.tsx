import { ourServices } from "@/data/data";
import { OurServiceItem } from "./our-service-item";

export const OurServiceSection = () => {
  return (
    <div className="w-full bg-white space-y-10 lg:space-y-0 lg:flex items-center justify-between p-6 xl:p-12">
      {ourServices.map((service, i) => (
        <OurServiceItem key={i} {...service} />
      ))}
    </div>
  );
};
