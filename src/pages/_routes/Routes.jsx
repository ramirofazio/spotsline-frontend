import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { publicRoutesPaths, authRoutesPaths, adminRoutesPaths } from "./index";

export function Routes() {
  const router = createBrowserRouter([...publicRoutesPaths, ...authRoutesPaths, ...adminRoutesPaths]);

  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}
