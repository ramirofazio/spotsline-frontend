import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import { NavBar } from "../../components/navs";
import {AboutUs, Company, Landing, Profile} from "../index"

export const publicRoutesPaths = [
  {
    path: "/",
    element: <PublicRoot />,
    errorElement: <DefaultError />,
    children: [
      { path: "/", element: <Landing />, index: true },
      { path: "/empresa", element: <Company /> },
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
