/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProductNav, productNavs } from "@/data/data";
import {
  createProduct,
  getAllProductByUser,
  getAllProductCategories,
  IProduct,
  IProductCategory,
} from "@/service/apis/product-services";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { createProductSchema } from "@/data/schemas/product-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useRecoilState } from "recoil";
import { CategoryStore, ProductByUserStore } from "@/store/product-store";
import { AxiosResponse, HttpStatusCode } from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import MultiSelect, { Option } from "./multiple-select";
import { getAllCountries, ICountry } from "@/service/apis/countries-services";
import { AllCountriesStore } from "@/store/country-store";
import { HiArrowUpTray, HiOutlineXMark } from "react-icons/hi2";
import { ICreateProduct } from "@/data/product-data";
import { ProductCard } from "./product-card";
import { UnderConstruction } from "@/components/under-construction";
import { FileDisplayItem } from "./file-display-item";
import { Label } from "./ui/label";

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
          <ProductTab onOpen={() => setOpenCreateModal(true)} />
        )}
        {activeTab === "Orders" && <UnderConstruction />}
        {activeTab === "Other info" && <UnderConstruction />}
      </div>
    </div>
  );
};

interface IProductTabProps {
  onOpen: () => void;
}

const ProductTab: React.FC<IProductTabProps> = ({ onOpen }) => {
  const [products, setProducts] = useRecoilState<IProduct[] | null>(
    ProductByUserStore
  );

  const fetchProducts = async () => {
    try {
      const response: AxiosResponse<any, any> = await getAllProductByUser();

      if (response.status === HttpStatusCode.Ok) {
        console.log({ response });
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !products && fetchProducts();
  }, []);

  return (
    <div className="space-y-10 w-full">
      <div className="w-full">
        <Button onClick={onOpen} className="text-xs" size={"sm"}>
          New Product
        </Button>
      </div>

      <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {products ? (
          products
            .slice(0, 8)
            .map((product, i) => <ProductCard key={i} {...product} />)
        ) : (
          <div>no product</div>
        )}
      </div>
    </div>
  );
};

interface IModalProps {
  onClose: () => void;
}

const AddProductModal: React.FC<IModalProps> = ({ onClose }) => {
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
      <div className="bg-white relative w-full lg:w-2/5 mx-auto h-full rounded-xl p-8 ">
        <div className="flex mb-6 justify-end">
          <span
            onClick={onClose}
            className="cursor-pointer hover:text-red-700 transition ease-in-out duration-200 text-lg"
          >
            <HiOutlineXMark />
          </span>
        </div>

        <div className="scrollbar px-3 overflow-y-scroll h-[70vh] w-full">
          <div>
            <p className="text-lg font-semibold">New Product</p>
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
                            className="focus:outline-none"
                            placeholder="Product Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8">
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

        <div className="absolute bottom-0 left-0 right-0 py-4 w-full border-t px-8">
          Footer
        </div>
      </div>
    </div>
  );
};
