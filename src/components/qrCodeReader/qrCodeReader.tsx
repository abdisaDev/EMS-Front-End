import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// @ts-expect-error -> the below package didn't have any declarations
import QrReader from 'modern-react-qr-reader';

import QrReaderBox from '@/assets/images/qrReaderBox.png';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';
import axios from 'axios';
import { toast as sonnerToast } from 'sonner';

enum Category {
  DEFAULT = '',
  CAR = 'car',
  COMPUTER = 'computer',
}
interface qrResponseType {
  id: string;
  first_name: string;
  last_name: string;
  items: {
    model: string;
    serial_number: string;
    color: string;
    category: Category;
    description: string;
  }[];
}
export default function QrCodeReader() {
  const [qrResponse, setQrResponse] = useState<qrResponseType>();

  const handleScanQrCode = (response: string) => {
    if (response) {
      sonnerToast.success(`QR Read Successfully!`, {
        description: 'Check the detail inforamation before admitting.',
        action: {
          label: 'Close',
          onClick: () => {},
        },
      });
      setQrResponse(JSON.parse(response));
    }
    console.log(response);
    console.log(qrResponse);
  };

  return (
    <div className='flex justify-center items-center h-screen absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'>
      <Card>
        <CardHeader>
          <div className='relative'>
            {!qrResponse ? (
              <QrReader
                delay={500}
                className='rounded-2xl border-8 border-slate-400 '
                constraints={{
                  audio: false,
                  video: { facingMode: 'environment' },
                }}
                onScan={handleScanQrCode}
                onError={handleScanQrCode}
              />
            ) : (
              <Alert>
                <AlertTitle>
                  {`${qrResponse.first_name} ${qrResponse.last_name}'s Item Lists`}{' '}
                </AlertTitle>
                {qrResponse.items.map((item) => {
                  return (
                    <AlertDescription className='flex flex-col gap-2 '>
                      <div className='flex justify-around border py-[10px] rounded-lg'>
                        <div>Model</div>
                        <MoveRight />
                        <div>{item.model}</div>
                      </div>
                      <div className='flex justify-around border py-[10px] rounded-lg'>
                        <div>Serial Number</div>
                        <MoveRight />
                        <div>{item.serial_number}</div>
                      </div>
                      <div className='flex justify-around border py-[10px] rounded-lg'>
                        <div>Color</div>
                        <MoveRight />
                        <div>{item.color}</div>
                      </div>
                      <div className='flex justify-around border py-[10px] rounded-lg'>
                        <div>Category</div>
                        <MoveRight />
                        <div>{item.category}</div>
                      </div>
                      <div className='flex justify-around border py-[10px] rounded-lg'>
                        <div>Description</div>
                        <MoveRight />
                        <div>{item.description}</div>
                      </div>
                    </AlertDescription>
                  );
                })}
              </Alert>
            )}
            {!qrResponse && (
              <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                <img
                  src={QrReaderBox}
                  alt='Qr Reader Box'
                  className='animate-pulse animate-infinite animate-ease-in'
                />
              </div>
            )}
          </div>
        </CardHeader>

        <Card className='shadow-sm border-2 rounded-t-xl border-slate-400'>
          <CardFooter className='flex flex-col space-y-4 pt-4'>
            <div>
              <CardTitle>Analyzing QR code.</CardTitle>
              <CardDescription>
                Decoding QR code. Please hold your device steady.
              </CardDescription>
            </div>
            <div className='flex justify-end w-full space-x-2'>
              <div className='flex justify-center items-center w-full '>
                <p
                  className={`${
                    !qrResponse &&
                    'animate-bounce animate-infinite animate-ease-in animate-ease-out'
                  }`}
                >
                  {qrResponse ? (
                    <Badge className='bg-green-500'>Scanned!</Badge>
                  ) : (
                    <Badge>Scanning . . .</Badge>
                  )}
                </p>
              </div>
              <Link to='/home'>
                <Button variant='destructive' size='sm' className='px-4'>
                  Cancel
                </Button>
              </Link>
              <Button
                size='sm'
                className='px-6'
                disabled={!qrResponse}
                onClick={() => {
                  const { id, ...rest } = qrResponse!;
                  const payload = rest.items.map((item) => {
                    return item;
                  });
                  axios
                    .post(
                      `${
                        import.meta.env.VITE_API_ADDRESS
                      }/user/${id}/verify-items`,
                      payload
                    )
                    .then(async (response) => {
                      const { status, message } = await response.data;
                      if (status) {
                        sonnerToast.success(message);
                        setQrResponse(undefined);
                      } else {
                        sonnerToast.error(message);
                        setQrResponse(undefined);
                      }
                    });
                }}
              >
                Verify
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
