/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse, HttpStatusCode } from "axios";
import { createProductSchema } from "@/data/schemas/product-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  createProduct,
  getAllProductCategories,
  getOneProduct,
} from "@/service/apis/product-services";
import { getAllCountries, ICountry } from "@/service/apis/countries-services";
// import { HiOutlineXMark } from "react-icons/hi2";
import { ICreateProduct } from "@/data/product-data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SingleImageUpload from "@/components/ui/SingleImageUploadArea";
import { uploadImages } from "@/service/apis/image-service";
import { useSearchParams } from "react-router-dom";
import MultipleImageUpload from "@/components/ui/MultipleImageUploadArea";

const ProductEntry = () => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const [images, setImages] = useState<{ [k: string]: string }>({});

  const { data: product, isSuccess: isProductSuccess } = useQuery({
    queryKey: ["product", editId],
    queryFn: async () => {
      const res = await getOneProduct(editId || "");
      if (
        res.status === HttpStatusCode.Ok ||
        res.status === HttpStatusCode.Created
      ) {
        return res.data.data;
      }
    },
    enabled: !!editId,
  });

  const [showRooms, setShowRooms] = useState<
    {
      countryId: string;
      country: string;
      selected: boolean;
    }[]
  >([]);

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      productPrice: "",
      priceCurrency: "",
    },
  });

  useEffect(() => {
    if (isProductSuccess) {
      form.setValue("name", product.name);
      form.setValue("categoryId", product?.category_id);
      form.setValue("deliveryTerms", product.delivery_terms);
      form.setValue("description", product.description);
      form.setValue("priceCurrency", product.price_currency);
      form.setValue("productPrice", product.product_price);
    }
  }, [isProductSuccess, product, form]);
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (values: z.infer<typeof createProductSchema>) => {
    try {
      const data: ICreateProduct = {
        ...values,
        showRooms: showRooms
          .filter((i) => i.selected)
          .map((item) => item.countryId),
      };
      if (image) {
        const imageResponse: AxiosResponse<any, any> = await uploadImages({
          images: [image],
        });

        if (
          imageResponse.status === HttpStatusCode.Ok ||
          imageResponse.status === HttpStatusCode.Created
        ) {
          data.coverImage = imageResponse.data.data[0].image_id;
        }
      }
      const response: AxiosResponse<any, any> = await createProduct(data);
      if (response.status === HttpStatusCode.Ok) {
        form.reset();
        setSuccessMessage("Product added successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    isLoading: categoryLoading,
    isError: categoryIsError,
    error: categoryError,
    data: categories,
    isSuccess: categorySuccess,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllProductCategories();

      if (response.status === HttpStatusCode.Ok) {
        return response.data.data;
      }
    },
  });
  const [image, setImage] = useState<string | null>(null);

  const {
    isLoading: countryLoading,
    data: countries,
    isError: countryIsError,
    error: countryError,
    isSuccess: countryIsSuccess,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllCountries();
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data?.map((country: ICountry) => ({
          countryId: country.country_id,
          country: country.name,
          selected: false,
          currency: country.currency_name,
        }));
      }
    },
  });

  useEffect(() => {
    if (countryIsSuccess) {
      setShowRooms(countries);
    }
  }, [countryIsSuccess, countries]);

  return (
    <div>
      {successMessage && (
        <div className="mt-4 text-green-500">{successMessage}</div>
      )}
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8 mt-16"
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Product Name *</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus-visible:outline-none focus-visible:ring-offset-0"
                        placeholder="Product Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                    control={form.control}
                    name="brandId"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          disabled
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a brand for the product" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {countries &&
                                countries.map(
                                  (country: {
                                    countryId: string;
                                    currency: string;
                                  }) => (
                                    <SelectItem
                                      key={country.countryId}
                                      value={country.countryId}
                                    >
                                      {country.currency}
                                    </SelectItem>
                                  )
                                )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {categoryIsError && (
                <div>
                  Faild to load categories
                  <div>{categoryError.message}</div>
                </div>
              )}
              {categoryLoading && <div>Loading categories...</div>}
              {categorySuccess && (
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => {
                      console.log({ field });
                      return (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={product?.category_id || field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {categories &&
                                  categories.map(
                                    (category: {
                                      category_id: string;
                                      name: string;
                                    }) => (
                                      <SelectItem
                                        key={category.category_id}
                                        value={category.category_id}
                                      >
                                        {category.name}
                                      </SelectItem>
                                    )
                                  )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              )}

              {countryIsError && (
                <div>
                  An error occured while loading showrooms
                  <div>{countryError.message}</div>
                </div>
              )}
              {countryLoading && <div>Loading showrooms...</div>}
              <Popover>
                <PopoverTrigger>
                  <div className="cursor-pointer border py-2 rounded text-gray-600 text-sm">
                    Select Showrooms
                  </div>
                </PopoverTrigger>
                <PopoverContent className="max-h-60 cursor-pointer w-64 overflow-y-auto bg-white shadow-lg rounded-md p-4 border border-gray-200">
                  {showRooms.map((room, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2"
                    >
                      <span>{room.country}</span>
                      <input
                        type="checkbox"
                        checked={room.selected}
                        onChange={() =>
                          setShowRooms((prev) =>
                            prev.map((r, i) =>
                              i === index ? { ...r, selected: !r.selected } : r
                            )
                          )
                        }
                      />
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
            <SingleImageUpload
              image={image}
              setImage={(image: string | null): void => setImage(image)}
            />

            <div className="">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the product details"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full space-y-4 ">
              <p className="text-base font-bold">Price</p>

              <div className=" grid-cols-1 md:grid-cols-2 grid gap-4 ">
                <FormField
                  control={form.control}
                  name="priceCurrency"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {countries &&
                              countries.map(
                                (country: {
                                  countryId: string;
                                  currency: string;
                                }) => (
                                  <SelectItem
                                    key={country.countryId}
                                    value={country.countryId}
                                  >
                                    {country.currency}
                                  </SelectItem>
                                )
                              )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="productPrice"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type="text"
                            className="focus:outline-none"
                            placeholder="Current Price"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="deliveryTerms"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Textarea
                          placeholder="Enter the Payment & Delivery Terms"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <MultipleImageUpload images={images} setImages={setImages} />

            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductEntry;
