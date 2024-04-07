import RegistrationForm from "@/pages/registrationForm/RegistrationForm";
import LoginForm from "@/pages/loginForm/loginForm";
import LandingPage from "@/pages/landingPage";
import QrCodeReader from "@/components/qrCodeReader/qrCodeReader";

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
  { path: "/home", element: <QrCodeReader /> },
];
