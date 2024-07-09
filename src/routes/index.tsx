import RegistrationForm from '@/pages/registrationFormPage/RegistrationForm';
import LoginForm from '@/pages/loginFormPage/loginForm';
import LandingPage from '@/pages/landingPage';
import QrCodeReader from '@/components/qrCodeReader/qrCodeReader';
import SecurityGuardHomePage from '@/pages/securityGuardHomePage/securityGuardHomePage';
import UserHomePage from '@/pages/userHomePage/userHomePage';
import ErrorPage from '@/pages/errorPage/errorPage';

export const defaultRoutes = (role?: string | null) => {
  console.log(role);

  return [
    { path: '/', element: <LandingPage /> },
    {
      path: '/login',
      element: <LoginForm />,
    },
    {
      path: '/register',
      element:
        role === 'security_guard' || role === 'admin' ? (
          <RegistrationForm />
        ) : (
          <ErrorPage />
        ),
    },
    {
      path: '/verify-user',
      element:
        localStorage.getItem('access_token') && role === 'security_guard' ? (
          <QrCodeReader />
        ) : (
          <ErrorPage />
        ),
    },
    {
      path: '/home',
      element:
        role === 'security_guard' ? (
          <SecurityGuardHomePage />
        ) : role === 'user' ? (
          <UserHomePage />
        ) : role === 'admin' || // until the admins home page done
          !localStorage.getItem('access_token') ? (
          <ErrorPage />
        ) : (
          <>dsasa</>
        ),
    },
    { path: '*', element: <ErrorPage /> },
  ];
};
