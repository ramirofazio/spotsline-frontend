import { assets } from "src/assets";
import AwsImage from "src/components/images/AwsImage";

export function Rrhh() {
  console.log(assets.rrhh[6]);
  return (
    <section className="min-h-screen ">
      <figure className={` flex flex-col justify-center mt-16 md:mt-24 bg-cover h-[250px] md:h-[350px] md:bg-top bg-[url(${assets.rrhh[6]})]`}>
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
      </header>
    </section>
  );
}