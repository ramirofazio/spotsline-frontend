import { NavLink } from "react-router-dom";
import { DefaultButton } from "src/components";
import AwsImage from "src/components/images/AwsImage";

export default function SecondSection() {
  return (
    <section className="relative grid w-full place-items-center bg-gradient-to-b from-background to-primary  px-4  sm:px-6 md:px-20">
      <div className="absolute inset-x-0 top-0 z-20 h-2 !w-screen bg-secondary" />
      <div className="absolute top-0 grid grid-cols-2 gap-x-10">
        <AwsImage type="lights" identify={"light3"} className="mx-auto xl:mr-40" />
        <AwsImage type="lights" identify={"light3"} className="mx-auto xl:ml-40" />
      </div>
      <div className="z-10 my-20 flex flex-col gap-4 md:my-32 md:gap-10">
        <h1 className="white-neon text-center text-xl font-semibold tracking-wider drop-shadow-2xl md:text-2xl xl:text-4xl">
          30 AÑOS
        </h1>
        <h2 className="mx-auto font-secondary font-bold text-secondary md:text-xl xl:w-[50%] xl:text-3xl">
          EVOLUCIONANDO Y DESARROLLANDO NUEVOS DISEÑOS HACIÉNDOLE HONOR A NUESTRA TRAYECTORIA.
        </h2>
        <NavLink className="mx-auto w-fit" to="/empresa">
          <DefaultButton className="mx-auto w-max min-w-[20vw] shadow-xl">CONOCENOS</DefaultButton>
        </NavLink>
      </div>
    </section>
  );
}
