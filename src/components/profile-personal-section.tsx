import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { personalInfoSchema } from "@/data/schemas/users-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { HiPencil } from "react-icons/hi2";
import { IUser } from "@/store/user-store";

interface Props {
  userData: IUser | null;
}

export const PersonalSection: React.FC<Props> = ({ userData }) => {
  const [isUpdate, setIsUpdate] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<"editing" | "viewing">("viewing");
  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      address: "Kampala, Uganda",
      firstname: "Golgotha",
      lastname: "Aksanti",
      country_id: "Uganda",
      email: `${userData?.email}`,
      phonenumber: "+2567812312321",
      postCode: "01920",
      town: "Kampala",
    },
  });

  const onSubmit = async (values: z.infer<typeof personalInfoSchema>) => {
    console.log(values);
  };
  return (
    <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4 space-y-10 lg:space-y-0 bg-white p-8">
      {isEditing === "editing" && (
        <div className="lg:col-span-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8"
            >
              <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isUpdate}
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
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isUpdate}
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

              <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isUpdate}
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

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="phonenumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isUpdate}
                            className="w-full focus:outline-none"
                            placeholder="Phone Number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="w-full items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="country_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isUpdate}
                          className="w-full focus:outline-none"
                          placeholder="Country"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isUpdate}
                          className="w-full focus:outline-none"
                          placeholder="Address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="town"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Town/City</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isUpdate}
                            type="text"
                            className="focus:outline-none"
                            placeholder="Town/City"
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
                    name="postCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Post Code</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isUpdate}
                            className="w-full focus:outline-none"
                            placeholder="Post Code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    setIsUpdate(true);
                    form.reset();
                    setIsEditing('viewing')
                  }}
                  variant="link"
                  className="text-red-600"
                >
                  cancel
                </Button>
                <Button
                  onClick={() => setIsUpdate(!isUpdate)}
                  className="rounded-none shadow-none"
                >
                  Update profile
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {isEditing === "viewing" && (
        <div>
          <h1>Profile</h1>
          <Button onClick={() => setIsEditing("editing")}>
            <HiPencil /> Edit Profile
          </Button>
        </div>
      )}

      <div className="col-span-1 space-y-4 text-center lg:text-left">
        <p className="text-xl font-semibold ">Update Prodile</p>
        <p>Profile of at least Size 300x300. Gifs work too. Max 5mb.</p>

        <div className="w-full flex justify-center">
          <div className="w-52 h-52 relative flex justify-center items-center rounded-full bg-gray-200">
            <img
              src="https://media.istockphoto.com/id/542183206/photo/richmond-virginia-usa-skyline.jpg?s=1024x1024&w=is&k=20&c=mZuIdrdFfnlLcKMU44x9yn9NmZxiu8pod0h2MRAS6Jk="
              alt="user-profile"
              className="rounded-full h-full w-full"
            />
            <div className="w-8 h-8 flex absolute bottom-10 right-0 items-center justify-center p-2 rounded-full bg-black">
              <HiPencil className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
