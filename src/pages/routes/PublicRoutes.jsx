import { DefaultError } from "pages/error/DefaultError";
import { Landing } from "pages/landing/Landing";
import { AboutUs } from "pages/aboutUs/AboutUs";
import { Outlet } from "react-router-dom";

export const publicRoutesPaths = [
  {
    path: "/",
    element: <PublicRoot />,
    errorElement: <DefaultError />,
    children: [
      { path: "/", element: <Landing />, index: true },
      { path: "/AboutUs", element: <AboutUs /> },
    ],
  },
];

export function PublicRoot() {
  return <Outlet />;
}
