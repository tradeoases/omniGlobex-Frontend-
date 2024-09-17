/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosResponse, HttpStatusCode, isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ICountry, getAllCountries } from "@/service/apis/countries-services";
import { AllCountriesStore } from "@/store/country-store";
import { signupSchema } from "@/data/schemas/users-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ISellerSignup,
  IUserSignup,
  signup,
} from "@/service/apis/user-services";

const IntegratedSignup = () => {
  const [countries, setCountries] = useRecoilState<ICountry[] | null>(
    AllCountriesStore
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

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

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    let timeoutKey: NodeJS.Timeout | undefined;
    try {
      setLoading(true);

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
        phonenumber,
        city,
        country_id,
      };
      console.log({ data });

      const response: AxiosResponse<any, any> = await signup(data);
      console.log("full response", response);

      if (response.status === HttpStatusCode.Created) {
        console.log({ response });
        form.reset();
        setLoading(false);
        setSuccessMessage(true);

        timeoutKey = setTimeout(() => {
          setSuccessMessage(false);
          form.reset();
        }, 2000);

        return () => clearTimeout(timeoutKey);
      }
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    !countries && fetchAllCountries();
  }, []);

  useEffect(() => {
    let timeoutKey: NodeJS.Timeout | undefined;

    if (errorMessage) {
      timeoutKey = setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }

    return () => clearTimeout(timeoutKey);
  }, [errorMessage]);

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
              onSubmit={form.handleSubmit(onSubmit)}
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
                            type="text"
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
                            type="text"
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
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>

              <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                <div className="w-full">
                  {errorMessage && (
                    <p className="text-base text-center font-semibold text-red-600">
                      {errorMessage}
                    </p>
                  )}
                  {successMessage && (
                    <p className="text-base text-center font-semibold text-green-600">
                      success
                    </p>
                  )}
                  <Button
                    disabled={loading}
                    type="submit"
                    className="w-full h-12"
                  >
                    {loading ? (
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    ) : (
                      <span>Create Account</span>
                    )}
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
