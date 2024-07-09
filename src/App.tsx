import { routes } from './routes';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import ErrorPage from './pages/errorPage/errorPage';
import { useEffect, useState } from 'react';
import { store } from './app/store';

function App() {
  console.log('rendered');
  const [, setIsPathChange] = useState<boolean>(false);
  const router = createBrowserRouter(routes);

  store.subscribe(() => {
    const { pathChanged } = store.getState().pathChecker;
    setIsPathChange(pathChanged);
  });

  useEffect(() => {
    const handleOnline = () => {
      toast.success('Back To Online');
      return toast.dismiss();
    };
    const handleOffline = () =>
      toast.error("You're Offline", { duration: Infinity });

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme='light' storageKey='ems-ui-theme'>
      <RouterProvider router={router} fallbackElement={<ErrorPage />} />
      <Toaster position='bottom-left' richColors />
    </ThemeProvider>
  );
}

export default App;
