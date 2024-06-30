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
import { Link, useNavigate } from "react-router-dom";
import { store } from "@/app/store";

enum Role {
  SECURITY_GUARD = "security_guard",
  USER = "user",
  DEFAULT = "",
}
const formSchema = z
  .object({
    first_name: z
      .string()
      .min(3, "Minimum 3 charchters")
      .max(50, "Maximum 50 charchters"),
    last_name: z
      .string()
      .min(3, "Minimum 3 charchters")
      .max(50, "Maximum 50 charchters"),
    role: z.nativeEnum(Role),
    phone_number: z
      .string()
      .min(9, "Invalid Phone Number")
      .max(10, "Invalid Phone Number"),
    password: z.string().min(8, "Minimum 8 Charachters").max(20),
    confirm_password: z.string().min(8, "Password didn't Match.").max(20),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match!",
    path: ["confirm_password"],
  });

// not working because of refining the formSchema
// const phoneNumber = formSchema.pick({ phone_number: true });

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      role: Role.DEFAULT,
      password: "",
      confirm_password: "",
    },
  });

  const registerUser = async (payload: {
    role: Role;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
  }) => {
    await axios
      .post(`${import.meta.env.VITE_API_ADDRESS}/user/register`, payload)
      .then(function (response: unknown) {
        console.log(response);
        form.reset;
        navigate("/login");
      })
      .catch(function (error: unknown) {
        console.log(error);
      });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...payload } = values;
    registerUser(payload);
  };

  const getOtp = async (phone_number: string) => {
    return await axios
      .post(`${import.meta.env.VITE_API_ADDRESS}/otp/get`, {
        phone_number,
      })
      .then((res) => {
        return res.data.message;
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
                      {form.formState.errors.name && (
                        <span className="error">
                          {form.formState.errors.name.message}
                        </span>
                      )}
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
              <div className="w-full">
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
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="security_guard">
                                Security Guard
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
                      disabled={form.getValues().phone_number.length !== 10}
                      onClick={() => {
                        getOtp(form.getValues().phone_number);
                        dispatch(show());
                      }}
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
                    You agree to our&nbsp;
                    <Link to="#" className="text-sky-500">
                      Terms of Service
                    </Link>
                    &nbsp;and&nbsp;
                    <Link to="#" className="text-sky-500">
                      Privacy Policy.
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              // disabled={!formSchema.safeParse(form.getValues()).success}
            >
              Register
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
