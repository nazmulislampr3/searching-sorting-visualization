import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sorting from "./components/Sorting/index.tsx";
import Searching from "./components/Searching/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/sorting/bubble",
        element: <Sorting type="bubble" />,
      },
      {
        path: "/sorting/insertion",
        element: <Sorting type="insertion" />,
      },
      {
        path: "/sorting/selection",
        element: <Sorting type="selection" />,
      },
      //
      {
        path: "/searching/linear",
        element: <Searching type="linear" />,
      },
      {
        path: "/searching/binary",
        element: <Searching type="binary" />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
