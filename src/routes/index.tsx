import RegistrationForm from "@/components/registrationForm/RegistrationForm";
import LoginForm from "@/components/loginForm/loginForm";
import LandingPage from "@/components/landingPage";
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
