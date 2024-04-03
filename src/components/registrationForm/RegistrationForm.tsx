import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Input } from "@/components/ui/input";

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
  phone_number: z.number().min(9).max(10),
  verfication_code: z.number().min(6).max(6),
  password: z.string().min(8).max(20),
});

export default function RegistrationForm() {
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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-4/12">
        <div className="flex">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-6/12">
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
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-6/12">
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
        <div>
          <FormField
            name="role"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-6/12">
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        <SelectItem value="Student">Student</SelectItem>
                        <SelectItem value="Lecturer">Lecuturer</SelectItem>
                        <SelectItem value="Employee">Employee</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            name="role"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-6/12">
                <FormLabel>Items</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Items</SelectLabel>
                        <SelectItem value="Student">Student</SelectItem>
                        <SelectItem value="Lecturer">Lecuturer</SelectItem>
                        <SelectItem value="Employee">Employee</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
}
