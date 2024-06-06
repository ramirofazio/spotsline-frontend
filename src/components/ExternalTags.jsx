import { Analytics } from "@vercel/analytics/react";
import Lenis from "lenis";

export default function ExternalTags() {
  //? Smooth scrolling
  const lenis = new Lenis({ lerp: 0.06 });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return (
    <>
      <Analytics />
    </>
  );
}
