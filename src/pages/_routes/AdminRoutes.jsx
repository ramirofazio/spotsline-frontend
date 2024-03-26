import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import Layout from "../Layout";
import { useSelector } from "react-redux";
import Dashboard from "../dashboard/Dashboard";
import { getOfStorage } from "src/utils/localStorage";

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
  const { web_role } = useSelector((state) => state.user);

  const validate = () => {
    const localAccess_token = getOfStorage("access_token");
    if (localAccess_token === access_token) {
      //? el token es valido, sigo
      const localWeb_role = getOfStorage("user").web_role;
      if (localWeb_role === web_role) {
        //? es valido, sigo. Ambos existen asi que esta logged. Hay que validar el rol

        if (web_role === import.meta.env.VITE_ADMIN_ROLE) {
          //? Cumplio todas las condiciones asi que es ADMIN
          return true;
        }
      }
    }

    //? No cumplio las condiciones
    return false;
  };

  if (validate()) {
    return <DefaultError />;
  }


  return <Outlet />;
}
