import { assets } from "src/assets";
import AwsImage from "src/components/images/AwsImage";
import { Contact } from "./Contact.jsx";

export function Rrhh() {
  return (
    <section className="min-h-screen ">
      <figure
        className={` mt-16 flex h-[250px] flex-col justify-center bg-[url(https://spotsline-bucket.s3.amazonaws.com/rrhh/rrhh-06.jpg)] bg-cover md:mt-24 md:h-[350px] md:bg-top`}
      >
        <span className=" ml-10  w-fit text-2xl text-white md:text-4xl ">
          <strong>
            <h1 className="">PODEMOS SER</h1>
          </strong>
          <h1 className="">LO QUE ESTAS BUSCANDO</h1>
        </span>
      </figure>
      <article className="mx-auto mt-5 w-[90%]">
        <strong>
          <h1 className="text-4xl text-black">RECURSOS</h1>
        </strong>
        <strong>
          <h1 className="text-4xl text-primary">HUMANOS</h1>
        </strong>
        <article className="my-6 gap-3  sm:grid sm:grid-cols-3">
          <span className="col-span-2 flex flex-col gap-4 ">
            <strong>
              <p className="text-xl">¿Queres unirte?</p>
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
              <strong>nuestro equipo</strong>, adjuntá tu <strong>CV</strong> o escribinos a{" "}
              <u>rrhh@spotsline.com.ar</u>
            </p>
            <Contact />
            <div className="h-fit rounded-sm border-2 border-primary">
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
          </span>
          <picture className="mt-2 grid grid-cols-2 place-items-center justify-around gap-2 sm:col-span-1 sm:ml-auto sm:flex  sm:flex-col">
            {Object.values(assets.rrhh).map((img) => {
              const id = img.slice(-5, -4);
              return <AwsImage className="w-full " key={id} type="rrhh" identify={id} />;
            })}
          </picture>
        </article>
      </article>
    </section>
  );
}
