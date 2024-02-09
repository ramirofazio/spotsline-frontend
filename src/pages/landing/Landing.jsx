import { useEffect } from "react";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";

export function Landing() {
  useEffect(() => {
    document.title = "SPOTSLINE - Iluminación Profesional";
    //? Una boludez, pero queda lindo y mas dinamico
  }, []);

  return (
    <section className="grid w-full place-content-center">
      <FirstSection />
      <SecondSection />
    </section>
  );
}
