import { assets } from "src/assets";
import AwsImage from "src/components/images/AwsImage";

export function Rrhh() {
  console.log(assets.rrhh[6]);
  return (
    <section className="min-h-screen ">
      <figure className={` flex flex-col justify-center mt-16 md:mt-24 bg-cover h-[250px] md:h-[350px] md:bg-top bg-[url(https://spotsline-bucket.s3.amazonaws.com/rrhh/rrhh-06.jpg)]`}>
        <span className=" ml-10  w-fit text-white text-2xl md:text-4xl ">
          <strong><h1 className="">PODEMOS SER</h1></strong>
          <h1 className="">LO QUE ESTAS BUSCANDO</h1>
        </span>
      </figure>
      <header className="w-[90%] mx-auto mt-5">
        <strong>
          <h1 className="text-black text-4xl">RECURSOS</h1>
        </strong>
        <strong><h1 className="text-primary text-4xl">HUMANOS</h1></strong>
        <span className="">
          <picture className="flex flex-col gap-2 my-6">
            {
              Object.values(assets.rrhh).map(img => {
                const id = img.slice(-5, -4);
                console.log(id);
                return <AwsImage key={id} type="rrhh" identify={id}/>;
              })
            }
          </picture>
        </span>
      </header>
    </section>
  );
}


// En Spotsline somos un gran equipo humano y profesional.

// La esencia de nuestro trabajo es conectar con los clientes y sus necesidades.

// Si te gustan los desafíos, tenés ganas de aprender y querés formar parte de nuestro equipo, adjuntá tu CV o escribinos a rrhh@spotsline.com.ar