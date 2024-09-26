/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AxiosResponse, HttpStatusCode } from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoilState } from "recoil";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getAllCountries, ICountry } from "@/service/apis/countries-services";
import { AllCountriesStore } from "@/store/country-store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createBusiness } from "@/service/apis/business-services";
import { useNavigate } from "react-router-dom";

// Define the schema for validation using Zod
const createBusinessSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  countryId: z.string().min(1, "Country is required"),
  location: z.string().min(1, "Address is required"),
  city: z.string().min(1, "Address is required"),
  businessDescription: z
    .string()
    .min(80, "Description is required and must be atleast 80 characters long"),
});

type CreateBusinessForm = z.infer<typeof createBusinessSchema>;

const CreateBusiness = () => {
  const [countries, setCountries] = useRecoilState<ICountry[] | null>(
    AllCountriesStore
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage] = useState<boolean>(false);
  const navigate = useNavigate();
  const form = useForm<CreateBusinessForm>({
    resolver: zodResolver(createBusinessSchema),
    defaultValues: {
      businessName: "",
      countryId: "",
      city: "",
      location: "",
      businessDescription: "",
    },
  });

  const onSubmit = async (values: CreateBusinessForm) => {
    try {
      setLoading(true);
      console.log("Form Values: ", values);

      const response: AxiosResponse<any, any> = await createBusiness(values);
     
      if (response.status === HttpStatusCode.Created) {
        form.reset();
        navigate("/profile");
      }

      console.log(response)

      setLoading(false);
    } catch (error) {

      setLoading(false);
      console.log(error)
      setErrorMessage("Failed to create business");
    }
  };

  useEffect(() => {
    !countries && fetchAllCountries();
  }, []);

  const fetchAllCountries = async () => {
    try {
      const response: AxiosResponse<any, any> = await getAllCountries();
      if (response.status === HttpStatusCode.Ok) {
        setCountries(response.data.data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8 mb-10">
      <div className="w-10/12 xl:w-8/12 mx-auto flex flex-col items-center px-7 py-10 bg-white">
        <p className="text-4xl font-extrabold text-center">Create Business</p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-10 w-full"
          >
            <div className="w-full">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name *</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:outline-none"
                        placeholder="Business Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full">
              <FormField
                control={form.control}
                name="countryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {countries &&
                            countries.map((country) => (
                              <SelectItem
                                key={country.country_id}
                                value={country.country_id}
                              >
                                {country.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City *</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:outline-none"
                        placeholder="Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address *</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:outline-none"
                        placeholder="Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full">
              <FormField
                control={form.control}
                name="businessDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <textarea
                        className="focus:outline-none w-full h-24 p-2 border border-gray-300 rounded-md"
                        placeholder="Business Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {errorMessage && (
              <p className="text-base text-center font-semibold text-red-600">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className="text-base text-center font-semibold text-green-600">
                Business created successfully!
              </p>
            )}
            <Button disabled={loading} type="submit" className="w-full h-12">
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <span>Create Business</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateBusiness;
