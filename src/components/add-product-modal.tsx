/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoilState } from "recoil";
import { AxiosResponse, HttpStatusCode } from "axios";

import { createProductSchema } from "@/data/schemas/product-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  createProduct,
  getAllProductCategories,
  IProductCategory,
} from "@/service/apis/product-services";
import { CategoryStore } from "@/store/product-store";
import { FileDisplayItem } from "./file-display-item";
import { Label } from "./ui/label";
import MultiSelect, { Option } from "./multiple-select";
import { getAllCountries, ICountry } from "@/service/apis/countries-services";
import { AllCountriesStore } from "@/store/country-store";
import { HiArrowUpTray, HiOutlineXMark } from "react-icons/hi2";
import { ICreateProduct } from "@/data/product-data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

interface Props {
  onClose: () => void;
}

export const AddProductModal: React.FC<Props> = ({ onClose }) => {
  const [showRooms, setShowRooms] = useState<Option[]>([]);
  const [categories, setCategories] = useRecoilState<IProductCategory[] | null>(
    CategoryStore
  );
  const [countries, setCountries] = useRecoilState<ICountry[] | null>(
    AllCountriesStore
  );
  const [fileProgress, setFileProgress] = useState<{ [key: string]: number }>(
    {}
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    !categories && fetchCategories();
    !countries && fetchAllCountries();
  }, []);

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      category_id: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createProductSchema>) => {
    try {
      if (showRooms.length === 0) {
        return;
      }

      const data: ICreateProduct = {
        ...values,
        showRooms: showRooms.map((item) => item.value),
        image_url:
          "https://ik.imagekit.io/2ujnunod7moo/produits/9_4QQrWWsK_.webp?updatedAt=1704398952106be60d630-9591-4f19-be4d-e7bf2834da01/200/300",
      };

      const response: AxiosResponse<any, any> = await createProduct(data);
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response: AxiosResponse<any, any> = await getAllProductCategories();

      if (response.status === HttpStatusCode.Ok) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCountries = async () => {
    try {
      const response: AxiosResponse<any, any> = await getAllCountries();
      if (response.status === HttpStatusCode.Ok) {
        setCountries(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    newFiles.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      const interval = setInterval(() => {
        setFileProgress((prevProgress) => {
          const newProgress = prevProgress[file.name]
            ? prevProgress[file.name] + 10
            : 10;
          if (newProgress >= 100) clearInterval(interval);
          return { ...prevProgress, [file.name]: newProgress };
        });
      }, 100);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    newFiles.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      const interval = setInterval(() => {
        setFileProgress((prevProgress) => {
          const newProgress = prevProgress[file.name]
            ? prevProgress[file.name] + 10
            : 10;
          if (newProgress >= 100) clearInterval(interval);
          return { ...prevProgress, [file.name]: newProgress };
        });
      }, 100);
    });
  };

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    setFileProgress((prevProgress) => {
      const { [fileName]: _, ...rest } = prevProgress;
      return rest;
    });
  };

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-10 h-full bg-black/45 p-8">
      <div className="bg-white relative w-full lg:w-4/5 xl:w-2/5 mx-auto h-full rounded-xl p-4 py-8 md:p-8 ">
        <div className="flex justify-end">
          <span
            onClick={onClose}
            className="cursor-pointer hover:text-red-700 transition ease-in-out duration-200 text-lg"
          >
            <HiOutlineXMark />
          </span>
        </div>

        <p className="text-lg font-semibold">New Product</p>
        <div className="scrollbar pl-1 pr-3 md:px-3 overflow-y-scroll h-[73vh] w-full">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-8 mt-16"
              >
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
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
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="category_id"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {categories &&
                                  categories.map((category) => (
                                    <SelectItem
                                      key={category.category_id}
                                      value={category.category_id}
                                    >
                                      {category.name}
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
                    <MultiSelect
                      options={
                        countries?.map((country) => ({
                          value: country.country_id,
                          label: country.name,
                        })) || []
                      }
                      selectedOptions={showRooms}
                      onChange={setShowRooms}
                    />
                  </div>
                </div>

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

                  <div className=" grid-cols-1 md:grid-cols-3 grid gap-4 ">
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Currency " />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="UGX">
                                    Ugandan shiling
                                  </SelectItem>
                                  <SelectItem value="USD">
                                    USA Dollar
                                  </SelectItem>
                                  <SelectItem value="KSH">
                                    Kenyan shiling
                                  </SelectItem>
                                  <SelectItem value="TSH">
                                    Tanzanian shiling
                                  </SelectItem>
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
                        name="previous_price"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input
                                type="text"
                                className="focus-visible:outline-none focus-visible:ring-offset-0"
                                placeholder="Previous Price"
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
                        name="price"
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
                </div>
                <div className="">
                  <div>
                    <p className="text-base font-medium">
                      Attached files to the products
                    </p>

                    <Label className="text-blue-500">
                      Upload product images
                    </Label>

                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="cursor-pointer rounded-xl border border-dashed border-gray-300 p-6 text-center md:border-2"
                    >
                      <input
                        type="file"
                        id="file"
                        multiple
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
                      <span className="mb-4 flex w-full items-center justify-center">
                        <HiArrowUpTray className="text-xl" />
                      </span>
                      <div>
                        <span
                          className="text-sx cursor-pointer text-blue-600 underline md:text-sm"
                          onClick={handleBoxClick}
                        >
                          Chose a file
                        </span>{" "}
                        to Upload
                      </div>
                    </div>
                    <div className="flex text-xs items-center justify-between">
                      <span>Supported formats: JPG, PNG</span>
                      <span>Max File size 10MB</span>
                    </div>

                    <div className="mt-4 space-y-2">
                      {files.map((file) => (
                        <FileDisplayItem
                          key={file.name}
                          removeFile={removeFile}
                          fileProgress={fileProgress}
                          file={file}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <Button type="submit" className="">
                  Create
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 py-4 w-full border-t px-8"></div>
      </div>
    </div>
  );
};
