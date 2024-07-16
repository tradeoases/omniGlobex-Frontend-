import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { passwordResetSchema } from "@/data/schemas/users-schema";
import { zodResolver } from "@hookform/resolvers/zod";

const ChangePassword = () => {
  const form = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof passwordResetSchema>) => {
    console.log(data);
  };
  return (
    <div className="col-span-3 no-scrollbars bg-white p-8 relative w-full overflow-x-auto">
      <Form {...form}>
        <form
          className="w-full space-y-8 mt-16"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password *</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="focus-visible:outline-none focus:outline-none w-full"
                      placeholder="Old Password"
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
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password *</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="focus:outline-none w-full"
                      placeholder="New Password"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-enter Password *</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="focus:outline-none w-full"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-50  items-center">
            <div className="w-36">
              <Button
                type="submit"
                className="w-full h-12 rounded-none bg-main text-black hover:bg-main/80 shadow-none"
              >
                <span>Update Password</span>
              </Button>
            </div>
            <div className="w-36 text-center">
              <span className="cursor-pointer">Cancel</span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
