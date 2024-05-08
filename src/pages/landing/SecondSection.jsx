import { NavLink } from "react-router-dom";
import { DefaultButton } from "src/components";
import AwsImage from "src/components/images/AwsImage";
import { motion } from "framer-motion";
import { fadeInBottom } from "src/styles/framerVariants";

export default function SecondSection() {
  return (
    <motion.section
      {...fadeInBottom()}
      className="relative grid w-full place-items-center bg-gradient-to-b from-background to-primary  px-4  sm:px-6 md:px-20"
    >
      <div className="absolute inset-x-0 top-0 z-20 h-2 !w-screen bg-secondary" />
      <div className="grid w-full  md:grid-cols-2">
        <AwsImage type="lights" identify={"light3"} className="mx-auto w-[250px]  pl-4 lg:w-[350px]" />
        <AwsImage type="lights" identify={"light3"} className="mx-auto hidden w-[250px]  pl-4 md:inline lg:w-[350px]" />
      </div>
      <div className="z-10 my-10 flex  flex-col gap-4 text-center  ">
        <h1 className="white-neon text-center text-xl font-semibold tracking-wider drop-shadow-2xl md:text-2xl  xl:text-4xl">
          30 AÑOS
        </h1>
        <h2 className="mx-auto font-secondary font-bold text-secondary md:text-xl lg:w-[70%] xl:text-3xl">
          EVOLUCIONANDO Y DESARROLLANDO NUEVOS DISEÑOS HACIÉNDOLE HONOR A NUESTRA TRAYECTORIA.
        </h2>
        <DefaultButton className="mx-auto w-max min-w-[20vw] shadow-xl">
          <NavLink className="mx-auto w-fit" to="/empresa">
            CONOCENOS
          </NavLink>
        </DefaultButton>
      </div>
    </motion.section>
  );
}
