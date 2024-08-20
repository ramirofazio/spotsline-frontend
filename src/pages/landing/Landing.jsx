import FirstSection from "./FirstSection";
import CategoriesCarrousel from "./CategoriesCarrousel";
import FeaturedProducts from "./FeaturedProducts";
import { DynamicArrow } from "src/components";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Divider } from "@nextui-org/react";
import Lenis from "lenis";

export function Landing() {
  useEffect(() => {
    document.title = "SPOTSLINE - Iluminación Profesional";

    const lenis = new Lenis({ lerp: 0.08 });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence className="grid w-full place-content-center">
      <FirstSection />
      <Divider className="h-[3px] w-screen rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
      <CategoriesCarrousel />
      <Divider className="h-[3px] w-screen rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
      <FeaturedProducts />
      <DynamicArrow />
    </AnimatePresence>
  );
}
