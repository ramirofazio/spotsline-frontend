import { lazy, Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import { APISpot, addAuthWithToken } from "src/api";
import { getOfStorage } from "src/utils/localStorage";
import { loadUserData } from "src/utils/loadUserData";
import { actionsAuth } from "src/redux/reducers";
import { useDebouncedCallback } from "use-debounce";
import Footer from "src/components/navs/Footer";
import Spinner from "src/components/Spinner";
import Success from "../success/Success";
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
        <Footer />
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
        path: "/user/profile/:order_id/:user_id",
        element: <OrderDetail />,
        loader: async ({ params }) => {
          try {
            const { order_id, user_id } = params;
            const order = await APISpot.user.getOrder({ order_id, user_id });
            return order;
          } catch (e) {
            console.log(e);
            return null;
          }
        },
      },

      {
        path: "/user/profile/cc",
        element: <CurrentAccount />,
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
      { path: "/success", element: <Success /> },
    ],
  },
];

export function UserRoot() {
  const dispatch = useDispatch();
  const [isUser, setIsUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useDebouncedCallback(async () => {
    setLoading(true);
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

      setLoading(false);
    }
  }, [100]);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden">
      {loading && <Spinner className={"bg-none"} />}
      {isUser ? <Outlet /> : <DefaultError />}
    </main>
  );
}
