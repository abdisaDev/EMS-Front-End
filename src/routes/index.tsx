import RegistrationForm from "@/pages/registrationFormPage/RegistrationForm";
import LoginForm from "@/pages/loginFormPage/loginForm";
import LandingPage from "@/pages/landingPage";
import QrCodeReader from "@/components/qrCodeReader/qrCodeReader";
import SecurityGuardHomePage from "@/pages/securityGuardHomePage/securityGuardHomePage";
import QrCodeDisplay from "@/components/qrDisplay/qrCodeDisplay";
import UserHomePage from "@/pages/userHomePage/userHomePage";

export const routes = [
  { path: "/", element: <LandingPage /> },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegistrationForm />,
  },
  { path: "/verify-user", element: <QrCodeReader /> },
  { path: "/home", element: <SecurityGuardHomePage /> },
  { path: "/user-home", element: <UserHomePage /> },
  { path: "/show-qr", element: <QrCodeDisplay /> },
];
