/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllShowrooms } from "@/service/apis/countries-services";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

export function SelectShowroom() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [isFixed, setIsFixed] = React.useState(false); // New state to track fixed status
  const navigate = useNavigate();

  // Fetch countries using react-query
  const {
    data: countries,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await getAllShowrooms();
      if (response.status === 200) {
        console.log({showrooms: response.data.data})
        return response.data.data as any;
      }
    },
  });

  // Handle selection of a country
  const handleSelectChange = (currentValue: string) => {
    const country = countries?.find(
      (country: any) => country.showroom_id === currentValue
    );
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);

    if (country) {
      setIsFixed(true); // Set the button to fixed when an item is selected
      navigate(`/show-room?country=${country.showroom_id}`);
    }
  };

  console.log();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[170px] justify-between ${
            isFixed ? "fixed top-10 left-10 z-10" : ""
          }`} // Add fixed class conditionally
        >
          {value
            ? countries?.find((country: any) => country.showroom_name === value)?.showroom_name
            : "Select showroom..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search showroom..."
            className="text-gray-700"
          />
          <CommandList>
            {isLoading ? (
              <CommandEmpty>Loading...</CommandEmpty>
            ) : isError ||
              !isSuccess ||
              !countries ||
              countries.length === 0 ? (
              <CommandEmpty>No showroom found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {countries.map((country: any) => (
                  <CommandItem
                    key={country.showroom_id} // Changed to country_id for uniqueness
                    value={country.showroom_id} // Ensure value is unique and matches selection logic
                    onSelect={handleSelectChange}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === country.showroom_name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {country.showroom_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
