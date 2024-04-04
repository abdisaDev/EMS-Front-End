import * as React from "react";

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

export function OtpDialog(props: {
  dialogTrigerElement:
    | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
    | undefined;
}) {
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
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
