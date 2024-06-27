import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import QRCode from "react-qr-code";
import axios from "axios";

export default function QrCodeDisplay() {
  const fetchUserItems = async () => {
    await axios.get(`${import.meta.env.VITE_API_ADDRESS}`).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <Card>
        <CardHeader>
          <div className="relative">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value="Abdisa Dev"
              viewBox={`0 0 256 256`}
            />
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
              <Button variant="destructive" size="sm" className="px-4">
                Cancel
              </Button>
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
