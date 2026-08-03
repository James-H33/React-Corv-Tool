import { Navigate } from "react-router-dom";
import Views from "./Views";

export const viewsReoutes = [
  {
    path: "/v",
    element: <Views />,
    children: [
      {
        index: true,
        element: <Navigate to="cars" replace />,
      },
      {
        path: "cars",
        element: <div>Cars View</div>,
      },
    ],
  },
];
