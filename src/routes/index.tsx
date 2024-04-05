import RegistrationForm from "@/components/registrationForm/RegistrationForm";
import LoginForm from "@/components/loginForm/loginForm";
import LandingPage from "@/components/landingPage";

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
];
