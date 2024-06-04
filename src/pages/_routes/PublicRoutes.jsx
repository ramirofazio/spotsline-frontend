import { lazy, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import { APISpot } from "src/api/index.js";
import Layout from "../Layout";
import { DetailProduct } from "../products/detail/DetailProduct";

//? Imp en lazy, mapeo componentes a default para que funcionen que el suspense
const Footer = lazy(() => import("components/navs/Footer.jsx"));
const NavBar = lazy(() => import("components/navs/NavBar.jsx"));
const Landing = lazy(() => import("pages/landing/Landing.jsx").then((module) => ({ default: module.Landing })));
const Company = lazy(() => import("pages/company/Company.jsx").then((module) => ({ default: module.Company })));
const Products = lazy(() => import("pages/products/Products.jsx").then((module) => ({ default: module.Products })));
const SignIn = lazy(() => import("pages/signIn/SignIn").then((module) => ({ default: module.SignIn })));
const Rrhh = lazy(() => import("pages/rrhh/Rrhh.jsx").then((module) => ({ default: module.Rrhh })));

export const publicRoutesPaths = [
  {
    path: "/",
    element: (
      <Layout>
        <NavBar />
        <PublicRoot />
        <Footer />
      </Layout>
    ),
    id: "root",
    loader: async () => {
      try {
        const categories = await APISpot.product.getCategories();
        return categories;
      } catch (e) {
        console.log("### DB no conectada", e);
        return null;
      }
    },
    errorElement: <DefaultError />,
    children: [
      {
        path: "/",
        loader: async () => {
          try {
            const featured = (await APISpot.product.getFeaturedProducts({ take: 5 })).data;
            return featured;
          } catch (e) {
            return null;
          }
        },
        element: <Landing />,
        index: true,
      },
      { path: "/empresa", element: <Company /> },
      { path: "/rrhh", element: <Rrhh /> },
      {
        path: "/productos/:page",
        element: <Products />,
      },
      {
        path: "/producto/:id",
        loader: async ({ params }) => {
          try {
            const data = (await APISpot.product.getOne({ id: params.id })).data;
            const map = {};
            let variants = [];
            data.variants.map((variant, description) => {
              const { subRub } = variant;
              if (!map[subRub]) {
                map[subRub] = description;
                variants.push(variant);
              }
            });
            data.variants = variants;
            return data;
          } catch (e) {
            return null;
          }
        },
        element: <DetailProduct />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: (
      <Layout>
        <SignIn />
      </Layout>
    ),
    errorElement: <DefaultError />,
  },
];

export function PublicRoot() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <main className="overflow-hidden">
      <Outlet />
    </main>
  );
}
