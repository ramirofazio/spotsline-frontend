import { Suspense } from "react";
import Loader from "src/components/Loader";

export default function Layout({ children }) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
