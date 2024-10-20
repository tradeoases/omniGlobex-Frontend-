import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/data/schemas/users-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse, HttpStatusCode, isAxiosError } from "axios";
import { userLogin } from "@/service/apis/user-services";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import { EmailStore, IUser, userStore } from "@/store/user-store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VERIFICATION_EMAIL_MSG } from "@/utils/constants/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoginDashboard from "./LoginDashboard";

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useRecoilState<IUser | null>(userStore);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const setEmailData: SetterOrUpdater<{
    email: string | null;
    id: string | null;
  }> = useSetRecoilState(EmailStore);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  useEffect(() => {
    let timeoutKey: NodeJS.Timeout | undefined;

    if (errorMessage) {
      timeoutKey = setTimeout(() => {
        if (errorMessage === VERIFICATION_EMAIL_MSG) {
          navigate("/verify-email");
        }
        setErrorMessage(null);
      }, 3000);
    }

    if (userData) {
      if (userData.roles.includes("Supplier")) {
        navigate(from || "/supplier-dashboard");
      } else {
        navigate(from || "/buyer-dashboard");
      }
    }

    return () => clearTimeout(timeoutKey);
  }, [errorMessage, userData, from, navigate]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    let timeoutKey: NodeJS.Timeout | undefined;
    try {
      setLoading(true);
      const response: AxiosResponse<any, any> = await userLogin(values);

      if (response.status === HttpStatusCode.Ok) {
        form.reset();
        const token: string = response.data.data.token;
        const userData: any = response.data.data.data;

        setUserData(userData);
        localStorage.setItem("token", token);
        localStorage.setItem("profile", JSON.stringify(userData));
        setLoading(false);
        setSuccessMessage(true);

        if (userData.roles.includes("Supplier")) {
          navigate(from || "supplier-dashboard");
        } else {
          navigate(from || "buyer-dashboard");
        }

        timeoutKey = setTimeout(() => {
          setSuccessMessage(false);
        }, 2000);

        return () => clearTimeout(timeoutKey);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setEmailData({
          email: values.email,
          id: error.response?.data?.data?.id,
        });
        setErrorMessage(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      {/* Horizontal Navigation Bar */}
      <LoginDashboard />

      <div className="flex flex-col lg:flex-row flex-grow">
        {/* Right Section - Form Fields */}
        <div className="w-full lg:w-1/2 order-1 lg:order-1 bg-white p-6 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <div className="flex px-4 sm:px-8 flex-col items-center">
              <p className="text-2xl font-bold text-center">Sign In</p>
              <div className="-mt-2">
                <svg
                  className="w-60 sm:w-80"
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
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="focus:outline-none w-full sm:w-96"
                          placeholder="Email Address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password *</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="focus:outline-none w-full sm:w-96"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-main text-sm">
                    Forgot Password?
                  </Link>
                </div>

                {errorMessage && (
                  <p className="text-center text-red-600">{errorMessage}</p>
                )}
                {successMessage && (
                  <p className="text-center text-green-600">Success!</p>
                )}

                <Button type="submit" className="w-full">
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    "Login"
                  )}
                </Button>

                <div className="text-center mt-4">
                  <Button
                    disabled
                    variant="outline"
                    className="w-full flex items-center justify-center"
                  >
                    <FcGoogle className="mr-2" /> Sign In with Google
                  </Button>
                  <p className="mt-4 text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="underline text-gray-600">
                      Sign up free
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* Left Section - Additional Information */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1 bg-gray-200 p-6 lg:p-12 flex flex-col justify-center text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-base lg:text-lg mb-6">
            If you don't have an account, please register to gain access to our
            services. Fill in your personal information, and we'll get you set
            up in no time.
          </p>
          <ul className="list-disc list-inside mb-8">
            <li>Access exclusive content</li>
            <li>Join the supplier or buyer network</li>
            <li>Track orders and manage transactions</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
