import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainView from "./components/views/main-view";
import ErrorPage from "./components/views/error-page";
import DesignCreateView from "./components/views/design-create-view";
import Footer from "./components/footer";
import MyDesignsView from "./components/views/my-designs-view";

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
  return (
    <div className="flex flex-col min-h-screen">
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
