import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import Layout from "../Layout";

export const adminRoutesPaths = [
  {
    path: "/",
    errorElement: <DefaultError />,
    element: (
      <Layout>
        <AdminRoot />
      </Layout>
    ),
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
