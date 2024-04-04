import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import { DefaultError } from "pages/error/DefaultError";
import { useSelector } from "react-redux";
import Dashboard from "../dashboard/Dashboard";
const ProductsPage = lazy(() => import("../dashboard/Products").then((module) => ({ default: module.ProductsPage })));
const VariantPage = lazy(() => import("../dashboard/Products").then((module) => ({ default: module.VariantPage })));
const Coupons = lazy(() => import("../dashboard/Coupons").then((module) => ({ default: module.Coupons })));
const Users = lazy(() => import("../dashboard/Users").then((module) => ({ default: module.Users })));
const Orders = lazy(() => import("../dashboard/Orders").then((module) => ({ default: module.Orders })));
import { getOfStorage } from "src/utils/localStorage";
import { APISpot } from "src/api";
import { Spinner } from "@nextui-org/react";

export const adminRoutesPaths = [
  {
    path: "/dashboard",
    errorElement: <DefaultError link="/dashboard/productos" />,
    element: <AdminRoot />,
    children: [
      {
        path: "/dashboard/productos",
        element: <ProductsPage />,
      },
      { path: "/dashboard/productos/:variant_id", element: <VariantPage /> },
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
        path: "/dashboard/usuarios",
        element: <Users />,
      },
      {
        path: "/dashboard/ordenes",
        element: <Orders />,
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

        if (web_role === import.meta.env.VITE_ADMIN_ROLE) {
          //? Cumplio todas las condiciones asi que es ADMIN
          return true;
        }
      }
    }

    //? No cumplio las condiciones
    return false;
  };

  if (validate()) {
    return <DefaultError />;
  }

  return (
    <Dashboard>
      <Suspense fallback={<Spinner color="secondary" className="absolute inset-0 !z-50 text-xl" />}>
        <Outlet />
      </Suspense>
    </Dashboard>
  );
}
