// react
import { useCallback } from "react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

// react router
import { Link } from "react-router-dom";

// reacptcha v3
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

const formSchema = z.object({
  phone_number: z.number().min(9).max(10),
  password: z.string().min(8).max(20),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}

export default function LoginForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha("submit");
    // backend implementaiton goes here
    console.log(token);
  }, [executeRecaptcha]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_number: undefined,
      password: "",
    },
  });

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
                      {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
                        <Input placeholder="* * * * * * * *" {...field} />
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
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  keep me signed in
                </label>
              </div>
              <div className="text-sky-500 underline text-sm flex items-center">
                <Link to="#">Forgot password?</Link>
              </div>
            </div>
            <div>
              <Link to="/login">
                <Button
                  type="submit"
                  className="w-full"
                  onClick={handleReCaptchaVerify}
                >
                  Login
                </Button>
              </Link>
              <div>
                <Separator className="my-4" />
              </div>
              <div className="flex justify-center">
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
