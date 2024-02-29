import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { publicRoutesPaths, authRoutesPaths, adminRoutesPaths } from "./index";
import { getOfStorage } from "src/utils/localStorage";
import { setAccessToken } from "src/redux/reducers/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addAuthWithToken, APISpot } from "src/api";
import { setUser } from "src/redux/reducers/user";
import { FirstSignInModal } from "../signIn";

export function Routes() {
  const dispatch = useDispatch();

  const getUserFromDb = async (access_token, email) => {
    const { data } = await APISpot.auth.jwtAutoSignIn({ jwt: access_token, email });

    if (data.user) {
      dispatch(setUser(data.user));
    }
  };

  useEffect(() => {
    const access_token = getOfStorage("access_token");
    const user = getOfStorage("user");

    if (access_token && user) {
      addAuthWithToken(access_token);
      dispatch(setAccessToken(access_token));
      getUserFromDb(access_token, user.email);
    }
  }, [document]);

  const router = createBrowserRouter([...publicRoutesPaths, ...authRoutesPaths, ...adminRoutesPaths]);

  return (
    <>
      {/* //? Para mostrar el modal en todos lados */}
      <FirstSignInModal />
      <RouterProvider router={router} />;
    </>
  );
}
