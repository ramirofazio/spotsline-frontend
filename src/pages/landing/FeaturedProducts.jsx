import { NavLink } from "react-router-dom";
import FloatingLogos from "src/components/images/FloatingLogos";
import { motion } from "framer-motion";
import { onViewFadeIn, onViewFadeInBottom, fadeInTop, onViewZoomIn } from "src/styles/framerVariants";

const featuredFooter = [
  { icon: "ri-tools-fill", text: "fabricantes" },
  { icon: "ri-truck-fill", text: "envios" },
  { icon: "ri-box-3-fill", text: "mayoristas" },
];

export default function FeaturedProducts({ products }) {
  return (
    <motion.section
      {...onViewFadeIn()}
      id="landing-featured-products"
      className="relative my-4 grid place-content-center gap-10 overflow-hidden border-t-[8px] border-secondary bg-gradient-to-b from-background px-4 py-6 sm:px-6 lg:gap-20 xl:px-20"
    >
      <FloatingLogos positions={["-top-20 -right-40", "-top-32 -left-40"]} qty={2} />
      <motion.h1 {...fadeInTop()} className="mx-auto w-full text-center text-2xl font-bold sm:mt-4 sm:text-4xl">
        PRODUCTOS DESTACADOS
      </motion.h1>
      <article className="grid grid-cols-2 grid-rows-3 gap-4 sm:scale-75 md:grid-flow-row md:grid-cols-4 md:grid-rows-4">
        {products?.map(({ pathfoto, codigo }, index) => (
          <motion.div
            {...onViewFadeInBottom()}
            key={index}
            className={`relative flex items-center bg-gradient-to-br from-primary to-yellow-400 p-1 shadow-md md:row-span-2  lg:min-h-[200px] lg:min-w-[250px] ${
              index === 2
                ? "col-span-2 md:col-span-1  md:row-span-2"
                : index === 1 && "md:grid-rows-subgrid md:col-span-2 md:row-span-4"
            }`}
          >
            <NavLink
              to={`/producto/${codigo}`}
              className="group flex h-full w-full items-center justify-center overflow-hidden bg-slate-50 transition hover:cursor-pointer"
            >
              <img
                loading="lazy"
                src={pathfoto}
                className={`z-20 scale-90 transition group-hover:translate-x-6 group-hover:opacity-60 ${
                  index === 2 && "scale-125 lg:scale-125"
                }  ${index === 1 && "lg:scale-100"}`}
              />
            </NavLink>
          </motion.div>
        ))}
      </article>

      <motion.article {...onViewZoomIn} className="flex items-center justify-around  md:mx-20 xl:mx-auto xl:w-[40%]">
        {featuredFooter.map(({ icon, text }, index) => (
          <div key={index} className="flex flex-grow flex-col items-center">
            <i className={`${icon} text-4xl text-primary drop-shadow-xl sm:text-6xl`} />
            <p className="-mt-1 font-secondary text-xs uppercase text-black md:m-0 md:text-sm">{text}</p>
          </div>
        ))}
      </motion.article>
    </motion.section>
  );
}
