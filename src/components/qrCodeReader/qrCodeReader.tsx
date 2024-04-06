import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function QrCodeReader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>QR Code - Scan for details</CardTitle>
          <CardDescription>
            Use your phone's camera to read the code.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <div className="blue-tile bg-slate-200 rounded-2xl py-24 w-full md:min-h-max md:w-4/5 flex justify-center text-center border-slate-300 border-4">
            <p className="font-bold">QR Code Scanner</p>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-center w-full ">
            <p className="animate-bounce animate-infinite">Scanning . . .</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
