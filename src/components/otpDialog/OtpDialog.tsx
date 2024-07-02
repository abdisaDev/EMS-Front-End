import { useState } from "react";

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
} from "@/components/ui/alert-dialog";

// custom components
import { OtpField } from "../otpField/otpField";
import axios from "axios";
import { store } from "@/app/store";

export function OtpDialog(props: {
  dialogTrigerElement:
    | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
    | undefined;
}) {
  const [otp, setOtp] = useState("");

  store.subscribe(() => {
    const { otp } = store.getState().showOtpDialog;
    setOtp(otp);
  });

  const verifyOtp = async (otp: string) => {
    // eslint-disable-next-line no-debugger
    debugger;
    return await axios
      .post(`${import.meta.env.VITE_API_ADDRESS}/otp/verify`, {
        otp,
      })
      .then((res) => {
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
          <AlertDialogDescription className="flex justify-center">
            <OtpField />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              console.log(otp);
              verifyOtp(otp);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
