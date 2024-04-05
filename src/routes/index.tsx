import RegistrationForm from "@/components/registrationForm/RegistrationForm";
import LoginForm from "@/components/loginForm/loginForm";

export const routes = [
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegistrationForm />,
  },
];
