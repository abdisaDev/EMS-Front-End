import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserRoundPlus, Scan, LockKeyhole } from "lucide-react";

// axios
import axios from "axios";
import { useEffect, useState } from "react";

// react router
import { Link } from "react-router-dom";

type dailyQuote = {
  author: string;
  text: string;
};

export default function SecurityGuardHomePage() {
  const [dailyQuote, setDailyQuote] = useState<dailyQuote>({
    author: "Abdisa Dev",
    text: "Small steps, big journeys.",
  });
  const [allQuotes, setAllquotes] = useState([]);
  const [quoteCounter, setQuoteCounter] = useState(0);

  const fetchDailyQuote = async () => {
    await axios.get("https://type.fit/api/quotes").then((response) => {
      setAllquotes(response.data);
    });
  };

  useEffect(() => {
    fetchDailyQuote();
  }, []);

  useEffect(() => {
    const min: number = 60000;
    const interval = setInterval(() => {
      setDailyQuote(allQuotes[quoteCounter]);
      setQuoteCounter((prev: number) => {
        if (quoteCounter < allQuotes.length - 1) {
          return ++prev;
        } else {
          return 0;
        }
      });
    }, min);
    return () => clearInterval(interval);
  }, [allQuotes, quoteCounter]);

  const { text, author } = dailyQuote;

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-2 absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <Card className="flex-col h-2/12 shadow-none w-10/12 sm:w-8/12 md:w-7/12 lg:w-6/12">
        <CardHeader className="justify-center space-y-2">
          <CardTitle className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl bg-gradient-to-r from-slate-800 to-sky-500 text-transparent bg-clip-text">
            Hello, Abdisa
          </CardTitle>
          <Separator />
          <div className="flex flex-col items-end">
            <CardDescription className="text-bold">"{text}"</CardDescription>
            <CardDescription> {`--- ${author.split(",")[0]}`}</CardDescription>
          </div>
        </CardHeader>
      </Card>

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
