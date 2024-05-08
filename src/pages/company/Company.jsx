import { useEffect } from "react";
import { DefaultButton } from "src/components";
import AwsImage from "src/components/images/AwsImage";
import { Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, zoomIn } from "src/styles/framerVariants";

export function Company() {
  useEffect(() => {
    document.title = "Nuestra Empresa";
  }, []);

  return (
    <main>
      <Swiper
        id="carrousel-container"
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <picture className="grid min-h-[40vh] w-screen place-items-center bg-empresa2  bg-cover bg-left-top bg-no-repeat xl:min-h-[50vh]">
            <div className="grid h-full w-full place-items-center bg-black/60 px-6 text-white">
              <div className="mx-10 w-full xl:pl-40 xl:tracking-wider">
                <h2 className="text-xl md:text-3xl xl:text-5xl xl:font-semibold">ACTUALIDAD</h2>
                <p className="text-sm font-thin md:text-lg md:leading-5 xl:text-2xl">
                  30 AÑOS EVOLUCIONANDO Y <br /> DESARROLLANDO NUEVOS DISEÑOS <br /> HACIÉNDOLE HONOR A NUESTRA <br />
                  TRAYECTORIA.
                </p>
              </div>
            </div>
          </picture>
        </SwiperSlide>
        <SwiperSlide>
          <picture className="relative grid min-h-[40vh] w-screen place-items-center  bg-empresa2 bg-cover bg-left-top bg-no-repeat xl:min-h-[50vh]">
            <div className="grid h-full w-full place-items-center bg-black/60 px-6 text-white">
              <div className="absolute bottom-10 right-5 text-center text-white xl:bottom-32  xl:right-20">
                <h2 className="-mt-6 text-2xl font-thin tracking-widest xl:-mt-10 xl:text-5xl xl:font-semibold">
                  SPOTSLINE
                </h2>
                <p className="-mt-2 text-right font-slogan text-sm font-extralight xl:mr-3 xl:text-2xl">Se ve bien.</p>
              </div>
            </div>
          </picture>
        </SwiperSlide>
        <SwiperSlide>
          <picture className="grid min-h-[40vh] w-screen place-items-center bg-empresa2  bg-cover bg-left-top bg-no-repeat xl:min-h-[50vh]">
            <div className="grid h-full w-full place-items-center bg-black/60 px-6 text-white">
              <div className="mx-10 w-full xl:pl-40 xl:tracking-wider">
                <h2 className="text-xl md:text-3xl xl:text-5xl xl:font-semibold">CREYENDO</h2>
                <p className="text-sm font-thin md:text-lg md:leading-5 xl:text-2xl">
                  EN LO QUE HACEMOS FUIMOS CRECIENDO
                </p>
              </div>
            </div>
          </picture>
        </SwiperSlide>
      </Swiper>

      <section className="relative mx-auto flex w-[92%] flex-col  gap-6  p-2  md:gap-10">
        <div className="absolute -right-14 -top-6">
          <AwsImage type="logos" identify="logoBlack" className="w-48 -rotate-12" />
        </div>
        <motion.h2
          {...zoomIn}
          className="w- mt-4 w-fit text-4xl font-bold tracking-wider text-black drop-shadow-xl md:mx-auto md:text-5xl"
        >
          LA <br className="md:hidden" /> <span className="text-primary">EMPRESA</span>
        </motion.h2>

        <motion.article {...fadeInLeft} className="mx-auto flex w-fit items-center gap-2  lg:gap-3 ">
          <picture className="h-fit max-w-[200px]  md:max-w-[250px] ">
            <Image
              className="w-full"
              src={"https://spotsline-bucket.s3.amazonaws.com/empresa-trabajador.jpg"}
              alt=""
              isZoomed
            />
          </picture>
          <p className="max-w-[450px]  text-start text-[11px] leading-[11px] sm:text-sm md:max-w-[520px] md:text-base lg:max-w-[580px] lg:text-lg">
            Desde <strong>1986</strong> nos dedicamos al <strong>diseño</strong>, <strong>produción</strong> y{" "}
            <strong>comercialización</strong> de luminarias para el área industrial, comercial y del hogar.{" "}
            <strong>Industria nacional</strong>. <br />
            <br /> Apostamos, desde nuestros inicios, a la industria nacional como <strong>pilar social</strong> y{" "}
            <strong>económico</strong> de un país. Por ello, hemos conformado un excelente grupo de trabajo y contamos
            con profesionales en todos los sectores. Nuestro departamento técnico esta a cargo de personal de primera
            línea con mas de <strong>20 años de experiencia</strong> en el desarrollo de productos de iluminación.
          </p>
        </motion.article>

        <motion.article {...fadeInRight} className="mx-auto flex w-fit items-center justify-end gap-2  lg:gap-3">
          <p className="max-w-[450px] text-start text-[11px] leading-[11px] sm:text-sm md:max-w-[520px] md:text-base lg:max-w-[580px] lg:text-lg">
            Nuestra empresa posee <strong>más de 2000 m2</strong> destinados al área de producción, los cuales nos
            permiten realizar prácticamente todos los proceso de fabricación internamente. Nuestro departamento
            comercial y de marketing se encuentra al <strong>servicio del cliente y del usuario</strong>, respaldándose
            en las áreas antes mencionadas, le brindarán la <strong>solución adecuada</strong> a todos sus problemas e
            inquietudes lumínicas.
          </p>
          <picture className="h-fit max-w-[200px] md:max-w-[250px] ">
            <Image
              className="w-full"
              src={"https://spotsline-bucket.s3.amazonaws.com/empresa-trabajador.jpg"}
              alt=""
              isZoomed
            />
          </picture>
        </motion.article>

        <motion.article {...fadeInLeft} className=" mx-auto flex w-fit items-center justify-end gap-2  lg:gap-3">
          <picture className="h-fit max-w-[200px]  md:max-w-[250px] ">
            <Image
              className="w-full"
              src={"https://spotsline-bucket.s3.amazonaws.com/empresa-trabajador.jpg"}
              alt=""
              isZoomed
            />
          </picture>
          <p className="max-w-[450px]  text-start text-[11px] leading-[11px] sm:text-sm md:max-w-[520px] md:text-base lg:max-w-[580px] lg:text-lg">
            Como hemos mencionado anteriormente, somos una empresa nacional que desde el día de su fundación, ha crecido
            con <strong>honestidad</strong> y <strong>esfuerzo</strong>. Es nuestro objetivo que este sitio web pueda
            <strong>satisfacer</strong> todas vuestras necesidades y permita una <strong>mayor conexión</strong> entre
            ustedes y nuestra gente. Gracias por contar con nosotros.
          </p>
        </motion.article>
      </section>

      <a
        target="blank"
        href="https://www.spotsline.com.ar/wp-content/uploads/2022/08/Politica-de-garantia-y-devoluciones.pdf"
        download
        className="mx-auto my-10 block w-fit"
      >
        <DefaultButton className="w-fit shadow-xl">POLÍTICA DE CAMBIO Y DEVOLUCIÓN</DefaultButton>
      </a>
    </main>
  );
}
