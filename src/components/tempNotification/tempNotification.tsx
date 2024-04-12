import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";

export default function TempNotification(props: {
  value: string;
  type: "submit" | "reset" | "button";
  className: string;
}) {
  const toastHandler = () => {
    return toast.error("Server hiccup!", {
      description: "Hold tight, we'll be back soon.",
      action: {
        label: "Close",
        onClick: () => {},
      },
    });
  };
  return (
    <div>
      <Toaster position="bottom-left" richColors />
      <Button
        onClick={toastHandler}
        type={props.type}
        className={props.className}
      >
        {props.value}
      </Button>
    </div>
  );
}
