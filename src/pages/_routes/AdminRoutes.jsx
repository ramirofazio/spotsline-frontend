import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import Layout from "../Layout";
import { useSelector } from "react-redux";
import Dashboard from "../dashboard/Dashboard";

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
        path: "/dashboard",
        element: <Dashboard />,
        index: true,
      },
    ],
  },
];

export function AdminRoot() {
  const { access_token } = useSelector((state) => state.auth);
  const { email, id, web_role } = useSelector((state) => state.user);

  if (!access_token && !email && !id && web_role !== import.meta.env.VITE_ADMIN_ROLE) {
    return <DefaultError />;
  }
  return <Outlet />;
}
