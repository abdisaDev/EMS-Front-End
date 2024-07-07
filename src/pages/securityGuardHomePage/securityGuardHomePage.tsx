import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserRoundPlus, Scan, LockKeyhole, LogOutIcon } from "lucide-react";

// react router
import { Link, useNavigate } from "react-router-dom";
import WelcomePage from "@/components/welcomePage/welcomePage";
import ItemRegistration from "@/components/itemRegistraion/ItemRegistration";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SecurityGuardHomePage() {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  const fetchUsers = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_ADDRESS}/users`)
      .then((response) => {
        const userData = response.data.map(
          (user: (typeof response.data)[0]) => {
            const { first_name, last_name, phone_number, id, role } = user;
            return { id, first_name, last_name, phone_number, role };
          }
        );
        setAllUsers(userData);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-2 absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <WelcomePage user={localStorage.getItem("name")!} />
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
          <ItemRegistration
            dialogTriggerButton={
              <Button className="w-full">
                Add Items &nbsp;&nbsp;
                <div>
                  <CirclePlus size={18} />
                </div>
              </Button>
            }
            allUsers={allUsers}
          />
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
        <div className="w-10/12">
          <Button
            className="w-full"
            variant="destructive"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout &nbsp;&nbsp;
            <div>
              <LogOutIcon size={18} />
            </div>
          </Button>
        </div>
      </div>

      <CardFooter></CardFooter>
    </div>
  );
}
