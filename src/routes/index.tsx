import RegistrationForm from '@/pages/registrationFormPage/RegistrationForm';
import LoginForm from '@/pages/loginFormPage/loginForm';
import LandingPage from '@/pages/landingPage';
import QrCodeReader from '@/components/qrCodeReader/qrCodeReader';
import SecurityGuardHomePage from '@/pages/securityGuardHomePage/securityGuardHomePage';
import QrCodeDisplay from '@/components/qrDisplay/qrCodeDisplay';
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
      localStorage.getItem('access_token') ||
      (localStorage.getItem('role') === 'security_guard' && <QrCodeReader />),
  },
  {
    path: '/home',
    element:
      localStorage.getItem('role') === 'security_guard' ? (
        <SecurityGuardHomePage />
      ) : localStorage.getItem('role') === 'user' ? (
        <UserHomePage />
      ) : (
        <ErrorPage />
      ),
  },

  {
    path: '/show-qr',
    element:
      localStorage.getItem('access_token') ||
      (localStorage.getItem('role') === 'security_guard' && <QrCodeDisplay />),
  },
  { path: '*', element: <ErrorPage /> },
];
