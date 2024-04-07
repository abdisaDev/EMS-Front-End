import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
export default function HeroSection() {
  return (
    <div className="absolute inset-0 h-full w-full bg-[#f7f7f7] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="flex items-center justify-center h-full flex-col space-y-5">
        <p className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black relative text-zinc-900 text-center">
          Entrance Managment System
        </p>
        <p className="font-medium relative text-zinc-500 w-10/12 sm:w-6/12 md:w-6/12 lg:w-5/12 text-center text-2lg sm:text-4lg md:text-6lg lg:text-7lg">
          Streamline entry and boost security with our web-based entrance
          management system. Manage access, track visitors, and gain valuable
          insights - all from a user-friendly web app.
        </p>
        <div className="">
          <Link to="/login">
            <Button variant="outline" size="lg">
              Get Started &nbsp;
              <LogIn size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
