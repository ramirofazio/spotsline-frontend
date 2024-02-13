import { Button, Image } from "@nextui-org/react";
import hole7 from "assets/hole7.png";
import cinema3 from "assets/cinema3.png";

export default function FirstSection() {
  return (
    <section
      id="landing-first"
      className="grid  h-screen w-screen place-items-center bg-landingbg bg-cover bg-center bg-no-repeat"
    >
      <div className="grid h-full w-full place-content-center place-items-center backdrop-blur-sm">
        <Image
          src={hole7}
          alt="hole7"
          className="absolute inset-x-0 top-0 mx-auto h-[50vw] object-cover md:top-14 md:h-[35vh] xl:top-0 xl:h-[40vh]"
          disableSkeleton
        />
        <div className="top-50  animate-glow absolute -z-10  hidden h-80 w-[35%] rounded-tl-full rounded-tr-full bg-[#FEFFC4] blur-md xl:flex" />
        <h1 className="text-5xl md:mt-12 md:text-6xl xl:text-7xl">SPOTSLINE</h1>
        <p className="font-slogan text-2xl font-semibold text-black md:text-3xl xl:text-4xl">Se ve bien.</p>
        <Button
          color="primary"
          variant="solid"
          radius="full"
          size="lg"
          className="my-4 font-semibold tracking-wide text-white xl:my-8 xl:text-lg"
        >
          LISTA DE PRECIOS NUEVA
        </Button>
        <Image
          src={cinema3}
          disableSkeleton
          className="absolute -left-10 bottom-20 w-28 md:-left-20 md:w-52 xl:-left-24 xl:w-60 "
        />
        <h3 className="white-neon absolute bottom-10 text-center tracking-wider xl:text-2xl">
          LO QUE HACEMOS ILUMINA <br />
          POR CÓMO LO HACEMOS <br />
          <strong className="yellow-neon">DESDE EL PRIMER DÍA.</strong>
        </h3>
      </div>
    </section>
  );
}
