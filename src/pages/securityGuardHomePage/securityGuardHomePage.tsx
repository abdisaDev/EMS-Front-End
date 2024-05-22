import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserRoundPlus, Scan, LockKeyhole } from "lucide-react";

// react router
import { Link } from "react-router-dom";
import WelcomePage from "@/components/welcomePage/welcomePage";

export default function SecurityGuardHomePage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-2 absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <WelcomePage user={"Abdisa"} />
      <div className="w-9/12 sm:w-8/12 md:w-7/12 lg:w-6/12 flex flex-col items-center justify-center space-y-2">
        <div className="w-10/12 md:space-x-[4%]">
          <Link to="/verify-user">
            <Button className="w-full sm:w-full md:w-[48%]" variant="outline">
              Scan QR Code &nbsp;&nbsp;
              <div>
                <Scan size={18} />
              </div>
            </Button>
          </Link>
          <Link to="/verify-user">
            <Button className="w-full sm:w-full md:w-[48%]" variant="outline">
              Security Code &nbsp;&nbsp;
              <div>
                <LockKeyhole size={18} />
              </div>
            </Button>
          </Link>
        </div>
        <div className="w-10/12">
          <Link to="/register">
            <Button className="w-full">
              Register New User &nbsp;&nbsp;{" "}
              <div>
                <UserRoundPlus size={18} />
              </div>
            </Button>
          </Link>
        </div>
      </div>

      <CardFooter></CardFooter>
    </div>
  );
}
