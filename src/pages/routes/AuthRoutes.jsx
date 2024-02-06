import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import { Profile } from "pages/user/Profile.jsx";
import Layout from "../Layout";

export const authRoutesPaths = [
  {
    path: "/",
    errorElement: <DefaultError />,
    element: (
      <Layout>
        <AuthRoot />
      </Layout>
    ),

    children: [
      {
        path: "/user/profile",
        children: [
          {
            path: "/user/profile/:userId",
            element: <Profile />,
            index: true,
          },
        ],
      },
    ],
  },
];

export function AuthRoot() {
  return <Outlet />;
}
