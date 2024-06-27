// validation
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form Handler
import { useForm } from "react-hook-form";

// Shadcn Components
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

// react router
import { Link, useNavigate } from "react-router-dom";

// reacptcha v3
import {
  GoogleReCaptchaProvider,
  // useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import TempNotification from "@/components/tempNotification/tempNotification";
import axios from "axios";

export default function LoginForm() {
  // const { executeRecaptcha } = useGoogleReCaptcha();

  // const handleReCaptchaVerify = useCallback(async () => {
  //   if (!executeRecaptcha) {
  //     console.log("Execute recaptcha not yet available");
  //     return;
  //   }

  //   const token = await executeRecaptcha("submit");
  //   // backend implementaiton goes here
  //   console.log(token);
  // }, [executeRecaptcha]);
  const navigate = useNavigate();
  const formSchema = z.object({
    phone_number: z
      .string()
      .min(9, "Invalid Phone Number.")
      .max(10, "Invalid Phone Number."),
    password: z.string(),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { phone_number, password } = values;
    signIn(phone_number, password);
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_number: undefined,
      password: "",
    },
  });

  const signIn = async (phone_number: string, password: string) => {
    await axios
      .post(`${import.meta.env.VITE_API_ADDRESS}/auth/login`, {
        phone_number,
        password,
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_toke);
        localStorage.setItem("role", response.data.role);
        navigate(
          localStorage.getItem("role") === "security_guard"
            ? "/home"
            : "/user-home"
        );
      });
  };

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={`${import.meta.env.VITE_SITE_KEY_EMS}`}
    >
      <div className="w-full h-screen flex justify-center items-center absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative space-y-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 py-3 px-4 rounded-lg bg-[#f7f7f7]"
          >
            <p className="text-center font-black text-2xl text-[#0f172a]">
              Sign In
            </p>
            <div className="space-y-3">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+25198824 * * *" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="* * * * * * * *"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-sky-500 underline text-sm flex items-center">
                <Link to="#">Forgot password?</Link>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-sky-500 underline text-sm flex items-center">
                  <Link to="/register">Don't have an account?</Link>
                </div>
              </div>
            </div>
            <div>
              {/* <Button
                  type="submit"
                  className="w-full"
                  onClick={handleReCaptchaVerify}
                >
                  Login
                </Button> */}
              <TempNotification
                value="Login"
                className="w-full"
                type="submit"
              />

              <div>
                <Separator className="my-4" />
              </div>
              <div className="flex justify-center text-sm">
                <p className="w-10/12 text-center font-light	">
                  By clicking continue, you agree to our{" "}
                  <Link to="#" className="text-sky-500 underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="#" className="text-sky-500 underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </GoogleReCaptchaProvider>
  );
}
