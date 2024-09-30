/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AxiosResponse, HttpStatusCode } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  getAllCountryInContinent,
  ICountry,
} from "@/service/apis/countries-services";
import { signupSchema } from "@/data/schemas/users-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IUserSignup, signup } from "@/service/apis/user-services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { EmailStore } from "@/store/user-store";
import { useState } from "react";

const IntegratedSignup = () => {
  const [continent, setContinent] = useState<
    | "ASIA"
    | "EUROPE"
    | "NORTH AMERICA"
    | "SOUTH AMERICA"
    | "AFRICA"
    | "AUSTRALIA/OCEANIA"
  >("EUROPE");

  const {
    data: countries,
    isError: isCountryError,
    error: countryError,
    isLoading: countryLoading,
    isSuccess: countrySuccess,
  } = useQuery({
    queryKey: ["countries-by-continent", continent],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllCountryInContinent(
        continent
      );
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data;
      }
    },
  });
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullname: "",
      address: "",
      email: "",
      password: "",
      phonenumber: "",
      city: "",
      country_id: "",
      confirmPassword: "",
    },
  });

  const [, setEmail] = useRecoilState(EmailStore);
  const navigate = useNavigate();
  const {
    mutate: onSubmit,
    error: mutationError,
    isError: isMutationError,
    isSuccess: mutationSuccess,
  } = useMutation({
    mutationKey: ["countries"],
    mutationFn: async (values: z.infer<typeof signupSchema>) => {
      const {
        address,
        email,
        fullname,
        city,
        password,
        phonenumber,
        country_id,
      } = values;

      const data: IUserSignup = {
        address,
        fullname,
        email,
        password,
        phoneNumber: phonenumber,
        city,
        countryId: country_id,
      };

      const response: AxiosResponse<any, any> = await signup(data);

      if (response.status === HttpStatusCode.Created) {
        return response.data;
      }
    },
    onSuccess: (data) => {
      setEmail({
        email: form.getValues("email"),
        id: data.data.id,
      });
      form.reset();
      setTimeout(() => {
        form.reset();
      }, 2000);
      navigate("/verify-email");
    },
    onError: (e: any) => {
      console.log(e);
      return new Error(e.response?.data?.message || e.message);
    },
  });

  return (
    <div className="w-full space-y-8 mb-10">
      <div className="w-10/12 xl:w-8/12 mx-auto flex flex-col-reverse lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-7 px-7 py-10 bg-white">
        <div className="col-span-2 mt-14 lg:m-0">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-extrabold text-center">
              Create Account
            </p>
            <div className="-mt-2">
              <svg
                className="w-80"
                width="354"
                height="30"
                viewBox="0 0 354 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                  stroke="#FFBB38"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
              </svg>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((e) => onSubmit(e))}
              className="space-y-8 mt-10"
            >
              <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="focus:outline-none"
                            placeholder="Full Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="focus:outline-none"
                            id="email"
                            placeholder="Email Address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="phonenumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="focus:outline-none"
                            id="phonenumber"
                            placeholder="Phone Number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password *</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            className="focus:outline-none"
                            id="password"
                            placeholder="Enter password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password *</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            className="focus:outline-none"
                            id="confirmPassword"
                            placeholder="Confirm password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                {countryLoading && <div>Loading...</div>}
                {isCountryError && (
                  <div>
                    <h1>{countryError.name}</h1>
                    <p>{countryError.message}</p>
                  </div>
                )}
                {countrySuccess && (
                  <div className="w-full">
                    <FormLabel>Continent</FormLabel>
                    <Select
                      onValueChange={(
                        e:
                          | "ASIA"
                          | "EUROPE"
                          | "NORTH AMERICA"
                          | "SOUTH AMERICA"
                          | "AFRICA"
                          | "AUSTRALIA/OCEANIA"
                      ) => {
                        form.setValue("country_id", "");
                        setContinent(e);
                      }}
                      defaultValue={continent}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Continent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="ASIA">ASIA</SelectItem>
                          <SelectItem value="EUROPE">EUROPE</SelectItem>
                          <SelectItem value="NORTH AMERICA">
                            NORTH AMERICA
                          </SelectItem>
                          <SelectItem value="SOUTH AMERICA">
                            SOUTH AMERICA
                          </SelectItem>
                          <SelectItem value="AFRICA">AFRICA</SelectItem>
                          <SelectItem disabled value="AUSTRALIA/OCEANIA">
                            AUSTRALIA/OCEANIA
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {countrySuccess && (
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="country_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
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
                                  countries.map((country: ICountry) => (
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
                )}
              </div>

              <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="address"
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
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="focus:outline-none"
                            placeholder="City"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="termsAndConditions"
                  render={({ field }) => (
                    <FormItem className="flex">
                      <FormControl>
                        <Checkbox
                          className="p-0"
                          id="termsAndConditions"
                          onCheckedChange={field.onChange}
                          checked={field.value}
                        />
                      </FormControl>
                      <FormLabel>Accept terms and conditions</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                <div className="w-full">
                  {isMutationError && (
                    <p className="text-base text-center font-semibold text-red-600">
                      {mutationError.response?.data?.message ||
                        mutationError.message}
                    </p>
                  )}
                  {mutationSuccess && (
                    <p className="text-base text-center font-semibold text-green-600">
                      success
                    </p>
                  )}
                  <Button type="submit" className="w-full h-12">
                    {/* {loading ? (
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    ) :  */}
                    {/* ( */}
                    <span>Create Account</span>
                    {/* )} */}
                  </Button>
                  <p className="text-sm mt-4 font-semibold text-gray-500 text-center">
                    Already have an Account?
                    <Link className="underline" to="/login">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default IntegratedSignup;
