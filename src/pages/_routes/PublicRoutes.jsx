import { Suspense, lazy } from "react";
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
import { SkeletonCard } from "src/components/cards/ProductCard";
const ProductBody = lazy(() =>
  import("pages/products/ProductsBody").then((module) => ({ default: module.ProductsBody }))
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
      { path: "/rrhh", element: <RecursosHumanos /> },
      { path: "/contacto", element: <AboutUs /> },
      { path: "/change-password", element: <ChangePassword /> },
      {
        path: "/productos",
        element: (
          <Products>
            <Outlet />
          </Products>
        ),
        children: [
          {
            path: ":page",
            index: true,
            loader: async ({ request, params }) => {
              try {
                console.log("im in");
                // const search = new URL(request.url).searchParams.get("search");
                // const sort = new URL(request.url).searchParams.get("sort");
                // console.log(page, search, sort);
                await new Promise((resolve) => setTimeout(resolve, 3000));
                const { page } = params;
                console.log(page);
                const res = await APISpot.product.getAll({ page, take: 28, search: null });
                console.log(res);
                return res.data;
              } catch (e) {
                return null;
              }
            },
            element: (
              // <ProductBody />
              <Suspense
                fallback={
                  <div className="h-screen bg-green-500">
                    <SkeletonCard key={1} />
                    <SkeletonCard key={2} />
                    <SkeletonCard key={3} />
                  </div>
                }
              >
                <ProductBody />
              </Suspense>
            ),
          },
        ],
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
