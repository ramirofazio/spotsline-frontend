import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import { Landing } from "pages/landing/Landing";
import { AboutUs } from "pages/aboutUs/AboutUs";
import { NavBar } from "components/navs/index";

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
  return (
    <main className="overflow-hidden">
      <NavBar />
      <Outlet />;
    </main>
  );
}
