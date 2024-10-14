/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import SingleImageUpload from "@/components/ui/SingleImageUploadArea";

import { uploadImages } from "@/service/apis/image-service";
import { updateProfileSchema } from "@/data/schemas/users-schema";
import { useRecoilValue } from "recoil";
import { IUpdateProfileData, userStore } from "@/store/user-store";
import { useQuery } from "@tanstack/react-query";
import { getAllCountries, ICountry } from "@/service/apis/countries-services";
import { AxiosResponse, HttpStatusCode } from "axios";

const UpdateProfileForm = () => {
  const [profile, setProfile] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [cover, setCover] = useState<string | null>(null);
  const userData = useRecoilValue(userStore);
  console.log(userData);
  const {
    data: countries,
    isError: isCountryError,
    error: countryError,
    isLoading: countryLoading,
    isSuccess: countrySuccess,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllCountries();
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data;
      }
    },
  });

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValues: (userData as any as IUpdateProfileData) || {
      business_name: "",
      profile: {
        phonenumber: "",
        address: "",
        city: "",
        country_id: "",
        slogan: "",
        business_type: "",
        number_of_employees: undefined,
        year_started: "",
      },
      social_media: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "social_media",
  });
  const onSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
    if (profile) {
      const imageResponse = await uploadImages({ images: [profile] });
      if (imageResponse.status === 200) {
        data.profile_id = imageResponse.data.data[0].image_id;
      }
    }

    if (cover) {
      const imageResponse = await uploadImages({ images: [cover] });
      if (imageResponse.status === 200) {
        data.cover_id = imageResponse.data.data[0].image_id;
      }
    }

    if (logo) {
      const imageResponse = await uploadImages({ images: [logo] });
      if (imageResponse.status === 200) {
        data.logo_id = imageResponse.data.data[0].image_id;
      }
    }
    console.log({ data });
  };

  return (
    <div className="flex p-3 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-9/12"
        >
          <FormField
            control={form.control}
            name="business_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Business Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="profile.phonenumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="profile.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {countryLoading && <div>Countries Loading...</div>}

              {isCountryError && (
                <div>
                  <h1>{countryError.name}</h1>
                  <p>{countryError.message}</p>
                </div>
              )}
              {countrySuccess && (
                <FormField
                  control={form.control}
                  name="profile.country_id"
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
              )}
            </div>
          </div>

          <FormField
            control={form.control}
            name="profile.slogan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slogan</FormLabel>
                <FormControl>
                  <Input placeholder="Slogan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="profile.number_of_employees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Employees</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Number of Employees"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.year_started"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Started</FormLabel>
                  <FormControl>
                    <Input placeholder="Year Started" type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <h3>Social Media Links</h3>
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name={`social_media.${index}.link_for`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Social Media Platform"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`social_media.${index}.link`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="Social Media Link"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" onClick={() => remove(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                append({
                  link_id: "",
                  link_for: "INSTAGRAM",
                  link: "",
                })
              }
            >
              Add Social Media Link
            </Button>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div className="w-3/12 p-4 flex-col flex justify-center items-center">
        <SingleImageUpload
          image={profile}
          setImage={(image) => setProfile(image)}
          fieldName="Upload Profile Image"
          image_url={
            userData?.profileImages.find((r) => r.image_for === "PROFILE")
              ?.image_url
          }
        />
        <SingleImageUpload
          image={logo}
          setImage={(image) => setLogo(image)}
          fieldName="Upload Logo"
          image_url={
            userData?.profileImages.find((r) => r.image_for === "LOGO")
              ?.image_url
          }
        />
        <SingleImageUpload
          image={cover}
          setImage={(image) => setCover(image)}
          fieldName="Upload Cover Image"
          image_url={
            userData?.profileImages.find((r) => r.image_for === "COVER")
              ?.image_url
          }
        />
      </div>
    </div>
  );
};

export default UpdateProfileForm;
