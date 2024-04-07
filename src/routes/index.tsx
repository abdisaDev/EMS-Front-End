import RegistrationForm from "@/pages/registrationFormPage/RegistrationForm";
import LoginForm from "@/pages/loginFormPage/loginForm";
import LandingPage from "@/pages/landingPage";
import QrCodeReader from "@/components/qrCodeReader/qrCodeReader";
import SecurityGuardHomePage from "@/pages/securityGuardHomePage";

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
];
