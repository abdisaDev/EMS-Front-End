import { routes } from './routes';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import ErrorPage from './pages/errorPage/errorPage';

const networkStatusHandler = (status: boolean) => {
  if (status) {
    toast.success('Back To Online');
    toast.dismiss();
    window.addEventListener('offline', () => networkStatusHandler(false));
  } else {
    toast.error("You're Offline", { duration: Infinity });
  }
};
function App() {
  const router = createBrowserRouter(routes);

  window.addEventListener('online', () => networkStatusHandler(true));
  window.removeEventListener('offline', () => networkStatusHandler(false));

  return (
    <ThemeProvider defaultTheme='light' storageKey='ems-ui-theme'>
      <RouterProvider router={router} fallbackElement={<ErrorPage />} />
      <Toaster position='bottom-left' richColors />
    </ThemeProvider>
  );
}

export default App;
