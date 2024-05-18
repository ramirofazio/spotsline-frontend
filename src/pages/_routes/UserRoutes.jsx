import { lazy, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import { APISpot, addAuthWithToken } from "src/api";
import { getOfStorage } from "src/utils/localStorage";
import { loadUserData } from "src/utils/loadUserData";
import { actionsAuth } from "src/redux/reducers";
import { useDebouncedCallback } from "use-debounce";
const CurrentAccount = lazy(() => import("../user/CurrentAccount"));
const NavBar = lazy(() => import("components/navs/NavBar.jsx"));
const Profile = lazy(() => import("pages/user/Profile").then((module) => ({ default: module.Profile })));
const OrderDetail = lazy(() => import("pages/user/OrderDetail").then((module) => ({ default: module.default })));
const ShoppingCart = lazy(() => import("pages/shoppingCart/ShoppingCart.jsx"));

export const userRoutesPaths = [
  {
    path: "/",
    errorElement: <DefaultError />,
    element: (
      <Layout>
        <NavBar />
        <UserRoot />
      </Layout>
    ),

    children: [
      {
        path: "/user/profile",
        element: <Profile />,
        loader: async () => {
          try {
            const userData = await APISpot.user.getProfile();
            const userOrders = await APISpot.user.getOrders();
            const userCA = await APISpot.user.getCurrentAccounts();
            return { userData, userOrders, userCA };
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
            await APISpot.user.getOrder(params.order_id);
          } catch (e) {
            console.log(e);
            return null;
          }
        },
      },

      {
        path: "/user/profile/cc",
        element: <CurrentAccount redirect={true} />,
        loader: async () => {
          try {
            const userCA = await APISpot.user.getCurrentAccounts();
            return { userCA };
          } catch (e) {
            console.log(e);
            return null;
          }
        },
      },

      { path: "/carrito", element: <ShoppingCart /> },
    ],
  },
];

export function UserRoot() {
  const dispatch = useDispatch();
  const [isUser, setIsUser] = useState(null);

  const loadUser = useDebouncedCallback(async () => {
    const user = getOfStorage("user");
    const access_token = getOfStorage("access_token");

    if (access_token && user) {
      //? El usuario ya estaba loggeado
      addAuthWithToken(access_token);
      dispatch(actionsAuth.setAccessToken(access_token));

      const { web_role } = await loadUserData(dispatch, access_token, user.email);

      if (
        web_role === Number(import.meta.env.VITE_USER_ROLE) ||
        web_role === Number(import.meta.env.VITE_SELLER_ROLE)
      ) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    }
  }, [100]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadUser();
  }, [document]);

  if (isUser) {
    return (
      <main className="overflow-hidden">
        <Outlet />
      </main>
    );
  }

  if (isUser === false) {
    return <DefaultError />;
  }
}
