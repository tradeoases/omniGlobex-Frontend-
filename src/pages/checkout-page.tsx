import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CheckoutSchema,
  PaymentMethodSchema,
  TCheckoutSchema,
  TPaymentMethodSchema,
} from "@/data/schemas/checkout-form-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { Check, ChevronsUpDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/PageHeader";

const countries = [
  {
    label: "Uganda",
    value: "Uganda",
  },
  {
    label: "Malawi",
    value: "Malawi",
  },
  {
    label: "Kenya",
    value: "Kenya",
  },
  {
    label: "Tanzania",
    value: "Tanzania",
  },
] as const;

const cities = [
  {
    value: "Masaka",
    label: "Masaka",
  },
  {
    value: "Kampala",
    label: "Kampala",
  },
  {
    value: "Mbarara",
    label: "Mbarara",
  },
  {
    value: "Wakiso",
    label: "Wakiso",
  },
  {
    value: "Gulu",
    label: "Gulu",
  },
];

const CheckoutPage = () => {
  const form = useForm<TCheckoutSchema>({
    resolver: zodResolver(CheckoutSchema),
  });

  const paymentMethodForm = useForm<TPaymentMethodSchema>({
    resolver: zodResolver(PaymentMethodSchema),
  });

  function onSubmit(values: TCheckoutSchema | TPaymentMethodSchema) {
    console.log(values);
  }

  return (
    <div className="w-full  pt-0 pb-0">
      <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
        <div className="w-full mb-5">
          <PageHeader name="checkout" route="/checkout" />
          <div className="w-10/12 xl:w-8/12 mx-auto mt-5">
            <div className="checkout-main-content w-full">
              <div className="container-x mx-auto">
                <div className="w-full sm:mb-10 mb-5 mx-auto">
                  <div className="sm:flex sm:space-x-[18px] s">
                    <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                        <span className="text-[15px] font-medium">
                          Log into your Account
                        </span>
                      </div>
                    </div>

                    <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                        <span className="text-[15px] font-medium">
                          Enter Coupon Code
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:flex lg:space-x-[30px]">
                  <div className="lg:w-1/2 w-full">
                    <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                      Billing Details
                    </h1>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="sm:flex sm:space-x-5 items-center mb-6">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem className="sm:w-1/2 mb-5 sm:mb-0">
                                <FormLabel className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                                  First Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="First Name"
                                    className="w-full"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem className="sm:w-1/2 mb-5 sm:mb-0">
                                <FormLabel className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                                  Last Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Last Name"
                                    className="w-full"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="sm:flex sm:space-x-5 items-center mb-6">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="sm:w-1/2 mb-5 sm:mb-0">
                                <FormLabel className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                                  Email Address
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Email Address"
                                    className="w-full"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                              <FormItem className="sm:w-1/2 mb-5 sm:mb-0">
                                <FormLabel className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                                  Phone Number
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Phone Number"
                                    className="w-full"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-full mb-6">
                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                                  Country
                                </FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                          "w-full justify-between",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value
                                          ? countries.find(
                                              (country) =>
                                                country.value === field.value
                                            )?.label
                                          : "Select a country"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandList>
                                        <CommandInput placeholder="Search country..." />
                                        <CommandEmpty>
                                          No country found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                          {countries.map((country) => (
                                            <CommandItem
                                              value={country.label}
                                              key={country.value}
                                              onSelect={() => {
                                                form.setValue(
                                                  "country",
                                                  country.value
                                                );
                                              }}
                                            >
                                              <Check
                                                className={cn(
                                                  "mr-2 h-4 w-4",
                                                  country.value === field.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                                )}
                                              />
                                              {country.label}
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="w-full mb-6">
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem className="sm:w-full mb-5 sm:mb-0">
                                <FormLabel className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                                  Address
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Address"
                                    className="w-full"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="sm:flex sm:space-x-5 items-center mb-6">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem className="sm:w-1/2 mb-5 sm:mb-0">
                                <FormLabel className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                                  Town / City
                                </FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                          "w-full justify-between",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value
                                          ? cities.find(
                                              (city) =>
                                                city.value === field.value
                                            )?.label
                                          : "Select a city or town"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandList>
                                        <CommandInput placeholder="Search city..." />
                                        <CommandEmpty>
                                          No city found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                          {cities.map((city) => (
                                            <CommandItem
                                              value={city.label}
                                              key={city.value}
                                              onSelect={() => {
                                                form.setValue(
                                                  "city",
                                                  city.value
                                                );
                                              }}
                                            >
                                              <Check
                                                className={cn(
                                                  "mr-2 h-4 w-4",
                                                  city.value === field.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                                )}
                                              />
                                              {city.label}
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="zip"
                            render={({ field }) => (
                              <FormItem className="sm:w-1/2 mb-5 sm:mb-0">
                                <FormLabel className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                                  Zip Code
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Zip Code"
                                    className="w-full"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex space-x-2 items-center mb-10">
                          <FormField
                            control={form.control}
                            name="createAccount"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Checkbox id="createAccount" {...field} />
                                </FormControl>
                                <FormLabel className="text-qblack text-[15px] select-none ml-2">
                                  Create an account?
                                </FormLabel>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </form>
                    </Form>
                  </div>

                  <div className="md:w-1/2">
                    <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                      Order Summary
                    </h1>

                    <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                      <div className="sub-total mb-6">
                        <div className="flex justify-between mb-5">
                          <p className="text-[13px] font-medium text-qblack uppercase">
                            PROduct
                          </p>
                          <p className="text-[13px] font-medium text-qblack uppercase">
                            total
                          </p>
                        </div>
                        <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                      </div>
                      <div className="product-list w-full mb-[30px]">
                        <ul className="flex flex-col space-y-5">
                          <li>
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="text-[15px] text-qblack mb-2.5">
                                  Apple Watch
                                  <sup className="text-[13px] text-qgray ml-2 mt-2">
                                    x1
                                  </sup>
                                </h4>
                                <p className="text-[13px] text-qgray">
                                  64GB, Black, 44mm, Chain Belt
                                </p>
                              </div>
                              <div>
                                <span className="text-[15px] text-qblack font-medium">
                                  $38
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="text-[15px] text-qblack mb-2.5">
                                  Apple Watch
                                  <sup className="text-[13px] text-qgray ml-2 mt-2">
                                    x1
                                  </sup>
                                </h4>
                                <p className="text-[13px] text-qgray">
                                  64GB, Black, 44mm, Chain Belt
                                </p>
                              </div>
                              <div>
                                <span className="text-[15px] text-qblack font-medium">
                                  $38
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="text-[15px] text-qblack mb-2.5">
                                  Apple Watch
                                  <sup className="text-[13px] text-qgray ml-2 mt-2">
                                    x1
                                  </sup>
                                </h4>
                                <p className="text-[13px] text-qgray">
                                  64GB, Black, 44mm, Chain Belt
                                </p>
                              </div>
                              <div>
                                <span className="text-[15px] text-qblack font-medium">
                                  $38
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                      <div className="mt-[30px]">
                        <div className="flex justify-between mb-5">
                          <p className="text-[13px] font-medium text-qblack uppercase">
                            SUBTOTAL
                          </p>
                          <p className="text-[15px] font-medium text-qblack uppercase">
                            $365
                          </p>
                        </div>
                      </div>
                      <div className="w-full mt-[30px]">
                        <div className="sub-total mb-6">
                          <div className="flex justify-between mb-5">
                            <div>
                              <span className="text-xs text-qgraytwo mb-3 block">
                                SHIPPING
                              </span>
                              <p className="text-base font-medium text-qblack">
                                Free Shipping
                              </p>
                            </div>
                            <p className="text-[15px] font-medium text-qblack">
                              +$0
                            </p>
                          </div>
                          <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                        </div>
                      </div>
                      <div className="mt-[30px]">
                        <div className="flex justify-between mb-5">
                          <p className="text-2xl font-medium text-qblack">
                            Total
                          </p>
                          <p className="text-2xl font-medium text-qred">$365</p>
                        </div>
                      </div>
                      <div className="shipping mt-[30px]">
                        <Form {...paymentMethodForm}>
                          <form
                            onSubmit={paymentMethodForm.handleSubmit(onSubmit)}
                          >
                            <FormField
                              control={paymentMethodForm.control}
                              name="method"
                              render={({ field }) => (
                                <FormItem className="flex flex-col space-y-1">
                                  <FormControl>
                                    <RadioGroup onValueChange={field.onChange}>
                                      <FormItem className="class=flex space-x-2.5 items-center mb-4">
                                        <FormControl>
                                          <RadioGroupItem
                                            className="accent-pink-500"
                                            value="Direct Bank Transfer"
                                          />
                                        </FormControl>
                                        <FormLabel className="text-[18px] text-normal text-qblack">
                                          Direct Bank Transfer
                                        </FormLabel>
                                      </FormItem>

                                      <FormItem className="class=flex space-x-2.5 items-center mb-4">
                                        <FormControl>
                                          <RadioGroupItem
                                            className="accent-pink-500"
                                            value="Cash on Delivery"
                                          />
                                        </FormControl>
                                        <FormLabel className="text-[18px] text-normal text-qblack">
                                          Cash on Delivery
                                        </FormLabel>
                                      </FormItem>

                                      <FormItem className="class=flex space-x-2.5 items-center mb-4">
                                        <FormControl>
                                          <RadioGroupItem
                                            className="accent-pink-500"
                                            value="Credit/Debit Cards or Paypal"
                                          />
                                        </FormControl>
                                        <FormLabel className="text-[18px] text-normal text-qblack">
                                          Credit/Debit Cards or Paypal
                                        </FormLabel>
                                      </FormItem>
                                    </RadioGroup>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </form>
                        </Form>
                      </div>
                      <Button
                        asChild
                        className="w-full bg-black rounded-none h-[50px]"
                      >
                        <a href="#">
                          <span className="text-sm font-semibold">
                            Place Order Now
                          </span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
