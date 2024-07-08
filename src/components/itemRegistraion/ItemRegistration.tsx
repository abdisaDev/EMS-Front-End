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
} from '@/components/ui/alert-dialog';
import { FormControl, FormField, FormItem, FormLabel, Form } from '../ui/form';
import { Input } from '../ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// validation lib
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '../ui/textarea';
import axios from 'axios';
import { MoveRight } from 'lucide-react';

enum Category {
  CAR = 'car',
  COMPUTER = 'computer',
  DEFAULT = '',
}

const formSchema = z.object({
  user: z.string(),
  model: z.string(),
  color: z.string(),
  serial_number: z.string(),
  category: z.nativeEnum(Category),
  description: z.string(),
});

export default function ItemRegistration(props: {
  dialogTriggerButton: JSX.Element;
  allUsers: {
    id: number;
    user: string;
    first_name: string;
    last_name: string;
    role: string;
    phone_number: string;
  }[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: '',
      model: '',
      color: '',
      category: Category.DEFAULT,
      serial_number: '',
      description: '',
    },
  });
  const registerItem = async (formPayload: {
    user: string;
    model: string;
    color: string;
    category: Category;
    serial_number: string;
    description: string;
  }) => {
    await axios
      .post(
        `${import.meta.env.VITE_API_ADDRESS}/user/${
          formPayload.user
        }/registerItem`,
        formPayload
      )
      .then((response) => {
        console.log(response);
      });
  };
  const onSubmit = (values: z.infer<typeof formSchema>) => {
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
              <div className='flex flex-col gap-y-2'>
                <div>
                  <FormField
                    control={form.control}
                    name='user'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select User</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder='User' />
                            </SelectTrigger>
                            <SelectContent>
                              {props.allUsers.map((user) => {
                                return (
                                  user.role !== 'admin' &&
                                  user.role !== 'security_guard' && (
                                    <SelectItem
                                      value={String(user.id)}
                                      className='w-full'
                                    >
                                      <div className='w-full flex justify-between items-center'>
                                        {`${user.first_name} ${user.last_name}`}
                                        &emsp;
                                        <MoveRight
                                          size={16}
                                          absoluteStrokeWidth
                                        />
                                        &emsp;
                                        {`${user.phone_number}`}
                                      </div>
                                    </SelectItem>
                                  )
                                );
                              })}
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
                    name='category'
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
                              <SelectValue placeholder='Category' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='car'>Car</SelectItem>
                              <SelectItem value='computer'>Computer</SelectItem>
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
                    name='model'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input placeholder='Model' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name='color'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <Input placeholder='Color' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name='serial_number'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serial Number</FormLabel>
                        <FormControl>
                          <Input placeholder='Serial Number' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className='mb-2'>
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder='Description' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type='submit'>Add Item</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
