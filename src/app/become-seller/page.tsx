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

import { PageHeader } from "@/components/PageHeader";
import { FaPen } from "react-icons/fa6";

const Page = () => {
  return (
    <div className="w-full space-y-8 mb-10">
      <PageHeader name="Seller Application" route=" / Become Seller" />

      <div className="w-10/12 xl:w-8/12 mx-auto flex flex-col-reverse lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-7 px-7 py-10 bg-white">
        <div className="col-span-2 mt-14 lg:m-0">
          <p className="text-xl font-extrabold">Seller Information</p>
          <p className="text-sm text-gray-400">
            Fill the form below or write us .We will help you as soon as
            possible.
          </p>

          <div className="space-y-8 mt-10">
            <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
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

            <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
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

            <div className="mt-4">
              <p className="text-xl font-extrabold">Shop Information</p>
              <p className="text-sm text-gray-400">
                Fill the form below or write us .We will help you as soon as
                possible.
              </p>
            </div>

            <div>
              <Label htmlFor="shopname">Shop Name*</Label>
              <Input
                type="text"
                id="shopname"
                className="outline-none"
                placeholder="Shop Name "
              />
            </div>

            <div>
              <Label htmlFor="addressshop">Addess*</Label>
              <Input
                type="text"
                id="addressshop"
                className="outline-none"
                placeholder="Your Address here... "
              />
            </div>

            <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Password*</Label>
                <Input
                  type="password"
                  className="focus:outline-none"
                  id="password"
                  placeholder="Password"
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="reenterpswd">Re-Enter Password*</Label>
                <Input
                  type="password"
                  id="reenterpswd"
                  className="outline-none"
                  placeholder=""
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

            <div className="lg:w-3/5 mx-auto">
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

        <div className="space-y-14">
          <div className="flex flex-col space-y-2 items-center">
            <div className="text-center">
              <p className="text-lg font-extrabold">Update Profile</p>
              <p className="text-gray-400">
                Profile of at least{" "}
                <span className="text-black">Size300x300.</span> <br /> Gifs
                work too. <span className="text-black">Max 5mb</span>.
              </p>
            </div>

            <div className="flex relative items-center justify-center text-lg font-bold w-40 h-40 rounded-full bg-gray-200">
              200X200
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-pink-700 flex items-center justify-center z-20 right-0 bottom-6 text-white text-lg absolute "
              >
                <FaPen />
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2 items-center">
            <div className="text-center">
              <p className="text-lg font-extrabold">Update Logo</p>
              <p className="text-gray-400">
                Profile of at least{" "}
                <span className="text-black">Size300x300.</span>
                <br /> Gifs work too.{" "}
                <span className="text-black">Max 5mb</span>.
              </p>
            </div>

            <div className="flex relative items-center justify-center text-lg font-bold w-40 h-40 rounded-full bg-gray-200">
              200X200
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-pink-700 flex items-center justify-center z-20 right-0 bottom-6 text-white text-lg absolute "
              >
                <FaPen />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <p className="text-lg font-extrabold">Update Cover</p>
            <p className="text-gray-400">
              Cover of at least Size{" "}
              <span className="text-black">1170x920.</span>
            </p>

            <div className="flex relative items-center justify-center text-lg font-bold w-full h-40 rounded-lg bg-gray-200">
              200X200
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-pink-700 flex items-center justify-center z-20 right-0 -bottom-4 text-white text-lg absolute "
              >
                <FaPen />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
