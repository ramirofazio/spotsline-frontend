import { Link } from "react-router-dom";
import { DefaultButton } from "src/components";
import AwsImage from "src/components/images/AwsImage";
import { motion } from "framer-motion";
import { onViewFadeIn } from "src/styles/framerVariants";
import { images } from "src/assets";

export default function FirstSection() {
  return (
    <motion.section
      {...onViewFadeIn()}
      id="landing-first"
      className="relative grid  h-screen w-screen place-items-center overflow-hidden"
    >
      <img
        src={images.landingBg}
        className="absolute h-full w-full object-cover"
        alt="landingBackground"
        loading="eager"
      />

      <div className="grid h-full w-full place-content-center place-items-center bg-black/30 backdrop-blur-md">
        <AwsImage
          type="lights"
          identify={"hole7"}
          className="absolute inset-x-0 top-0 mx-auto min-h-[200px] w-screen !max-w-[700px] object-cover drop-shadow-xl sm:min-h-[250px]"
        />
        <div className="top-50  absolute -z-10 h-80 w-[35%] animate-glow rounded-tl-full rounded-tr-full bg-[#FEFFC4] blur-3xl xl:flex" />
        <h1 className="text-5xl md:mt-12 md:text-6xl xl:text-7xl">SPOTSLINE</h1>
        <p className="font-slogan text-2xl font-semibold text-black md:text-3xl xl:text-4xl">Se ve bien.</p>
        <DefaultButton className="my-4 w-max xl:my-8" as={Link} to="/productos/0">
          VER NUESTROS PRODUCTOS
        </DefaultButton>
        <div className="absolute -left-10 bottom-20 md:-left-20 xl:-left-24">
          <AwsImage type="lights" identify={"cinema3"} className="w-28 md:w-52 xl:w-60" />
        </div>
        <h3 className="white-neon absolute bottom-10 text-center font-secondary tracking-wider xl:text-2xl">
          LO QUE HACEMOS ILUMINA <br />
          POR CÓMO LO HACEMOS <br />
          <strong className="yellow-neon">DESDE EL PRIMER DÍA.</strong>
        </h3>
      </div>
    </motion.section>
  );
}
