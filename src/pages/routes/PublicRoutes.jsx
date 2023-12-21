import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import { NavBar } from "../../components/navs";
import { AboutUs, Company, Landing, SignIn, FirstSignIn } from "../index";

export const publicRoutesPaths = [
  {
    path: "/",
    element: <PublicRoot />,
    errorElement: <DefaultError />,
    children: [
      { path: "/", element: <Landing />, index: true },
      { path: "/company", element: <Company /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/sign-in", element: <SignIn /> },
      { path: "/first-sign-in", element: <FirstSignIn /> },
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
