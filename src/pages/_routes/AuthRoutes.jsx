import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import { Profile } from "pages/user/Profile.jsx";
import Layout from "../Layout";
import { useSelector } from "react-redux";
import NavBar from "src/components/navs/NavBar";
import { APISpot } from "src/api";
import { getOfStorage } from "src/utils/localStorage";
import OrderDetail from "../user/OrderDetail";

export const authRoutesPaths = [
  {
    path: "/",
    errorElement: <DefaultError />,
    element: (
      <Layout>
        <NavBar />
        <AuthRoot />
      </Layout>
    ),

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

export function AuthRoot() {
  const { access_token } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const validate = () => {
    const localAccess_token = getOfStorage("access_token");
    if (localAccess_token === access_token) {
      //? el token es valido, sigo
      const localUser = getOfStorage("user");
      if (localUser === user) {
        //? es valido, sigo. Ambos existen asi que esta logged
        return true;
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
