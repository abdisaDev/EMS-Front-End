import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

// @ts-expect-error -> the below package didn't have any declarations
import QrReader from "modern-react-qr-reader";

import QrReaderBox from "@/assets/images/qrReaderBox.png";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function QrCodeReader() {
  const { toast } = useToast();

  const [qrResponse, setQrResponse] = useState<string>("Can't Find Name!");

  const handleScanQrCode = (response: string) => {
    if (response) {
      toast({
        title: `QR Read Successfully - ${response}`,
        description: "Check the detail inforamation on . . . ",
        action: <ToastAction altText="Close Notification">Close</ToastAction>,
      });
      setQrResponse(response);
    }
    console.log(response);
    console.log(qrResponse);
  };

  return (
    <div className="flex justify-center items-center h-screen absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <Card>
        <CardHeader>
          <div className="relative">
            <QrReader
              delay={500}
              className="rounded-2xl border-8 border-slate-400 "
              constraints={{
                audio: false,
                video: { facingMode: "environment" },
              }}
              onScan={handleScanQrCode}
              onError={handleScanQrCode}
            />
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
              <img
                src={QrReaderBox}
                alt="Qr Reader Box"
                className="animate-pulse animate-infinite animate-ease-in"
              />
            </div>
          </div>
        </CardHeader>

        <Card className="shadow-sm border-2 rounded-t-xl border-slate-400">
          <CardFooter className="flex flex-col space-y-4 pt-4">
            <div>
              <CardTitle>Analyzing QR code.</CardTitle>
              <CardDescription>
                Decoding QR code. Please hold your device steady.
              </CardDescription>
            </div>
            <div className="flex justify-end w-full space-x-2">
              <div className="flex justify-center items-center w-full ">
                <p className="animate-bounce animate-infinite animate-ease-in animate-ease-out">
                  <Badge>Scanning . . .</Badge>
                </p>
              </div>
              <Link to="/">
                <Button variant="destructive" size="sm" className="px-4">
                  Cancel
                </Button>
              </Link>
              <Button size="sm" className="px-6">
                Verify
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
