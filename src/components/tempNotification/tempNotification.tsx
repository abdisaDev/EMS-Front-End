import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function TempNotification(props: {
  value: string;
  className?: string;
  title: string;
  description: string;
  type: 'submit' | 'button' | 'reset';
  disabled: boolean;
  status: boolean;
}) {
  const toastHandler = () => {
    if (props.status) {
      return toast.success(props.title, {
        description: props.description,
        action: {
          label: 'Close',
          onClick: () => {},
        },
      });
    }
    return toast.error(props.title, {
      description: props.description,
      action: {
        label: 'Close',
        onClick: () => {},
      },
    });
  };
  return (
    <div>
      <Button
        onClick={toastHandler}
        className={props.className}
        disabled={props.disabled}
      >
        {props.value}
      </Button>
    </div>
  );
}
