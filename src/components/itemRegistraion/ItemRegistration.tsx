import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FormControl, FormField, FormItem, FormLabel, Form } from "../ui/form";
import { Input } from "../ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// validation lib
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import axios from "axios";

enum Category {
  CAR = "car",
  COMPUTER = "computer",
  DEFAULT = "",
}

const formSchema = z.object({
  model: z.string(),
  color: z.string(),
  serial_number: z.string(),
  category: z.nativeEnum(Category),
  description: z.string(),
});

export default function ItemRegistration(props: {
  dialogTriggerButton: JSX.Element;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "",
      color: "",
      category: Category.DEFAULT,
      serial_number: "",
      description: "",
    },
  });
  const registerItem = async (formPayload: unknown) => {
    await axios
      .post(
        `${import.meta.env.VITE_API_ADDRESS}/user/${localStorage.getItem(
          "userId"
        )}/registerItem`,
        formPayload
      )
      .then((response) => {
        console.log(response);
      });
  };
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    registerItem(values);
    form.reset;
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {props.dialogTriggerButton}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add User Items.</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AlertDialogDescription>
              <div>
                <div>
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input placeholder="Model" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <Input placeholder="Color" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="serial_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serial Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Serial Number" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="car">Car</SelectItem>
                              <SelectItem value="computer">Computer</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Description" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">Add Item</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
