import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMediaQuery } from "src/hoooks/mediaQuerys";

export const DynamicArrow = () => {
  const isMobile = useMediaQuery(800);
  const { scrollYProgress } = useScroll();

  const x = useTransform(scrollYProgress, [0, 0.1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const animateX = useSpring(x);

  return (
    <motion.div
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      style={{ x: animateX, opacity }}
      className="icons group fixed bottom-0 right-0 z-50 flex h-[60px] w-[60px] items-center justify-center md:h-[100px] md:w-[100px]"
    >
      <i
        className="ri-arrow-up-line absolute z-50 text-xl font-bold text-secondary transition group-hover:scale-125"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      />
      <svg
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        width={isMobile ? "60" : "80"}
        height={isMobile ? "60" : "80"}
        viewBox="0 0 100 100"
        className="flex items-center justify-center fill-transparent transition group-hover:scale-125"
      >
        <circle cx="50" cy="50" r="30" pathLength="1" className="stroke-dark/50 stroke-[5px]" />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          className="stroke-primary stroke-[5px]"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
    </motion.div>
  );
};
