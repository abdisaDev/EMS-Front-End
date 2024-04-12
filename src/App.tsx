import { routes } from "./routes";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter(routes);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ems-ui-theme">
      <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </ThemeProvider>
  );
}

export default App;
