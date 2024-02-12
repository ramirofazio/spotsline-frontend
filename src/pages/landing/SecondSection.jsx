import { Button, Image } from "@nextui-org/react";
import hole7 from "assets/hole7.png";
import cinema3 from "assets/cinema3.png";

export default function SecondSection() {
  return (
    <section
      id="landing-first"
      className="bg-contan grid  h-screen w-screen place-items-center bg-landingbg bg-cover bg-center bg-no-repeat"
    >
      {/* <div className="grid h-full w-full place-content-center place-items-center backdrop-blur-sm">
        <Image
          src={hole7}
          alt="hole7"
          className="absolute inset-x-0 top-0 mx-auto h-[50vw] object-cover"
          disableSkeleton
        />
        <h1 className="text-5xl">SPOTSLINE</h1>
        <p className="font-slogan text-2xl font-semibold text-black">Se ve bien.</p>
        <Button color="primary" variant="solid" radius="full" className="my-4 font-semibold tracking-wide text-white">
          LISTA DE PRECIOS NUEVA
        </Button>
        <Image src={cinema3} disableSkeleton className="absolute -left-10 bottom-20 w-28 " />
        <h3 className="white-neon absolute bottom-10 text-center tracking-wider">
          LO QUE HACEMOS ILUMINA <br />
          POR CÓMO LO HACEMOS <br />
          <strong className="yellow-neon">DESDE EL PRIMER DÍA.</strong>
        </h3>
      </div> */}
    </section>
  );
}
