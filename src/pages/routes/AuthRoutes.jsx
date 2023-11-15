import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import { Profile } from "pages/user/Profile.jsx";

export const authRoutesPaths = [
  {
    path: "/",
    errorElement: <DefaultError />,
    element: <AuthRoot />,
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
