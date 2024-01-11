import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainView from "./components/views/main-view";
import ErrorPage from "./components/views/error-page";
import DesignCreateView from "./components/views/design-create-view";
import Footer from "./components/footer";
import MyDesignsView from "./components/views/my-designs-view";
import { useStore } from "./lib/store";
import { useToast } from "./components/ui/use-toast";
import { useEffect } from "react";
import { getAuthenticatedUserToken, isTokenExpired, removeAuthenticatedUserToken } from "./lib/auth";
import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create-design",
    element: <DesignCreateView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/my-designs",
    element: <MyDesignsView/>,
    errorElement: <ErrorPage />,
  }
]);

function App() {
  const clearUser = useStore((state) => state.clearUser);
  const { toast } = useToast();

  useEffect(() => {
    const token = getAuthenticatedUserToken();
    if (token) {
      const isExpired = isTokenExpired(token);
      if (isExpired) {
        removeAuthenticatedUserToken();
        clearUser();
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Your session has expired. Please login again.",
        });
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <RouterProvider router={router} />
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
