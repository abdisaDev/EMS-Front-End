import { useEffect, useState } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Quote } from "lucide-react";

// axios
import axios from "axios";

type dailyQuote = {
  author: string;
  text: string;
};

export default function WelcomePage(props: { user: string }) {
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
    <Card className="flex-col h-2/12 shadow-none w-10/12 sm:w-8/12 md:w-7/12 lg:w-6/12">
      <CardHeader className="justify-center space-y-2">
        <CardTitle className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl bg-gradient-to-r from-sky-900 to-blue-900 bg-clip-text text-transparent text-transparent bg-clip-text">
          Hello, {props.user}
        </CardTitle>
        <Separator />
        <div className="flex flex-col items-end">
          <CardDescription className="text-bold flex">
            <Quote size={12} /> &nbsp; {text}
          </CardDescription>
          <CardDescription>---&nbsp; {author.split(",")[0]}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
