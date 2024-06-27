import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <Alert variant="destructive" className="w-[90%] sm:w-[90%] md:w-[50%]">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          This error come because of many resons. <br />
          <ul>
            <li>
              &emsp;* &nbsp; You have to login first inorder to use this app.
            </li>
            <li>
              &emsp;* &nbsp; Registraion page is only available for security
              guards.
            </li>
            <li>
              &emsp;* &nbsp; This page{" "}
              <code>
                {
                  window.location.href.split("/")[
                    window.location.href.split("/").length - 1
                  ]
                }
              </code>
              &nbsp; isn't available on this app.
            </li>
          </ul>
        </AlertDescription>
      </Alert>
      <Link to="/login" className="my-2">
        <Button variant="link" size="sm" className="text-sky-500 underline">
          Back to Login Page
        </Button>
      </Link>
    </div>
  );
}
