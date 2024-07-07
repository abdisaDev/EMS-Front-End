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
import { toast, Toaster } from "sonner";

// icons
import { KeyRound, LogOutIcon, Undo2 } from "lucide-react";

// redux-toolkit
import { useDispatch } from "react-redux";

// custom component
import { OtpDialog } from "@/components/otpDialog/OtpDialog";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { store } from "@/app/store";
import { useState } from "react";
import { hide, show } from "@/components/otpDialog/showOtpSlice";

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
      .min(10, "Invalid Phone Number")
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
const initailFormValues = {
  first_name: "",
  last_name: "",
  phone_number: "",
  role: Role.DEFAULT,
  password: "",
  confirm_password: "",
};

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOtpVerified, setIsOtpVerfied] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initailFormValues,
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
        location.reload();
      })
      .catch(function (error: unknown) {
        console.log(error);
      });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...payload } = values;
    registerUser(payload);
    setIsOtpVerfied(false);
  };

  const getOtp = async (phone_number: string) => {
    return await axios
      .post(`${import.meta.env.VITE_API_ADDRESS}/otp/get`, {
        phone_number,
      })
      .then(async (response) => {
        const { message, status } = await response.data;
        toastHandler({
          title: "OTP Response",
          description: message,
          status: String(status)[0] === "2" ? true : false,
        });
        status < 400 && dispatch(show());
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch(async (error) => {
        const { message, statusCode } = await error.response.data;
        toastHandler({
          title: "OTP Response",
          description: message,
          status: String(status)[0] === "2" ? true : false,
        });
        console.log(statusCode);
        Number(statusCode) >= 400 && dispatch(hide());
      });
  };

  const toastHandler = (props: {
    title: string;
    description: string;
    status: boolean;
  }) => {
    if (props.status) {
      return toast.success(props.title, {
        description: props.description,
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
    return toast.error(props.title, {
      description: props.description,
      action: {
        label: "Close",
        onClick: () => {},
      },
    });
  };

  store.subscribe(() => {
    const { isOtpVerified } = store.getState().showOtpDialog;
    setIsOtpVerfied(isOtpVerified);
  });

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative space-y-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 py-3 px-4 rounded-lg bg-[#f7f7f7]"
          >
            <div className="flex items-center justify-center my-2">
              <div className="absolute left-4">
                <Button
                  size="icon"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  <Undo2 />
                </Button>
              </div>
              <div>
                <p className="text-center font-black text-2xl text-[#0f172a]">
                  Sign Up
                </p>
              </div>
            </div>
            <hr />
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
                              {localStorage.getItem("role") === "admin" ? (
                                <SelectItem value="security_guard">
                                  Security Guard
                                </SelectItem>
                              ) : localStorage.getItem("role") ===
                                "security_guard" ? (
                                <SelectItem value="user">User</SelectItem>
                              ) : (
                                <></>
                              )}
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
                  // disabled={isOtpVerified}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+25198824 * * * "
                          {...field}
                          readOnly={isOtpVerified}
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
                <Toaster position="bottom-left" richColors />
                <OtpDialog
                  dialogTrigerElement={
                    <Button
                      type="button"
                      className="w-full"
                      disabled={
                        form.getValues().phone_number?.length !== 10 &&
                        isOtpVerified
                      }
                      onClick={async () => {
                        const valid_phone_number =
                          String(form.getValues().phone_number[0]) === "0"
                            ? form.getValues().phone_number.replace("0", "+251")
                            : `+251${form.getValues().phone_number}`;
                        getOtp(valid_phone_number);
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
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full"
                disabled={!isOtpVerified}
              >
                Register
              </Button>
              {localStorage.getItem("role") === "admin" && (
                <Button
                  type="button"
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                  }}
                >
                  Logout &nbsp; <LogOutIcon size={16} />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
