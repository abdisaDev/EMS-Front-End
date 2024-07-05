import { routes } from './routes';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import ErrorPage from './pages/errorPage/errorPage';

function App() {
  const router = createBrowserRouter(routes);
  const toastHandler = (title: string, status: boolean) => {
    return status ? toast.success(title) : toast.error(title);
  };
  window.addEventListener('online', () => {
    toastHandler('Back To Online', true);
  });

  window.addEventListener('offline', () => {
    toastHandler("You're Offline", false);
  });

  return (
    <ThemeProvider defaultTheme='light' storageKey='ems-ui-theme'>
      <RouterProvider router={router} fallbackElement={<ErrorPage />} />
      <Toaster position='bottom-left' richColors />
    </ThemeProvider>
  );
}

export default App;
