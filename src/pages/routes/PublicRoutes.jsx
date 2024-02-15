import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import { APISpot } from "src/api/index.js";
import Layout from "../Layout";
import { DetailProduct } from "../products/DetailProduct";
//? Imp en lazy, mapeo componentes a default para que funcionen que el suspense
const NavBar = lazy(() => import("components/navs/NavBar.jsx").then((module) => ({ default: module.NavBar })));
const Landing = lazy(() => import("pages/landing/Landing.jsx").then((module) => ({ default: module.Landing })));
const AboutUs = lazy(() => import("pages/aboutUs/AboutUs.jsx").then((module) => ({ default: module.AboutUs })));
const Company = lazy(() => import("pages/company/Company.jsx").then((module) => ({ default: module.Company })));
const Products = lazy(() => import("pages/products/Products.jsx").then((module) => ({ default: module.Products })));
const SignIn = lazy(() => import("pages/signIn/SignIn").then((module) => ({ default: module.SignIn })));
const RecursosHumanos = lazy(() =>
  import("pages/recursosHumanos/RecursosHumanos").then((module) => ({ default: module.RecursosHumanos }))
);

const ChangePassword = lazy(() =>
  import("pages/signIn/ChangePassword").then((module) => ({ default: module.ChangePassword }))
);

export const publicRoutesPaths = [
  {
    path: "/",
    element: (
      <Layout>
        <NavBar />
        <PublicRoot />
      </Layout>
    ),
    errorElement: <DefaultError />,
    children: [
      {
        path: "/",
        element: <Landing />,
        index: true,
        loader: async () => {
          return await APISpot.getCategories();
        },
      },
      { path: "/empresa", element: <Company /> },
      { path: "/rrhh", element: <RecursosHumanos /> },
      { path: "/contacto", element: <AboutUs /> },
      { path: "/sign-in", element: <SignIn /> },
      { path: "/change-password", element: <ChangePassword /> },
      {
        path: "/productos/:page",
        element: <Products />,
        loader: async ({ params }) => {
          return await APISpot.getPaginatedProducts(20, params.page);
        },
      },
      { path: "/producto/:id", element: <DetailProduct />,
      },
    ],
  },
];

export function PublicRoot() {
  return (
    <main className="overflow-hidden">
      <Outlet />
    </main>
  );
}
