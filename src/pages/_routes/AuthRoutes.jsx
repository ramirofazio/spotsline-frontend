import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import { Profile } from "pages/user/Profile.jsx";
import Layout from "../Layout";
import { useSelector } from "react-redux";
import NavBar from "src/components/navs/NavBar";
import { APISpot } from "src/api";

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
        index: true,
        loader: async () => {
          try {
            return await APISpot.user.getProfile();
          } catch (e) {
            console.log(e.message);
            return null;
          }
        },
      },
    ],
  },
];

export function AuthRoot() {
  const { access_token } = useSelector((state) => state.auth);
  const { email, id } = useSelector((state) => state.user);

  if (!access_token && !email && !id) {
    return <DefaultError />;
  }

  return <Outlet />;
}
