import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
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

        <div className="space-y-8 mt-10">
          <div className="w-full space-y-8 lg:space-y-0 md:flex items-center justify-between gap-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="firstname">First Name *</Label>
              <Input
                type="text"
                className="focus:outline-none"
                id="firstname"
                placeholder="First Name"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="lastname">Last Name *</Label>
              <Input
                type="text"
                id="lastname"
                className="outline-none"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="w-full space-y-8 lg:space-y-0 md:flex items-center justify-between gap-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="Email">Town / City *</Label>
              <Input
                type="Email"
                className="focus:outline-none"
                id="Email"
                placeholder="Email"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                type="text"
                id="phone"
                className="outline-none"
                placeholder="Phone  "
              />
            </div>
          </div>

          <div className="w-full">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Uganda</SelectLabel>
                  <SelectItem value="apple">Kenya</SelectItem>
                  <SelectItem value="banana">Rwanda</SelectItem>
                  <SelectItem value="blueberry">Sudan</SelectItem>
                  <SelectItem value="grapes">Burundi</SelectItem>
                  <SelectItem value="pineapple">Tanzania</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="address">Address *</Label>
            <Input
              type="text"
              id="address"
              className="outline-none"
              placeholder="Address  "
            />
          </div>

          <div className="w-full space-y-8 lg:space-y-0 md:flex items-center justify-between gap-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="city">City *</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kampala</SelectLabel>
                    <SelectItem value="apple">Mbarara</SelectItem>
                    <SelectItem value="banana">Jinja</SelectItem>
                    <SelectItem value="blueberry">Masaka</SelectItem>
                    <SelectItem value="grapes">Entebbe</SelectItem>
                    <SelectItem value="pineapple">Kira</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="zip">Postcode / ZIP*</Label>
              <Input
                type="text"
                id="zip"
                className="outline-none"
                placeholder="00000  "
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

          <div>
            <Button className="w-full">Create Account</Button>
            <p className="text-sm mt-4 font-semibold text-gray-500 text-center">
              Already have an Account?{" "}
              <Link className="underline" href="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block  w-full h-auto bg-white"></div>
    </main>
  );
};

export default Page;
