import { MotionProps } from "framer-motion";

export const onViewFadeIn = (duration: number = 0.5, delay: number = 0.06): MotionProps => {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { type: "spring", duration, delay },
    viewport: { once: true },
  };
};

export const onViewZoomIn: MotionProps = {
  initial: { opacity: 0, scale: 0.35 },
  whileInView: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.35 },
  transition: { type: "spring", duration: 0.5, delay: 0.06 },
  viewport: { once: true },
};

export const fadeInTop = (duration: number = 0.5, delay: number = 0.06): MotionProps => {
  return {
    initial: { opacity: 0, y: -50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { type: "spring", duration: duration, delay: delay },
    viewport: { once: true },
  };
};

export const onViewFadeInBottom = (duration: number = 0.5, delay: number = 0.06): MotionProps => {
  return {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { type: "spring", duration, delay, mass: 0.4, bounce: 0.5, velocity: 0.5 },
    viewport: { once: true },
  };
};

export const fadeInLeft = (duration: number = 0.5, delay: number = 0.06): MotionProps => {
  return {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    transition: { type: "spring", duration, delay },
    viewport: { once: true },
  };
};

export const fadeInRight = (duration: number = 0.5, delay: number = 0.06): MotionProps => {
  return {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    transition: { type: "spring", duration, delay, mass: 0.4, bounce: 0.5, velocity: 0.5 },
    viewport: { once: true },
  };
};

export const fadeInBottom = (duration: number = 0.5, delay: number = 0.06): MotionProps => {
  return {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { type: "spring", duration, delay, mass: 0.4, bounce: 0.5, velocity: 0.5 },
  };
};

export const fadeIn = (duration: number = 0.5, delay: number = 0.06): MotionProps => {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { type: "spring", duration, delay },
  };
};

export const zoomIn: MotionProps = {
  initial: { opacity: 0, scale: 0.35 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.35 },
  transition: { type: "spring", duration: 0.5, delay: 0.06 },
};
