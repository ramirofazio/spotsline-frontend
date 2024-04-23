import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import AwsImage from "src/components/images/AwsImage";
import FloatingLogos from "src/components/images/FloatingLogos";

const featuredFooter = [
  { icon: "ri-tools-fill", text: "fabricantes" },
  { icon: "ri-truck-fill", text: "envios" },
  { icon: "ri-box-3-fill", text: "mayoristas" },
];

export default function FeaturedProducts({ products }) {
  return (
    <section
      id="landing-featured-products"
      className="to-seoc relative grid place-content-center gap-6 overflow-hidden bg-gradient-to-b from-background px-4 py-6 sm:px-6 xl:px-20"
    >
      <FloatingLogos positions={["-top-20 -right-40", "-top-32 -left-40", "-bottom-20 -right-40"]} qty={3} />
      <div className="absolute inset-x-0 top-0 z-20 h-2 !w-screen bg-secondary" />
      <h1 className="mx-auto w-fit text-2xl font-bold sm:mt-4 sm:text-4xl">
        PRODUCTOS <br /> DESTACADOS
      </h1>
      <article className="mt-10 grid grid-cols-2 grid-rows-3  sm:mt-14 md:grid-flow-row md:grid-cols-4 md:grid-rows-4">
        {products?.map(({ identify, pathfoto, codigo }, index) => (
          <Button
            key={index}
            className={`grid h-auto  items-center justify-items-center   bg-landingbg bg-cover bg-center pb-10 md:row-span-2 ${
              index === 2
                ? "col-span-2 md:col-span-1  md:row-span-2"
                : index === 1 && "md:grid-rows-subgrid md:col-span-2 md:row-span-4"
            }`}
          >
            <div className="absolute h-full w-full bg-black/70 "></div>
            <NavLink className="absolute z-50 h-full w-full " to={`/producto/${codigo}`}></NavLink>
            <AwsImage
              type={"lights"}
              identify={identify}
              src={pathfoto}
              className={` mx-auto w-full !max-w-full  md:w-full ${index === 2 && "my-auto w-[60%]"}`}
            />
          </Button>
        ))}
      </article>

      <article className="flex items-center justify-around  md:mx-20 xl:mx-auto xl:w-[40%]">
        {featuredFooter.map(({ icon, text }, index) => (
          <div key={index} className="flex flex-grow flex-col items-center">
            <i className={`${icon} text-4xl text-primary drop-shadow-xl sm:text-6xl`} />
            <p className="-mt-1 font-secondary text-xs uppercase text-black md:m-0 md:text-sm">{text}</p>
          </div>
        ))}
      </article>
    </section>
  );
}
