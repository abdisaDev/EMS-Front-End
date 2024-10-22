// validation
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Form Handler
import { useForm } from 'react-hook-form';

// Shadcn Components
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
// react router
import { Link, useNavigate } from 'react-router-dom';

// reacptcha v3
import {
  GoogleReCaptchaProvider,
  // useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { store } from '@/app/store';
import { userRole } from './routeSlice';

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
      .min(9, 'Invalid Phone Number.')
      .max(10, 'Invalid Phone Number.'),
    password: z.string(),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { phone_number, password } = values;
    await signIn(phone_number, password);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_number: '',
      password: '',
    },
  });

  const signIn = async (phone_number: string, password: string) => {
    return await axios
      .post(`${import.meta.env.VITE_API_ADDRESS}/auth/login`, {
        phone_number,
        password,
      })
      .then(async (response) => {
        const { access_token, role, userId, name } = await response.data;
        localStorage.clear();
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('role', role);
        localStorage.setItem('userId', userId);
        localStorage.setItem('name', name);
        localStorage.getItem('role') === 'admin'
          ? navigate('/register')
          : navigate('/home');
        store.dispatch(userRole(!store.getState().pathChecker.pathChanged));
        toast.success('Successfuly Authenticated');
      })
      .catch(() => {
        toast.error('Phone Number or Password Incorrect.', {
          description: 'Please try again later or contact the admin',
        });
      });
  };

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={`${import.meta.env.VITE_SITE_KEY_EMS}`}
    >
      <div className='w-full h-screen flex justify-center items-center absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='relative space-y-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 py-3 px-4 rounded-lg bg-[#f7f7f7]'
          >
            <p className='text-center font-black text-2xl text-[#0f172a]'>
              Sign In
            </p>
            <div className='space-y-3'>
              <div className='w-full'>
                <FormField
                  control={form.control}
                  name='phone_number'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder='+25198824 * * *' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='w-full'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='* * * * * * * *'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='w-full flex justify-end items-center'>
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className='flex justify-end'>
                        <div className='text-sky-500 underline text-sm flex items-center mr-[20px]'>
                          <Link to='#'>Forgot password ?</Link>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      This feature isn't available right now.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div>
              <Button
                type='submit'
                className='w-full'
                // onClick={handleReCaptchaVerify}
              >
                Login
              </Button>

              <div>
                <Separator className='my-4' />
              </div>
              <div className='flex justify-center text-sm'>
                <p className='w-10/12 text-center font-light	'>
                  By clicking continue, you agree to our &nbsp;
                  <Link to='#' className='text-sky-500 underline'>
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link to='#' className='text-sky-500 underline'>
                    Privacy Policy.
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </GoogleReCaptchaProvider>
  );
}
