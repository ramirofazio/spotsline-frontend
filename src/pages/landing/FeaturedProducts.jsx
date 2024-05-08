import { NavLink } from "react-router-dom";
import AwsImage from "src/components/images/AwsImage";
import FloatingLogos from "src/components/images/FloatingLogos";
import { motion } from "framer-motion";
import { fadeIn, fadeInBottom, fadeInTop, zoomIn } from "src/styles/framerVariants";

const featuredFooter = [
  { icon: "ri-tools-fill", text: "fabricantes" },
  { icon: "ri-truck-fill", text: "envios" },
  { icon: "ri-box-3-fill", text: "mayoristas" },
];

export default function FeaturedProducts({ products }) {
  return (
    <motion.section
      {...fadeIn}
      id="landing-featured-products"
      className="relative grid place-content-center gap-6 overflow-hidden border-t-[8px] border-secondary bg-gradient-to-b from-background px-4 py-6 sm:px-6 xl:px-20"
    >
      <FloatingLogos positions={["-top-20 -right-40", "-top-32 -left-40"]} qty={2} />
      <motion.h1 {...fadeInTop} className="mx-auto w-full text-center text-2xl font-bold sm:mt-4 sm:text-4xl">
        PRODUCTOS DESTACADOS
      </motion.h1>
      <article className="mt-10 grid grid-cols-2 grid-rows-3 gap-4   sm:mt-14 md:grid-flow-row md:grid-cols-4 md:grid-rows-4">
        {products?.map(({ identify, pathfoto, codigo }, index) => (
          <motion.div
            {...fadeInBottom}
            key={index}
            className={`relative flex items-center rounded-lg bg-gradient-to-br from-primary to-yellow-400 p-1 md:row-span-2  lg:min-h-[200px] lg:min-w-[250px] ${
              index === 2
                ? "col-span-2 md:col-span-1  md:row-span-2"
                : index === 1 && "md:grid-rows-subgrid md:col-span-2 md:row-span-4"
            }`}
          >
            <NavLink
              to={`/producto/${codigo}`}
              className="group flex h-full w-full items-center justify-center rounded-lg bg-slate-50 transition hover:cursor-pointer"
            >
              <AwsImage
                type={"lights"}
                identify={identify}
                src={pathfoto}
                className={`z-20 scale-75 group-hover:translate-x-6 lg:scale-125 ${
                  index === 2 && "scale-125 lg:scale-125"
                }  ${index === 1 && "lg:scale-150"}`}
              />
            </NavLink>
          </motion.div>
        ))}
      </article>

      <motion.article {...zoomIn} className="flex items-center justify-around  md:mx-20 xl:mx-auto xl:w-[40%]">
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
