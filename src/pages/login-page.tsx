import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
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

        <div className="space-y-8 mt-16">
          <div>
            <Label htmlFor="address">Address *</Label>
            <Input
              type="text"
              id="address"
              className="outline-none"
              placeholder="Address  "
            />
          </div>

          <div>
            <Label htmlFor="password">Password *</Label>
            <Input
              type="password"
              id="password"
              className="outline-none"
              placeholder="Password"
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

          <Button className="w-full">Log In</Button>
          <div>
            <Button className="w-full" variant={"outline"}>
              <FcGoogle className="mr-2 h-4 w-4 text-xl" /> Sign In with Google
            </Button>

            <p className="text-sm mt-4 font-semibold text-gray-500 text-center">
              Don&apos;t have an Account?{" "}
              <Link className="underline" to="/signup">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-full h-auto bg-white"></div>
    </main>
  );
};

export default LoginPage;
