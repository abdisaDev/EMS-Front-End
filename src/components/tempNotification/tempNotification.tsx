import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";

export default function TempNotification(props: {
  value: string;
  className: string;
  title: string;
  description: string;
}) {
  const toastHandler = () => {
    return toast.error(props.title, {
      description: props.description,
      action: {
        label: "Close",
        onClick: () => {},
      },
    });
  };
  return (
    <div>
      <Toaster position="bottom-left" richColors />
      <Button onClick={toastHandler} className={props.className}>
        {props.value}
      </Button>
    </div>
  );
}
