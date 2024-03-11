import FirstSection from "./FirstSection";
import CategoriesCarrousel from "./CategoriesCarrousel";
import FeaturedProducts from "./FeaturedProducts";
import SecondSection from "./SecondSection";
import { PaymentOk } from "src/components";
import { useSelector } from "react-redux";
import { PaymentFailed } from "src/components/checkout/PaymentFailed";

export function Landing() {
  const { id } = useSelector((state) => state.user);
  const { access_token } = useSelector((state) => state.auth);

  const params = new URLSearchParams(document.location.search);
  const mobbex_status = params.get("status");
  const mobbex_payment_type = params.get("type");
  const mobbex_transaction_id = params.get("transactionId");

  return (
    <section className="grid w-full place-content-center">
      <FirstSection />
      <CategoriesCarrousel />
      <FeaturedProducts />
      <SecondSection />
      {mobbex_payment_type && mobbex_transaction_id && id && access_token && mobbex_status === "200" ? (
        <PaymentOk transactionId={mobbex_transaction_id} type={mobbex_payment_type} />
      ) : (
        mobbex_status === "0" && <PaymentFailed />
      )}
    </section>
  );
}
