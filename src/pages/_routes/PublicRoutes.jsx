import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import { APISpot } from "src/api/index.js";
import Layout from "../Layout";
import { DetailProduct } from "../products/detail/DetailProduct";
import { assets } from "src/assets";
//? Imp en lazy, mapeo componentes a default para que funcionen que el suspense
const Footer = lazy(() => import("components/navs/Footer.jsx"));
const NavBar = lazy(() => import("components/navs/NavBar.jsx"));
const Landing = lazy(() => import("pages/landing/Landing.jsx").then((module) => ({ default: module.Landing })));
// const AboutUs = lazy(() => import("pages/aboutUs/AboutUs.jsx").then((module) => ({ default: module.AboutUs })));
const Company = lazy(() => import("pages/company/Company.jsx").then((module) => ({ default: module.Company })));
const Products = lazy(() => import("pages/products/Products.jsx").then((module) => ({ default: module.Products })));
const SignIn = lazy(() => import("pages/signIn/SignIn").then((module) => ({ default: module.SignIn })));
const Rrhh = lazy(() => import("pages/rrhh/Rrhh.jsx").then((module) => ({ default: module.Rrhh })));
const ChangePassword = lazy(() =>
  import("pages/signIn/ChangePassword").then((module) => ({ default: module.ChangePassword }))
);

const ShoppingCart = lazy(() => import("pages/shoppingCart/ShoppingCart.jsx"));

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
    loader: async () => {
      try {
        return await APISpot.product.getCategories();
      } catch (e) {
        console.log("Db no conectada", e);
        return null;
      }
    },
    errorElement: <DefaultError />,
    children: [
      {
        path: "/",
        loader: async () => {
          try {
            const products = (await APISpot.product.getFeaturedProducts({ take: 5 })).data;
            let featuredAssets = Object.keys(assets.lights);
            return products.map((p, i) => {
              // ? fotos mockup hasta conectar con s3
              return {
                ...p,
                identify: featuredAssets[i],
              };
            });
          } catch (e) {
            return null;
          }
        },
        element: <Landing />,
        index: true,
      },
      { path: "/empresa", element: <Company /> },
      { path: "/rrhh", element: <Rrhh /> },
      { path: "/change-password", element: <ChangePassword /> },
      {
        path: "/productos/:page",
        element: <Products />,
      },
      { path: "/producto/:id", element: <DetailProduct /> },
      { path: "/carrito", element: <ShoppingCart /> },
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
  return (
    <main className="overflow-hidden">
      <Outlet />
    </main>
  );
}
