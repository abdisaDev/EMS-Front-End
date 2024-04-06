import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// @ts-expect-error -> the below package didn't have any declarations
import QrReader from "react-qr-scanner";

export default function QrCodeReader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardHeader>
          <div>
            <QrReader
              delay={100}
              className="rounded-2xl border-4 border-slate-400"
            />
          </div>
        </CardHeader>
        <CardFooter className="flex flex-col space-y-4">
          <div>
            <CardTitle>QR Code - Scan for details</CardTitle>
            <CardDescription>
              Use your phone's camera to read the code.
            </CardDescription>
          </div>
          <div className="flex justify-center w-full ">
            <p className="animate-bounce animate-infinite">Scanning . . .</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
