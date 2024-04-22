import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import { Profile } from "pages/user/Profile.jsx";
import Layout from "../Layout";
import { useSelector } from "react-redux";
import NavBar from "src/components/navs/NavBar";
import { APISpot } from "src/api";
import { getOfStorage } from "src/utils/localStorage";
import OrderDetail from "../user/OrderDetail";

export const userRoutesPaths = [
  {
    path: "/",
    errorElement: <DefaultError />,
    element: <UserRoot />,

    children: [
      {
        path: "/user/profile",
        element: <Profile />,
        loader: async () => {
          try {
            const userData = await APISpot.user.getProfile();
            const userOrders = await APISpot.user.getOrders(Number(getOfStorage("user").id));
            return { userData, userOrders };
          } catch (e) {
            console.log(e);
            return null;
          }
        },
      },
      {
        path: "/user/profile/:order_id",
        element: <OrderDetail />,
        loader: async ({ params }) => {
          try {
            return await APISpot.user.getOrder(params.order_id);
          } catch (e) {
            console.log(e);
            return null;
          }
        },
      },
    ],
  },
];

export function UserRoot() {
  const { access_token } = useSelector((state) => state.auth);
  const { web_role } = useSelector((state) => state.user);

  const validate = () => {
    const localAccess_token = getOfStorage("access_token");
    if (localAccess_token === access_token) {
      //? el token es valido, sigo
      const localWeb_role = getOfStorage("user").web_role;
      if (localWeb_role === web_role) {
        //? es valido, sigo. Ambos existen asi que esta logged. Hay que validar el rol
        if (web_role === Number(import.meta.env.VITE_USER_ROLE)) {
          //? Cumplio todas las condiciones asi que es USER
          return true;
        }
      }
    }

    //? No cumplio las condiciones
    return false;
  };

  if (validate()) {
    return (
      <Layout>
        <NavBar />
        <Outlet />
      </Layout>
    );
  }

  return <DefaultError />;
}
