import { LoginForm } from "./components/loginForm/loginForm";
import RegistrationForm from "./components/registrationForm/RegistrationForm";
import { ThemeProvider } from "@/components/theme/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ems-ui-theme">
      <div className="flex justify-center">
        <LoginForm />
        {/* <RegistrationForm /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
