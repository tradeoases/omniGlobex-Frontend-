/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/data/schemas/users-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { AxiosResponse, HttpStatusCode, isAxiosError } from "axios";
import { userLogin } from "@/service/apis/user-services";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import { EmailStore, IUser, userStore } from "@/store/user-store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useRecoilState<IUser | null>(userStore);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const setEmailData: SetterOrUpdater<string | null> =
    useSetRecoilState(EmailStore);
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutKey: NodeJS.Timeout | undefined;

    if (errorMessage) {
      timeoutKey = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }

    if (userData) {
      timeoutKey = setTimeout(() => {
        navigate(`/profile`);
      }, 3000);
    }

    return () => clearTimeout(timeoutKey);
  }, [errorMessage]);

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
        setUserData(response.data.data.data);
        localStorage.setItem("token", token);
        setLoading(false);
        navigate(`/profile`);
        setSuccessMessage(true);

        timeoutKey = setTimeout(() => {
          setSuccessMessage(false);
        }, 2000);

        return () => clearTimeout(timeoutKey);
      }
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error)) {
        setEmailData(values.email);
        setErrorMessage(error.response?.data.message);
      }
    }
  };

  return (
    <main className="w-10/12 xl:w-8/12 mx-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-x-8">
      <div className="py-20 px-8 border bg-white">
        <div className="flex px-8 flex-col items-center">
          <p className="text-4xl font-extrabold text-center">Log In</p>
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

        {userData && (
          <p className="text-main font-light text-md text-center">
            already login
          </p>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8 mt-16"
          >
            <div className="">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:outline-none"
                        placeholder="Email Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="focus:outline-none w-full"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Link to="#" className="text-main font-bold text-sm">
                Forgot Password
              </Link>
            </div>

            {errorMessage && (
              <p className="text-base text-center font-light text-red-600">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className="text-base text-center font-light text-green-600">
                success
              </p>
            )}
            <Button type="submit" className="w-full h-12">
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <span>Login</span>
              )}
            </Button>
            <div>
              <Button disabled className="w-full h-12" variant={"outline"}>
                <FcGoogle className="mr-2 h-4 w-4 text-xl" /> Sign In with
                Google
              </Button>

              <p className="text-sm mt-4 font-semibold text-gray-500 text-center">
                Don&apos;t have an Account?{" "}
                <Link className="underline" to="/signup">
                  sign up free
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>

      <div className="hidden lg:block w-full h-auto bg-white"></div>
    </main>
  );
};

export default LoginPage;
