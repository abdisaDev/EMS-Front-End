import { useState } from 'react';

// shadcn ui components
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

// custom components
import { OtpField } from '../otpField/otpField';
import axios from 'axios';
import { store } from '@/app/store';
import { useDispatch } from 'react-redux';
import { isOtpVerified } from './showOtpSlice';

export function OtpDialog(props: {
  dialogTrigerElement:
    | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
    | undefined;
}) {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

  store.subscribe(() => {
    const { otp } = store.getState().showOtpDialog;
    setOtp(otp);
  });

  const verifyOtp = async (otp: string) => {
    return await axios
      .post(`${import.meta.env.VITE_API_ADDRESS}/otp/verify`, {
        otp,
      })
      .then((res) => {
        dispatch(isOtpVerified(res.data.status == 200 ? true : false));
        return res.data.message;
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {props.dialogTrigerElement}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Verify Your Phone Number</AlertDialogTitle>
          <AlertDialogDescription className='flex justify-center'>
            <OtpField />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              dispatch(isOtpVerified(false));
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              verifyOtp(otp);
              dispatch(isOtpVerified(false));
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
