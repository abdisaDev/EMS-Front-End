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
import { toast } from 'sonner';

export function OtpDialog(props: {
  dialogTrigerElement:
    | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
    | undefined;
}) {
  const [otp, setOtp] = useState('');
  const [showOtpDialog, setShowOtpDialog] = useState(false);
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
      .then((response) => {
        dispatch(isOtpVerified(response.data.status == 200 ? true : false));
        toastHandler({
          title: 'OTP Response',
          description: response.data.message,
          status: String(response.data.status)[0] === '2' ? true : false,
        });
      })
      .catch((error) => {
        toastHandler({
          title: 'OTP Response',
          description: error.response.data.message,
          status: String(error.response.data.status)[0] === '2' ? true : false,
        });
      });
  };
  store.subscribe(() => {
    const { value } = store.getState().showOtpDialog;
    setShowOtpDialog(value);
  });

  const toastHandler = (props: {
    title: string;
    description: string;
    status: boolean;
  }) => {
    if (props.status) {
      return toast.success(props.title, {
        description: props.description,
        action: {
          label: 'Close',
          onClick: () => {},
        },
      });
    }
    return toast.error(props.title, {
      description: props.description,
      action: {
        label: 'Close',
        onClick: () => {},
      },
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {props.dialogTrigerElement}
      </AlertDialogTrigger>
      {showOtpDialog && (
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
      )}
    </AlertDialog>
  );
}
