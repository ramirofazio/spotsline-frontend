import { useEffect } from "react";
import { DefaultButton } from "src/components";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, zoomIn } from "src/styles/framerVariants";
import { images } from "src/assets";
import PageSimpleHeader from "src/components/PageHeader";

export function Company() {
  useEffect(() => {
    document.title = "Nuestra Empresa";
  }, []);

  return (
    <>
      <PageSimpleHeader
        image={images.empresa}
        title={"ACTUALIDAD"}
        subtitle={"30 años evolucionando y desarrollando nuevos diseños haciendole honor a nuestra trayectoria."}
      />

      <section className="relative mx-auto flex h-full w-full flex-col gap-14 p-8 px-10">
        <motion.h2 {...zoomIn} className="text-center text-2xl font-bold text-dark drop-shadow-xl md:text-4xl">
          LA EMPRESA
        </motion.h2>

        <motion.article
          {...fadeInLeft()}
          className="mx-auto flex max-h-[300px] w-fit items-start gap-6 overflow-hidden lg:gap-20"
        >
          <img
            loading="lazy"
            className="h-[250px] min-w-[150px] rounded-xl md:min-w-[250px]"
            src={images.empresaTrabajador}
            alt="empreasa-trabajador"
          />
          <p className="max-w-[450px] text-start text-[11px] leading-[11px] sm:text-sm md:max-w-[520px] md:text-base lg:max-w-[580px] lg:text-lg">
            Desde <strong>1986</strong> nos dedicamos al <strong>diseño</strong>, <strong>produción</strong> y{" "}
            <strong>comercialización</strong> de luminarias para el área industrial, comercial y del hogar.{" "}
            <strong>Industria nacional</strong>. <br />
            <br /> Apostamos, desde nuestros inicios, a la industria nacional como <strong>pilar social</strong> y{" "}
            <strong>económico</strong> de un país. Por ello, hemos conformado un excelente grupo de trabajo y contamos
            con profesionales en todos los sectores. Nuestro departamento técnico esta a cargo de personal de primera
            línea con mas de <strong>20 años de experiencia</strong> en el desarrollo de productos de iluminación.
          </p>
        </motion.article>

        <motion.article
          {...fadeInRight()}
          className="mx-auto flex max-h-[300px] w-fit items-start gap-6 overflow-hidden lg:gap-20"
        >
          <p className="max-w-[450px] text-start text-[11px] leading-[11px] sm:text-sm md:max-w-[520px] md:text-base lg:max-w-[580px] lg:text-lg">
            Nuestra empresa posee <strong>más de 2000 m2</strong> destinados al área de producción, los cuales nos
            permiten realizar prácticamente todos los proceso de fabricación internamente. Nuestro departamento
            comercial y de marketing se encuentra al <strong>servicio del cliente y del usuario</strong>, respaldándose
            en las áreas antes mencionadas, le brindarán la <strong>solución adecuada</strong> a todos sus problemas e
            inquietudes lumínicas.
          </p>
          <img
            loading="lazy"
            className="h-[250px] min-w-[150px] rounded-xl md:min-w-[250px]"
            src={images.empresaTrabajador}
            alt="empreasa-trabajador"
          />
        </motion.article>

        <motion.article
          {...fadeInLeft()}
          className="mx-auto flex max-h-[300px] w-fit items-start gap-6 overflow-hidden lg:gap-20"
        >
          <img
            loading="lazy"
            className="h-[250px] min-w-[150px] rounded-xl md:min-w-[250px]"
            src={images.empresaTrabajador}
            alt="empreasa-trabajador"
          />
          <p className="max-w-[450px] text-start text-[11px] leading-[11px] sm:text-sm md:max-w-[520px] md:text-base lg:max-w-[580px] lg:text-lg">
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
    </>
  );
}
