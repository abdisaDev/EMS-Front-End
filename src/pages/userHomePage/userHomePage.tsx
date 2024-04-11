import WelcomePage from "@/components/welcomePage/welcomePage";
import { Button } from "@/components/ui/button";
import { CirclePlus, Scan, LockKeyhole } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import QRCode from "react-qr-code";

// react router
import { Link } from "react-router-dom";
// import QrCodeDisplay from "@/components/qrDisplay/qrCodeDisplay";

export default function UserHomePage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-2 absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <WelcomePage user="Abdiza Dev" />
      <div className="w-9/12 sm:w-8/12 md:w-7/12 lg:w-6/12 flex flex-col items-center justify-center space-y-2">
        <div className="w-10/12 h-10/12 md:space-x-[4%]">
          <Link to="/verify-user">
            <Button
              className="w-full sm:w-full md:w-[48%] mb-2 sm:mb-2 md:mb-0 lg:mb-0"
              variant="outline"
            >
              Verify with Code &nbsp;&nbsp;
              <div>
                <LockKeyhole size={18} />
              </div>
            </Button>
          </Link>
          <Link to="/verify-user">
            <Button className="w-full sm:w-full md:w-[48%]" variant="outline">
              Add Items &nbsp;&nbsp;
              <div>
                <CirclePlus size={18} />
              </div>
            </Button>
          </Link>
        </div>
      </div>

      <Drawer>
        <DrawerTrigger className="w-9/12 sm:w-8/12 md:w-7/12 lg:w-6/12">
          <Button className="w-10/12">
            Show QR Code &nbsp;&nbsp;
            <div>
              <Scan size={18} />
            </div>
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Scan for More Info!</DrawerTitle>
            <DrawerDescription>
              Scan this QR code to access additional information.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex justify-center">
            <QRCode
              size={256}
              value="Abdisa Dev"
              viewBox={`0 0 256 256`}
              className="w-9/12 "
            />
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button className="w-full">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
