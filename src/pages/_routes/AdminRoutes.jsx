import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import { useSelector } from "react-redux";
const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const ProductsPage = lazy(() => import("../dashboard/Products").then((module) => ({ default: module.ProductsPage })));
const VariantPage = lazy(() => import("../dashboard/Products").then((module) => ({ default: module.VariantPage })));
const Coupons = lazy(() => import("../dashboard/Coupons").then((module) => ({ default: module.Coupons })));
const ClientsPage = lazy(() => import("../dashboard/Clients").then((module) => ({ default: module.ClientsPage })));
const Orders = lazy(() => import("../dashboard/Orders").then((module) => ({ default: module.Orders })));
const SellersPage = lazy(() => import("../dashboard/Sellers").then((module) => ({ default: module.SellersPage })));

import { getOfStorage } from "src/utils/localStorage";
import { APISpot } from "src/api";
import { Spinner } from "@nextui-org/react";

export const adminRoutesPaths = [
  {
    path: "/dashboard",
    errorElement: <DefaultError link={"/dashboard/productos/1"} />,
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
];

export function AdminRoot() {
  const { access_token } = useSelector((state) => state.auth);
  const { web_role } = useSelector((state) => state.user);

  const validate = () => {
    const localAccess_token = getOfStorage("access_token");
    if (localAccess_token === access_token) {
      //? el token es valido, sigo
      const localWeb_role = getOfStorage("user").web_role;
      if (localWeb_role === web_role) {
        //? es valido, sigo. Ambos existen asi que esta logged. Hay que validar el rol
        if (web_role === Number(import.meta.env.VITE_ADMIN_ROLE)) {
          //? Cumplio todas las condiciones asi que es ADMIN
          return true;
        }
      }
    }
    //? No cumplio las condiciones
    return false;
  };

  if (validate()) {
    return (
      <Suspense fallback={<Spinner color="primary" className="absolute inset-0 !z-50 text-xl" />}>
        <Dashboard>
          <Outlet />
        </Dashboard>
      </Suspense>
    );
  }
  return <DefaultError />;
}
