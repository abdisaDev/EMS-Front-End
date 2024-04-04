// validation
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form Handler
import { useForm } from "react-hook-form";

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";

// icons
import { KeyRound } from "lucide-react";

// redux-toolkit
import { useDispatch } from "react-redux";

// custom component
import { OtpDialog } from "@/components/otpDialog/OtpDialog";
import { show } from "../otpDialog/showOtpSlice";

enum Role {
  STUDENT = "Student",
  LECTURER = "Lecturer",
  EMPLOYEE = "Employee",
}
const formSchema = z.object({
  first_name: z.string().min(3).max(50),
  last_name: z.string().min(3).max(50),
  username: z.string().min(5, "This message is fun").max(15),
  role: z.nativeEnum(Role),
  items: z.string(),
  phone_number: z.number().min(9).max(10),
  verfication_code: z.number().min(6).max(6),
  password: z.string().min(8).max(20),
  confirm_password: z.string().min(8).max(20),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      phone_number: 0,
      verfication_code: 0,
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 py-3 px-4 rounded-lg bg-[#f7f7f7]"
          >
            <p className="text-center font-black text-2xl text-[#0f172a]">
              Sign Up
            </p>
            <div className="flex justify-between">
              <div className="w-[48%]">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Abdisa" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[48%]">
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Alemu" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-[48%]">
                <FormField
                  name="role"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Roles</SelectLabel>
                              <SelectItem value="Student">Student</SelectItem>
                              <SelectItem value="Lecturer">
                                Lecuturer
                              </SelectItem>
                              <SelectItem value="Employee">Employee</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[48%]">
                <FormField
                  name="items"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Items</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Categories</SelectLabel>
                              <SelectItem value="electronics">
                                Electronics
                              </SelectItem>
                              <SelectItem value="electronics">
                                Electronics
                              </SelectItem>
                              <SelectItem value="electronics">
                                Electronics
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-[48%]">
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+25198824 * * * "
                          {...field}
                          type="number"
                        />
                      </FormControl>
                      {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-end w-[48%]">
                <OtpDialog
                  dialogTrigerElement={
                    <Button
                      type="button"
                      className="w-full"
                      onClick={() => dispatch(show())}
                    >
                      Get Code &nbsp; <KeyRound size={15} />
                    </Button>
                  }
                />
              </div>
            </div>
            <div className="w-full space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="* * * * * * * *"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="* * * * * * * *"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
