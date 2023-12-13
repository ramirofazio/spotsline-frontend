import { DefaultButton } from "../../components/buttons";

export function Company() {
  return (
    <main className="">
      <picture className="flex bg-cover bg-center bg-no-repeat object-contain bg-empresaScaled min-h-[500px] text-center">
          <span className="my-auto md:w-[50%] ml-5">

          <h1 className="text-4xl font-bold text-white mx-auto">ACTUALIDAD</h1>
          <h2 className="text-3xl text-white font-secondary">
            30 AÑOS EVOLUCIONANDO Y DESARROLLANDO NUEVOS DISEÑOS HACIÉNDOLE HONOR A NUESTRA TRAYECTORIA.
          </h2>
          </span>
      </picture>
      <section className="mx-auto mt-10 md:my-4 grid w-[90%] grid-rows-2 md:grid-cols-2">
        <span className="md:my-auto  p-5">
          <h1 className="text-4xl font-primary">LA EMPRESA</h1>
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
          <div className="w-fit  mx-auto">
            <DefaultButton text="POLITICA DE GARANTÍA Y DEVOLUCIÓN" className="my-3" />
          </div>
        </span>

        <picture className="md:my-auto p-5">
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
