import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import Loader from "components/Loader.jsx";
import { APISpot } from "src/api/index.js";
const NavBar = lazy(() => import("components/navs/NavBar.jsx").then((module) => ({ default: module.NavBar })));
const Landing = lazy(() => import("pages/landing/Landing.jsx").then((module) => ({ default: module.Landing })));
const AboutUs = lazy(() => import("pages/aboutUs/AboutUs.jsx").then((module) => ({ default: module.AboutUs })));
const Company = lazy(() => import("pages/company/Company.jsx").then((module) => ({ default: module.Company })));
const Products = lazy(() => import("pages/products/Products.jsx").then((module) => ({ default: module.Products })));

export const publicRoutesPaths = [
  {
    path: "/",
    element: <PublicRoot />,
    errorElement: <DefaultError />,
    children: [
      { path: "/", element: <Landing />, index: true },
      { path: "/empresa", element: <Company /> },
      { path: "/nosotros", element: <AboutUs /> },
      {
        path: "/productos/:page",
        element: <Products />,
        loader: async ({ params }) => {
          return await APISpot.getPaginatedProducts(20, params.page);
        },
      },
    ],
  },
];

export function PublicRoot() {
  return (
    <Suspense fallback={<Loader />}>
      <main className="overflow-hidden">
        <NavBar />
        <Outlet />;
      </main>
    </Suspense>
  );
}
