import { useEffect } from "react";
import FirstSection from "./FirstSection";
import CategoriesCarrousel from "./CategoriesCarrousel";
import FeaturedProducts from "./FeaturedProducts";
import SecondSection from "./SecondSection";
import { toast } from "sonner";

export function Landing() {
  useEffect(() => {
    document.title = "SPOTSLINE - Iluminación Profesional";
    //? Una boludez, pero queda lindo y mas dinamico

    toast("Ya tenemos toasts!", {
      description: "Estan buenos, usemoslos. Ej en Landing.jsx ;)",
      duration: 5000,
      icon: <i class="ri-thumb-up-line"></i>,
    });
  }, []);

  return (
    <section className="grid w-full place-content-center">
      <FirstSection />
      <CategoriesCarrousel />
      <FeaturedProducts />
      <SecondSection />
    </section>
  );
}
