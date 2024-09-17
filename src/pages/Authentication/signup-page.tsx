/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import { EmailStore, IRole, RoleStore } from "@/store/user-store";
import { getAllCountries, ICountry } from "@/service/apis/countries-services";
import { AllCountriesStore } from "@/store/country-store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signupSchema } from "@/data/schemas/users-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AxiosResponse, HttpStatusCode, isAxiosError } from "axios";
import { getAllRoles, IUserSignup, signup } from "@/service/apis/user-services";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SignupPage = () => {
  const [roles, setRoles] = useRecoilState<IRole[] | null>(RoleStore);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [countries, setCountries] = useRecoilState<ICountry[] | null>(
    AllCountriesStore
  );
  const setEmailData: SetterOrUpdater<string | null> =
    useSetRecoilState(EmailStore);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstname: "",
      email: "",
      lastname: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    if (!roles) {
      setErrorMessage("an error occurs");
      return;
    }

    const data: IUserSignup = {
      fullname: `${values.firstname} ${values.lastname}`,
      email: values.email,
      password: values.password,
      country_id: values.country_id,
      roleIds: roles
        .filter((role) => role.name === "buyer")
        .map((role) => role.role_id),
    };

    let timeoutKey: NodeJS.Timeout | undefined;

    try {
      setLoading(true);
      const response: AxiosResponse<any, any> = await signup(data);

      if (response.status === HttpStatusCode.Created) {
        setEmailData(values.email);
        form.reset();
        setLoading(false);
        setSuccessMessage(true);

        timeoutKey = setTimeout(() => {
          setSuccessMessage(false);
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
      console.log(error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response: AxiosResponse<any, any> = await getAllRoles();

      if (response.status === HttpStatusCode.Ok) {
        setRoles(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !countries && fetchAllCountries();
    !roles && fetchRoles();
  }, []);

  return (
    <main className="w-10/12 xl:w-8/12 mx-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-x-0 lg:gap-x-8">
      <div className="py-12 px-8 border bg-white">
        <div className="flex flex-col items-center">
          <p className="text-4xl font-extrabold text-center">Create Account</p>
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
            <div className="w-full space-y-8 lg:space-y-0 md:flex items-center justify-between gap-2">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="focus:outline-none"
                          placeholder="First Name"
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
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full focus:outline-none"
                          placeholder="Last Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="w-full items-center">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:outline-none w-full"
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

            <div className="w-full space-y-8 lg:space-y-0 md:flex items-center justify-between gap-2">
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
                          placeholder="Password"
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
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="focus:outline-none"
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Accept terms and conditions</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <div className="space-y-4">
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
              <Button className="w-full h-12">
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <span>Create Account</span>
                )}
              </Button>
              <p className="text-sm font-semibold text-gray-500 text-center">
                Already have an Account?{" "}
                <Link className="underline" to="/login">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>

      <div className="hidden lg:block  w-full h-auto bg-white"></div>
    </main>
  );
};

export default SignupPage;
