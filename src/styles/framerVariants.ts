import { MotionProps } from "framer-motion";

export const fadeIn = (duration: number = 0.5): MotionProps => {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { type: "spring", duration },
    viewport: { once: false },
  };
};

export const zoomIn: MotionProps = {
  initial: { opacity: 0, scale: 0 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { type: "spring", duration: 0.5, delay: 0.06 },
  viewport: { once: true },
};

export const fadeInTop: MotionProps = {
  initial: { opacity: 0, y: -50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { type: "spring", duration: 0.5, delay: 0.06 },
  viewport: { once: true },
};

export const fadeInBottom: MotionProps = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { type: "spring", duration: 0.5, delay: 0.06 },
  viewport: { once: true },
};

export const fadeInLeft: MotionProps = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  transition: { type: "spring", duration: 1.5, delay: 0.5 },
  viewport: { once: true },
};
