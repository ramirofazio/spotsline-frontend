import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";

export const adminRoutesPaths = [
  {
    path: "/",
    errorElement: <DefaultError />,
    element: <AdminRoot />,
    children: [
      {
        path: "/admin",
        children: [
          {
            path: "/admin/dashboard",
            element: <h1>Dashboard</h1>,
            index: true,
          },
        ],
      },
    ],
  },
];

export function AdminRoot() {
  return <Outlet />;
}
