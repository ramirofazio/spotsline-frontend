import React, { Suspense, lazy, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import { useDispatch } from "react-redux";
import { getOfStorage } from "src/utils/localStorage";
import { APISpot, addAuthWithToken } from "src/api";
import { Spinner } from "@nextui-org/react";
import { useDebouncedCallback } from "use-debounce";
import { loadUserData } from "src/utils/loadUserData";
import { actionsAuth } from "src/redux/reducers";

const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const ProductsPage = lazy(() => import("../dashboard/Products").then((module) => ({ default: module.ProductsPage })));
const VariantPage = lazy(() => import("../dashboard/Products").then((module) => ({ default: module.VariantPage })));
const Coupons = lazy(() => import("../dashboard/Coupons").then((module) => ({ default: module.Coupons })));
const ClientsPage = lazy(() => import("../dashboard/Clients").then((module) => ({ default: module.ClientsPage })));
const Orders = lazy(() => import("../dashboard/Orders").then((module) => ({ default: module.Orders })));
const SellersPage = lazy(() => import("../dashboard/Sellers").then((module) => ({ default: module.SellersPage })));
const ShoppingCart = lazy(() => import("pages/shoppingCart/ShoppingCart.jsx"));

export const adminRoutesPaths = [
  {
    path: "/dashboard",
    errorElement: <DefaultError link={"/dashboard/vendedores"} />,
    element: <AdminRoot />,
    children: [
      {
        path: "/dashboard/productos/:page",
        element: <ProductsPage />,
        loader: async ({ params }) => {
          try {
            return await APISpot.dashboard.getDashboardProducts(params.page);
          } catch (e) {
            console.log(e);
            return null;
          }
        },
      },
      {
        path: "/dashboard/productos/:page/:productCode",
        element: <VariantPage />,
        loader: async ({ params }) => {
          try {
            return await APISpot.dashboard.getDashboardProductVariants(params.productCode);
          } catch (e) {
            console.log(e);
            return null;
          }
        },
      },
      {
        path: "/dashboard/cupones",
        element: <Coupons />,
        loader: async () => {
          try {
            return await APISpot.dashboard.getCoupons();
          } catch (e) {
            console.log(e);
            return null;
          }
        },
      },
      {
        path: "/dashboard/clientes/:page",
        element: <ClientsPage />,
        loader: async ({ params }) => {
          try {
            return await APISpot.dashboard.getDashboardClients(params.page);
          } catch (e) {
            console.log(e);
            return null;
          }
        },
      },
      {
        path: "/dashboard/ordenes",
        loader: async () => {
          try {
            return await APISpot.dashboard.getDashboardOrders();
          } catch (e) {
            console.log(e);
            return null;
          }
        },
        element: <Orders />,
      },
      {
        path: "/dashboard/vendedores",
        element: <SellersPage />,
        loader: async () => {
          try {
            return await APISpot.dashboard.getDashboardSellers();
          } catch (e) {
            console.log(e);
            return null;
          }
        },
      },
    ],
  },
  { path: "/carrito", element: <ShoppingCart /> },
];

export function AdminRoot() {
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(null);

  const loadUser = useDebouncedCallback(async () => {
    const user = getOfStorage("user");
    const access_token = getOfStorage("access_token");
    const managedClient = getOfStorage("managedClient");

    if (access_token && user) {
      //? El usuario ya estaba loggeado
      addAuthWithToken(access_token);
      dispatch(actionsAuth.setAccessToken(access_token));
      const { web_role } = await loadUserData(dispatch, access_token, user.email, managedClient);

      if (web_role) {
        if (
          web_role === Number(import.meta.env.VITE_ADMIN_ROLE) ||
          web_role === Number(import.meta.env.VITE_SELLER_ROLE)
        ) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    }
  }, [100]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    loadUser();
  }, [document]);

  if (isAdmin) {
    return (
      <Suspense fallback={<Spinner color="secondary" className="absolute inset-0 !z-50 text-xl" />}>
        <Dashboard>
          <Outlet />
        </Dashboard>
      </Suspense>
    );
  }
  if (isAdmin === false) {
    return <DefaultError />;
  }
}
