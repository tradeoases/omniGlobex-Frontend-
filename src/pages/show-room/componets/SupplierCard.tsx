import { Button } from "@/components/ui/button";
import { getOneCountry } from "@/service/apis/countries-services";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import React from "react";

interface ISupplier {
  business_id: string;
  business_name: string;
  location: { country_id: string; city: string };
  images: { image_id: string; image_for: "LOGO" | "PROFILE" | "COVER" }[];
}

const SupplierCard: React.FC<{ supplier: ISupplier }> = ({ supplier }) => {
  const { data: country, isSuccess: isCountrySuccess } = useQuery({
    queryKey: ["country", supplier.location.country_id],
    queryFn: async () => {
      const res = await getOneCountry(supplier.location.country_id);
      if (
        res.status === HttpStatusCode.Ok ||
        res.status === HttpStatusCode.Created
      ) {
        return res.data.data;
      }
    },
  });

//   const { data: images, isSuccess: isImagesSuccess } = useQuery({
//     queryKey: ["country", supplier.location.country_id],
//     queryFn: async () => {
//       const res = await getOneCountry(supplier.location.country_id);
//       if (
//         res.status === HttpStatusCode.Ok ||
//         res.status === HttpStatusCode.Created
//       ) {
//         return res.data.data;
//       }
//     },
//   });
  return (
    <div className="max-w-sm rounded p-2 my-2 overflow-hidden shadow-lg bg-white">
      {/* Display logo or cover image */}
      {/* {supplier.images.length > 0 && (
        <img
          className="w-full h-48 object-cover"
          src={`https://example.com/images/${supplier.images[0].image_id}`} // Replace with your image URL logic
          alt={supplier.images[0].image_for}
        />
      )} */}

      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{supplier.business_name}</h2>
        <p className="text-gray-700">
          Location: {supplier.location.city}, {isCountrySuccess && country.name}
        </p>
      </div>
      <Button className='mx-4' disabled>Start A conversation</Button>
    </div>
  );
};

export default SupplierCard;
