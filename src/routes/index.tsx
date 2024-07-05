import RegistrationForm from '@/pages/registrationFormPage/RegistrationForm';
import LoginForm from '@/pages/loginFormPage/loginForm';
import LandingPage from '@/pages/landingPage';
import QrCodeReader from '@/components/qrCodeReader/qrCodeReader';
import SecurityGuardHomePage from '@/pages/securityGuardHomePage/securityGuardHomePage';
import UserHomePage from '@/pages/userHomePage/userHomePage';
import ErrorPage from '@/pages/errorPage/errorPage';

export const routes = [
  { path: '/', element: <LandingPage /> },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/register',
    element:
      localStorage.getItem('role') === 'security_guard' ||
      localStorage.getItem('role') === 'admin' ? (
        <RegistrationForm />
      ) : (
        <ErrorPage />
      ),
  },
  {
    path: '/verify-user',
    element:
      localStorage.getItem('access_token') &&
      localStorage.getItem('role') === 'security_guard' ? (
        <QrCodeReader />
      ) : (
        <ErrorPage />
      ),
  },
  {
    path: '/home',
    element:
      localStorage.getItem('role') === 'security_guard' ? (
        <SecurityGuardHomePage />
      ) : localStorage.getItem('role') === 'user' ? (
        <UserHomePage />
      ) : localStorage.getItem('role') === 'admin' ||
        !localStorage.getItem('access_token') ? (
        <ErrorPage />
      ) : (
        <></>
      ),
  },
  { path: '*', element: <ErrorPage /> },
];
