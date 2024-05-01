import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import { Profile } from "pages/user/Profile.jsx";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import NavBar from "src/components/navs/NavBar";
import { APISpot, addAuthWithToken } from "src/api";
import { getOfStorage } from "src/utils/localStorage";
import OrderDetail from "../user/OrderDetail";
import { useEffect, useState } from "react";
import { loadUserData } from "src/utils/loadUserData";
import { actionsAuth } from "src/redux/reducers";
import { useDebouncedCallback } from "use-debounce";

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

      if (web_role === Number(import.meta.env.VITE_USER_ROLE)) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    }
  }, [100]);

  useEffect(() => {
    loadUser();
  }, [document]);

  if (isUser) {
    return (
      <Layout>
        <NavBar />
        <Outlet />
      </Layout>
    );
  }

  if (isUser === false) {
    return <DefaultError />;
  }
}
