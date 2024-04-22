import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { publicRoutesPaths, userRoutesPaths, adminRoutesPaths } from "./index";

export function Routes() {
  const router = createBrowserRouter([...publicRoutesPaths, ...userRoutesPaths, ...adminRoutesPaths]);

  return <RouterProvider router={router} />;
}
