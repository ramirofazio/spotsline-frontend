import { Contact } from "./Contact.jsx";

export function Rrhh() {
  return (
    <section className="min-h-screen ">
      <figure
        className={` mt-16 flex h-[250px] flex-col justify-center bg-[url(https://spotsline-bucket.s3.amazonaws.com/rrhh/rrhh-06.jpg)] bg-cover md:mt-24 md:h-[350px] md:bg-top`}
      >
        <span className=" ml-10  w-fit text-2xl text-white md:text-4xl  ">
          <strong>
            <h1 className="">PODEMOS SER</h1>
          </strong>
          <h1 className="">LO QUE ESTAS BUSCANDO</h1>
        </span>
      </figure>
      <article className="mx-auto mt-5 flex w-[90%] flex-col items-start  ">
        <h2 className=" mt-4 w-fit text-4xl font-bold tracking-wider text-black drop-shadow-xl lg:text-5xl">
          RECURSOS <br /> <span className="text-primary">HUMANOS</span>
        </h2>
        <span className="my-6  w-fit max-w-[550px] sm:text-xl  lg:max-w-[650px] lg:text-2xl">
          <strong>
            <p className="text-xl sm:text-2xl lg:text-3xl">¿Queres unirte?</p>
          </strong>
          <p>
            En <strong>Spotsline</strong> somos un gran equipo humano y profesional.
          </p>
          <p>
            La esencia de nuestro trabajo es <strong>conectar</strong> con los clientes y sus{" "}
            <strong>necesidades</strong>.
          </p>
          <p>
            Si te gustan los <strong>desafíos</strong>, tenés ganas de aprender y querés formar parte de{" "}
            <strong>nuestro equipo</strong>, adjuntá tu <strong>CV</strong> o escribinos a <u>rrhh@spotsline.com.ar</u>
          </p>
        </span>
        <Contact />
        <div className="mb-6 h-fit w-full rounded-sm border-2 border-primary">
          <div className="w-500 relative h-96 text-right">
            <div className="h-full overflow-hidden bg-none">
              <iframe
                className="h-full w-full"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=Spotsline+Srl%2C+CGA%2C+Pedro+Ignacio+de+Rivera+5915%2C+B1606+Munro%2C+Provincia+de+Buenos+Aires&t=&z=15&ie=UTF8&iwloc=&output=embed"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
