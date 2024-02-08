import { useEffect } from "react";
import { DefaultButton } from "../../components/buttons";

export function Company() {
  useEffect(() => {
    document.title = "Nuestra Empresa";
  }, []);

  return (
    <main className="">
      <picture className="flex min-h-[500px] bg-empresaScaled bg-cover bg-center bg-no-repeat object-contain text-center">
        <span className="my-auto ml-5 md:w-[50%]">
          <h1 className="mx-auto text-4xl font-bold text-white">ACTUALIDAD</h1>
          <h2 className="font-secondary text-3xl text-white">
            30 AÑOS EVOLUCIONANDO Y DESARROLLANDO NUEVOS DISEÑOS HACIÉNDOLE HONOR A NUESTRA TRAYECTORIA.
          </h2>
        </span>
      </picture>
      <section className="mx-auto mt-10 grid w-[90%] grid-rows-2 md:my-4 md:grid-cols-2">
        <span className="p-5  md:my-auto">
          <h1 className="font-primary text-4xl">LA EMPRESA</h1>
          <p className="text-xl ">
            Desde 1986 nos dedicamos al diseño, producción y comercialización de luminarias para el área industrial,
            comercial y del hogar. industria nacional.
            <br />
            <br />
            Apostamos, desde nuestros inicios, a la industria nacional como pilar social y económico de un país. Por
            ello, hemos conformado un excelente grupo de trabajo y contamos con profesionales en todos los sectores.
            Nuestro departamento técnico esta a cargo de personal de primera línea con mas de 20 años de experiencia en
            el desarrollo de productos de iluminación.
            <br />
            <br />
            Nuestra empresa posee más de 2000 m2 destinados al área de producción, los cuales nos permiten realizar
            prácticamente todos los proceso de fabricación internamente. Nuestro departamento comercial y de marketing
            se encuentra al servicio del cliente y del usuario, respaldándose en las áreas antes mencionadas, le
            brindarán la solución adecuada a todos sus problemas e inquietudes lumínicas.
            <br />
            <br />
            Como hemos mencionado anteriormente, somos una empresa nacional que desde el día de su fundación, ha crecido
            con honestidad y esfuerzo. Es nuestro objetivo que este sitio web pueda satisfacer todas vuestras
            necesidades y permita una mayor conexión entre ustedes y nuestra gente. Gracias por contar con nosotros.
          </p>
          <a
            target="_blank"
            href="https://www.spotsline.com.ar/wp-content/uploads/2022/08/Politica-de-garantia-y-devoluciones.pdf"
            className="mx-auto w-fit"
          >
            <DefaultButton text="POLITICA DE GARANTÍA Y DEVOLUCIÓN" className="my-3" />
          </a>
        </span>

        <picture className="p-5 md:my-auto">
          <img
            className="rounded-lg shadow-lg shadow-slate-300 "
            src="https://www.spotsline.com.ar/wp-content/uploads/2021/05/img-empresa-2021-1024x1024.jpg"
            alt="trabajador"
          />
        </picture>
      </section>
    </main>
  );
}
