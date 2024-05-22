import { motion } from "framer-motion";
import { fadeInBottom, fadeInTop } from "src/styles/framerVariants";

export default function PageSimpleHeader({ image, title, subtitle, className }) {
  return (
    <header className="relative h-[200px] overflow-hidden md:h-[300px]">
      <img src={image} className="absolute h-full w-full object-cover" alt={`header for ${title}`} loading="eager" />

      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-dark/50 backdrop-blur-md ${className}`}
      >
        {title && (
          <motion.h1 {...fadeInTop(1.5)} className="yellowGradient font-primary text-2xl font-bold lg:text-4xl">
            {title}
          </motion.h1>
        )}

        {subtitle && (
          <motion.h3
            {...fadeInBottom(1.5)}
            className="max-w-[300px] text-center font-secondary text-sm font-bold text-background lg:max-w-[500px] lg:text-xl"
          >
            {subtitle}
          </motion.h3>
        )}
      </div>
    </header>
  );
}
