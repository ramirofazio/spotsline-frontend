import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import Layout from "../Layout";
import { useSelector } from "react-redux";

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
  //? Aca deberia hacer una logica parecida pero teniendo en cuenta el rol del usuario, para ver si es ADMIN / SELLER o que
  const { access_token } = useSelector((state) => state.auth);
  const { email, id } = useSelector((state) => state.user);

  if (!access_token && !email && !id) {
    return <DefaultError />;
  }
  return <Outlet />;
}
