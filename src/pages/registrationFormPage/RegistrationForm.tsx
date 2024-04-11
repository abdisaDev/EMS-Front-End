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
import { Checkbox } from "@/components/ui/checkbox";

// icons
import { KeyRound } from "lucide-react";

// redux-toolkit
import { useDispatch } from "react-redux";

// custom component
import { OtpDialog } from "@/components/otpDialog/OtpDialog";
import { show } from "@/components/otpDialog/showOtpSlice";
import { ModeToggle } from "@/components/theme/mode-toggle";
import axios from "axios";

enum Role {
  STUDENT = "Student",
  LECTURER = "Lecturer",
  EMPLOYEE = "Employee",
}
const formSchema = z.object({
  first_name: z
    .string()
    .min(3, "Minimum 3 charchters")
    .max(50, "Maximum 50 charchters"),
  last_name: z
    .string()
    .min(3, "Minimum 3 charchters")
    .max(50, "Maximum 50 charchters"),
  role: z.nativeEnum(Role),
  items: z.string(),
  phone_number: z
    .string()
    .min(9, "Invalid Phone Number")
    .max(10, "Invalid Phone Number"),
  // verfication_code: z.number().min(6).max(6),
  password: z.string().min(8, "Minimum 8 Charachters").max(20),
  confirm_password: z.string().min(8, "Password didn't Match.").max(20),
});

const phoneNumber = formSchema.pick({ phone_number: true });

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      // verfication_code: 0,
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { confirm_password, ...payload } = values;
    console.log(confirm_password);
    axios
      .post("http://localhost:2423/users/create", payload)
      .then(function (response: unknown) {
        console.log(response);
      })
      .catch(function (error: unknown) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative space-y-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 py-3 px-4 rounded-lg bg-[#f7f7f7]"
          >
            <div className="absolute top-5 right-5">
              <ModeToggle />
            </div>
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
                              <SelectItem value="food">Food</SelectItem>
                              <SelectItem value="test">Test</SelectItem>
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
                        <Input placeholder="+25198824 * * * " {...field} />
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
                      disabled={
                        !phoneNumber.safeParse({
                          phone_number: form.getValues("phone_number"),
                        }).success
                      }
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
            <div className="flex space-x-5 justify-between">
              <div className="items-top flex space-x-2">
                <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                  <p className="text-sm text-muted-foreground">
                    You agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!formSchema.safeParse(form.getValues()).success}
            >
              Register
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
