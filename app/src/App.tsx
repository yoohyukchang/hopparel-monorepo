import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainView from "./views/main-view";
import ErrorPage from "./views/error-page";
import DesignCreateView from "./views/design-create-view";
import Footer from "./components/footer";

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
  }
]);

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
