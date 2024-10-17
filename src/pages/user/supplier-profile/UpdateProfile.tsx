/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { getAllCountries, ICountry } from "@/service/apis/countries-services";
import { AxiosResponse, HttpStatusCode } from "axios";
import { getUserInfo, updateProfile } from "@/service/apis/user-services";
import { IUser } from "@/store/user-store";

const UpdateProfileForm = () => {
  const {
    data: user,
    isSuccess: isUserSuccess,
    error: userError,
    isLoading: userLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["personal"],
    queryFn: async () => {
      const res = await getUserInfo();
      if (res.status === HttpStatusCode.Ok) {
        return res.data.data as IUser;
      }
    },
  });

  const [profile, setProfile] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [cover, setCover] = useState<string | null>(null);

  console.log({
    error: userError,
    isLoading: userLoading,
    isError: isUserError,
  });

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
    defaultValues: {
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
    },
  });

  useEffect(() => {
    if (isUserSuccess) {
      form.setValue("business_name", user?.business_name);
      form.setValue("profile.address", user?.profile.address);
      form.setValue("profile.business_type", user?.profile.business_type);
      form.setValue("profile.phonenumber", user?.profile.phonenumber);
      form.setValue("profile.city", user?.profile.city);
      form.setValue("profile.country_id", user?.profile.country_id);
      form.setValue("profile.slogan", user?.profile.slogan);
      form.setValue(
        "profile.number_of_employees",
        user?.profile.number_of_employees
      );
      form.setValue("profile.year_started", user?.profile.year_started);
    }
  }, [isUserSuccess, user, form]);

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
    const res = await updateProfile(data);
    if (
      res.status === HttpStatusCode.Ok ||
      res.status === HttpStatusCode.Accepted
    ) {
      console.log(res);
    }
  };

  return (
    <div className="flex p-3 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-9/12"
        >
          <div className="grid grid-cols-2 gap-4">
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

            <FormField
              control={form.control}
              name="profile.business_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Business Type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          {/* <SocialMediaForm /> */}

          {/* <div>
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
          </div> */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div className="w-3/12 p-4 flex-col flex justify-center items-center">
        <SingleImageUpload
          image={profile}
          setImage={(image) => setProfile(image)}
          fieldName="Upload Profile Image"
          image_url={
            user?.profileImages.find((r) => r.image_for === "PROFILE")
              ?.image_url
          }
        />
        <SingleImageUpload
          image={logo}
          setImage={(image) => setLogo(image)}
          fieldName="Upload Logo"
          image_url={
            user?.profileImages.find((r) => r.image_for === "LOGO")?.image_url
          }
        />
        <SingleImageUpload
          image={cover}
          setImage={(image) => setCover(image)}
          fieldName="Upload Cover Image"
          image_url={
            user?.profileImages.find((r) => r.image_for === "COVER")?.image_url
          }
        />
      </div>
    </div>
  );
};

export default UpdateProfileForm;

// // Corrected social media schema using Zod
// const socialMediaSchema = z.object({
//   socialMedia: z.record(
//     z.object({
//       link_id: z.string().uuid().optional(),
//       link_for: z.enum([
//         "INSTAGRAM",
//         "FACEBOOK",
//         "TWITTER",
//         "YOUTUBE",
//         "SNAPCHAT",
//         "TIKTOK",
//         "PINTEREST",
//         "LINKEDIN",
//         "TUMBLR",
//         "TELEGRAM",
//       ]),
//       link: z.string().url({ message: "Invalid URL format" }),
//     })
//   ),
// });

// // Define TypeScript type for the form data
// type SocialMediaFormValues = z.infer<typeof socialMediaSchema>;

// const SocialMediaForm: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     unregister,
//     formState: { errors },
//   } = useForm<SocialMediaFormValues>({
//     resolver: zodResolver(socialMediaSchema),
//     defaultValues: { socialMedia: {} },
//   });

//   // Manage dynamic platforms as an object in state
//   const [platforms, setPlatforms] = useState<{
//     [key: string]: { link_for: string; link: string };
//   }>({});

//   const onSubmit = (data: SocialMediaFormValues) => {
//     console.log(data);
//   };

//   const addPlatform = () => {
//     const newId = uuidv4(); // Generate a unique ID for each platform
//     setPlatforms((prev) => ({
//       ...prev,
//       [newId]: { link_for: "", link: "" },
//     }));
//   };

//   const removePlatform = (id: string) => {
//     setPlatforms((prev) => {
//       const newPlatforms = { ...prev };
//       delete newPlatforms[id];
//       return newPlatforms;
//     });

//     // Unregister the removed field in React Hook Form
//     unregister(`socialMedia.${id}`);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* Dynamically render form fields based on platforms */}
//       {Object.keys(platforms).map((id) => (
//         <div key={id} style={{ marginBottom: "10px" }}>
//           <label>Platform:</label>
//           <select {...register(`socialMedia.${id}.link_for` as const)}>
//             <option value="">Select Platform</option>
//             <option value="INSTAGRAM">Instagram</option>
//             <option value="FACEBOOK">Facebook</option>
//             <option value="TWITTER">Twitter</option>
//             <option value="YOUTUBE">YouTube</option>
//             <option value="SNAPCHAT">Snapchat</option>
//             <option value="TIKTOK">TikTok</option>
//             <option value="PINTEREST">Pinterest</option>
//             <option value="LINKEDIN">LinkedIn</option>
//             <option value="TUMBLR">Tumblr</option>
//             <option value="TELEGRAM">Telegram</option>
//           </select>

//           <label>Link:</label>
//           <input
//             type="text"
//             {...register(`socialMedia.${id}.link` as const)}
//             placeholder="Enter URL"
//           />
//           {errors.socialMedia?.[id]?.link && (
//             <p style={{ color: "red" }}>
//               {errors.socialMedia[id]?.link?.message}
//             </p>
//           )}

//           {/* Remove Button */}
//           <button type="button" onClick={() => removePlatform(id)}>
//             Remove
//           </button>
//         </div>
//       ))}

//       {/* Add Button */}
//       <button type="button" onClick={addPlatform}>
//         Add Social Media
//       </button>

//       <div>
//         <button type="submit">Submit</button>
//       </div>
//     </form>
//   );
// };
