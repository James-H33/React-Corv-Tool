import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/login/Login";
import { viewsReoutes } from "./views/views-routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

      ...viewsReoutes,

      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);
