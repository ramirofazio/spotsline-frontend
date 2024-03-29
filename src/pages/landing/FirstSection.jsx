import { DefaultButton } from "src/components";
import AwsImage from "src/components/images/AwsImage";

export default function FirstSection() {
  return (
    <section
      id="landing-first"
      className="grid  h-screen w-screen place-items-center bg-landingbg bg-cover bg-center bg-no-repeat"
    >
      <div className="grid h-full w-full place-content-center place-items-center bg-black/30 backdrop-blur-sm">
        <div className="absolute top-0 md:top-14 xl:top-0 ">
          <AwsImage
            type="lights"
            identify={"hole7"}
            className=" inset-x-0 mx-auto h-[50vw] object-cover drop-shadow-xl md:h-[35vh] xl:h-[40vh]"
          />
        </div>
        <div className="top-50  absolute -z-10 h-80 w-[35%] animate-glow rounded-tl-full rounded-tr-full bg-[#FEFFC4] blur-3xl xl:flex" />
        <h1 className="text-5xl md:mt-12 md:text-6xl xl:text-7xl">SPOTSLINE</h1>
        <p className="font-slogan text-2xl font-semibold text-black md:text-3xl xl:text-4xl">Se ve bien.</p>
        <DefaultButton className="my-4 w-max xl:my-8">LISTA DE PRECIOS NUEVA</DefaultButton>
        <div className="absolute -left-10 bottom-20 md:-left-20 xl:-left-24">
          <AwsImage type="lights" identify={"cinema3"} className="w-28 md:w-52 xl:w-60" />
        </div>
        <h3 className="white-neon absolute bottom-10 text-center font-secondary tracking-wider xl:text-2xl">
          LO QUE HACEMOS ILUMINA <br />
          POR CÓMO LO HACEMOS <br />
          <strong className="yellow-neon">DESDE EL PRIMER DÍA.</strong>
        </h3>
      </div>
    </section>
  );
}
