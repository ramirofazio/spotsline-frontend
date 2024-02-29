import { Suspense } from "react";
import Loader from "src/components/Loader";
import { FirstSignInModal } from "./signIn";

export default function Layout({ children }) {
  return (
    <Suspense fallback={<Loader />}>
      <FirstSignInModal />
      {children}
    </Suspense>
  );
}
