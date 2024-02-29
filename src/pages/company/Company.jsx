import { Button, Image } from "@nextui-org/react";
import { useEffect } from "react";
import { Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

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
        {/* //? CAMBIAR FOTOS Y PONER LAS QUE VAN UNA VEZ SUBIDAS A AWS */}
        <SwiperSlide>
          <picture className="bg-empresa2 grid min-h-[40vh] w-screen place-items-center  bg-cover bg-left-top bg-no-repeat xl:min-h-[50vh]">
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
          <picture className="bg-empresa2 relative grid min-h-[40vh] w-screen  place-items-center bg-cover bg-left-top bg-no-repeat xl:min-h-[50vh]">
            <div className="grid h-full w-full place-items-center bg-black/60 px-6 text-white">
              <div className="absolute bottom-10 right-5 text-center text-white xl:bottom-32  xl:right-20">
                <Image src="/isotipoblanco.png" alt="isotipo-blanco" className="w-40 xl:w-80" />
                <h2 className="-mt-6 text-2xl font-thin tracking-widest xl:-mt-10 xl:text-5xl xl:font-semibold">
                  SPOTSLINE
                </h2>
                <p className="-mt-2 text-right font-slogan text-sm font-extralight xl:mr-3 xl:text-2xl">Se ve bien.</p>
              </div>
            </div>
          </picture>
        </SwiperSlide>
        <SwiperSlide>
          <picture className="bg-empresa2 grid min-h-[40vh] w-screen place-items-center  bg-cover bg-left-top bg-no-repeat xl:min-h-[50vh]">
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

      <section className="relative flex flex-col gap-6 p-6 md:gap-10 xl:hidden">
        <div className="absolute -right-14 -top-6">
          <Image src="/logo.png" alt="logo" className="w-48 -rotate-12" />
        </div>
        <h2 className="text-4xl font-bold tracking-wider text-black drop-shadow-xl md:text-5xl">
          LA <br className="md:hidden" /> <span className="text-primary">EMPRESA</span>
        </h2>
        <div className="flex items-start justify-between gap-6 md:items-center md:gap-10">
          <Image
            src="/empresa-trabajador.jpg"
            alt="trabajador"
            className="w-32 max-w-[700px] flex-1 shadow-xl md:w-60"
          />
          <p className="flex-1 text-justify text-[10px] leading-[12px] md:text-sm">
            Desde <strong>1986</strong> nos dedicamos al <strong>diseño</strong>, <strong>produción</strong> y{" "}
            <strong>comercialización</strong> de luminarias para el área industrial, comercial y del hogar.{" "}
            <strong>Industria nacional</strong>. <br />
            <br /> Apostamos, desde nuestros inicios, a la industria nacional como <strong>pilar social</strong> y{" "}
            <strong>económico</strong> de un país. Por ello, hemos conformado un excelente grupo de trabajo y contamos
            con profesionales en todos los sectores. Nuestro departamento técnico esta a cargo de personal de primera
            línea con mas de <strong>20 años de experiencia</strong> en el desarrollo de productos de iluminación.
          </p>
        </div>
        <div className="flex items-start justify-between gap-6 md:items-center md:gap-10">
          <p className="flex-1 text-justify text-[10px] leading-[12px]  md:text-sm">
            Nuestra empresa posee <strong>más de 2000 m2</strong> destinados al área de producción, los cuales nos
            permiten realizar prácticamente todos los proceso de fabricación internamente. Nuestro departamento
            comercial y de marketing se encuentra al <strong>servicio del cliente y del usuario</strong>, respaldándose
            en las áreas antes mencionadas, le brindarán la <strong>solución adecuada</strong> a todos sus problemas e
            inquietudes lumínicas.
          </p>
          <Image src="/empresa-trabajador.jpg" alt="trabajador" className="w-32 flex-1 shadow-xl md:w-60" />
        </div>
        <div className="flex items-start justify-between gap-6 md:items-center md:gap-10">
          <Image src="/empresa-trabajador.jpg" alt="trabajador" className="w-32 flex-1 shadow-xl md:w-60" />
          <p className="flex-1 text-justify text-[10px] leading-[12px]  md:text-sm">
            Como hemos mencionado anteriormente, somos una empresa nacional que desde el día de su fundación, ha crecido
            con <strong>honestidad</strong> y <strong>esfuerzo</strong>. Es nuestro objetivo que este sitio web pueda
            <strong>satisfacer</strong> todas vuestras necesidades y permita una <strong>mayor conexión</strong> entre
            ustedes y nuestra gente. Gracias por contar con nosotros.
          </p>
        </div>
      </section>

      <section className="relative hidden grid-cols-2 gap-6 p-6 pb-[20vh] md:gap-10 xl:grid">
        <div className="!z-20 grid grid-cols-3 gap-4">
          <div className="col-span-2 row-span-2 flex items-center">
            <Image src="/empresa-trabajador.jpg" alt="trabajador" isZoomed />
          </div>
          <Image src="/empresa-trabajador.jpg" alt="trabajador" isZoomed />
          <Image src="/empresa-trabajador.jpg" alt="trabajador" isZoomed />
        </div>
        <div className="flex flex-col gap-6 text-center text-lg">
          <h2 className="text-6xl font-bold tracking-wider text-black drop-shadow-xl">
            LA <span className="text-primary">EMPRESA</span>
          </h2>
          <p className="text-justify">
            Desde <strong>1986</strong> nos dedicamos al <strong>diseño</strong>, <strong>produción</strong> y{" "}
            <strong>comercialización</strong> de luminarias para el área industrial, comercial y del hogar.{" "}
            <strong>Industria nacional</strong>. <br />
            <br /> Apostamos, desde nuestros inicios, a la industria nacional como <strong>pilar social</strong> y{" "}
            <strong>económico</strong> de un país. Por ello, hemos conformado un excelente grupo de trabajo y contamos
            con profesionales en todos los sectores. Nuestro departamento técnico esta a cargo de personal de primera
            línea con mas de <strong>20 años de experiencia</strong> en el desarrollo de productos de iluminación.
          </p>
          <p className="text-justify">
            Nuestra empresa posee <strong>más de 2000 m2</strong> destinados al área de producción, los cuales nos
            permiten realizar prácticamente todos los proceso de fabricación internamente. Nuestro departamento
            comercial y de marketing se encuentra al <strong>servicio del cliente y del usuario</strong>, respaldándose
            en las áreas antes mencionadas, le brindarán la <strong>solución adecuada</strong> a todos sus problemas e
            inquietudes lumínicas.
          </p>
          <p className="text-justify">
            Como hemos mencionado anteriormente, somos una empresa nacional que desde el día de su fundación, ha crecido
            con <strong>honestidad</strong> y <strong>esfuerzo</strong>. Es nuestro objetivo que este sitio web pueda
            <strong>satisfacer</strong> todas vuestras necesidades y permita una <strong>mayor conexión</strong> entre
            ustedes y nuestra gente. Gracias por contar con nosotros.
          </p>
          <Button
            variant="solid"
            radius="full"
            className="w-80 bg-primary font-semibold tracking-wide hover:scale-110 hover:text-white "
          >
            POLÍTICA DE CAMBIO Y DEVOLUCIÓN
          </Button>
        </div>
        <div className="absolute -bottom-20 -right-60">
          <Image src="/logo.png" alt="logo" className="w-[30vw] -rotate-12" />
        </div>
        <div className="absolute -bottom-20 -left-64">
          <Image src="/logo.png" alt="logo" className="w-[30vw] rotate-12" />
        </div>
      </section>

      <section className="relative my-10 flex flex-col p-6 xl:hidden">
        <div className="absolute -left-28 -top-20">
          <Image src="/logo.png" alt="logo" className="w-60 rotate-45" />
        </div>
        <Button
          variant="solid"
          radius="full"
          className="mx-10 bg-primary text-xs font-semibold tracking-wide shadow-xl hover:scale-110 hover:text-white"
        >
          POLÍTICA DE CAMBIO Y DEVOLUCIÓN
        </Button>
      </section>
    </main>
  );
}
