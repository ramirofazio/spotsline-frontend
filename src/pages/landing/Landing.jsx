import FirstSection from "./FirstSection";
import CategoriesCarrousel from "./CategoriesCarrousel";
import FeaturedProducts from "./FeaturedProducts";
import { PaymentOk } from "src/components";
import { useSelector } from "react-redux";
import { PaymentFailed } from "src/components/checkout/PaymentFailed";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Divider } from "@nextui-org/react";
import Lenis from "lenis";
import { deleteOfStorage } from "src/utils/localStorage";

export function Landing() {
  const { id } = useSelector((state) => state.user);
  const { access_token } = useSelector((state) => state.auth);

  const params = new URLSearchParams(document.location.search);
  const mobbex_status = params.get("status");
  const mobbex_payment_type = params.get("type");
  const mobbex_transaction_id = params.get("transactionId");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    const lenis = new Lenis({ lerp: 0.08 });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    //? Borro residuos de localStorage
    deleteOfStorage("currentVariant");
    deleteOfStorage("qty");
  }, []);

  return (
    <AnimatePresence className="grid w-full place-content-center">
      <FirstSection />
      <Divider className="h-[3px] w-screen rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
      <CategoriesCarrousel />
      <Divider className="h-[3px] w-screen rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
      <FeaturedProducts />
      {mobbex_payment_type && mobbex_transaction_id && id && access_token && mobbex_status === "200" ? (
        <PaymentOk transactionId={mobbex_transaction_id} type={mobbex_payment_type} />
      ) : (
        mobbex_status === "0" && <PaymentFailed />
      )}
    </AnimatePresence>
  );
}
