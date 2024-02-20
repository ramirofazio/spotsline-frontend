import { Button, Image } from "@nextui-org/react";
import light3 from "assets/light3.png";
import { useNavigate } from "react-router-dom";

export default function SecondSection() {
  const navigate = useNavigate();

  return (
    <section className="relative grid w-full place-items-center bg-gradient-to-b from-background to-primary  px-4  sm:px-6 md:px-20">
      <div className="absolute inset-x-0 top-0 z-20 h-2 !w-screen bg-secondary" />
      <div className="absolute top-0 grid grid-cols-2 gap-x-10">
        <Image src={light3} className="mx-auto xl:mr-40" />
        <Image src={light3} className="mx-auto xl:ml-40" />
      </div>
      <div className="z-10 my-20 flex flex-col gap-4 md:my-32 md:gap-10">
        <h1 className="white-neon text-center text-xl font-semibold tracking-wider drop-shadow-2xl md:text-2xl xl:text-4xl">
          30 AÑOS
        </h1>
        <h2 className="mx-auto font-secondary font-bold text-secondary md:text-xl xl:w-[50%] xl:text-3xl">
          EVOLUCIONANDO Y DESARROLLANDO NUEVOS DISEÑOS HACIÉNDOLE HONOR A NUESTRA TRAYECTORIA.
        </h2>
        <Button
          variant="solid"
          className="white-neon mx-20 bg-primary font-semibold  shadow-xl transition hover:scale-110 md:!p-6 md:text-xl xl:mx-auto xl:w-[30%]"
          radius="full"
          onPress={() => navigate("/empresa")}
        >
          CONOCENOS
        </Button>
      </div>
    </section>
  );
}
