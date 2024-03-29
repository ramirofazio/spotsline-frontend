import { useRouteError, Link } from "react-router-dom";
import AwsImage from "src/components/images/AwsImage";

export function DefaultError() {
  console.log(useRouteError());

  return (
    <main
      id="error-page"
      className="grid h-screen w-screen place-items-center bg-gradient-to-tl from-dark/40 to-primary/50"
    >
      <Link to="/" className="icons absolute left-4 top-4 flex items-center">
        <i className="ri-arrow-left-s-line white-neon  animate-pulse text-4xl" />
        <p className="white-neon font-secondary">VOLVER</p>
      </Link>
      <section className="relative flex max-w-[80vw] flex-col items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-br from-dark/40 to-primary/50 p-10 py-40 text-center shadow-2xl">
        <i className="ri-information-line yellow-neon  animate-pulse text-7xl" />

        <h1 className="text-2xl font-bold uppercase underline">Not Found (aka 404)</h1>
        <p className="font-secondary lg:text-sm">
          Estás buscando algo que no existe, no ha existido, no existirá, tal vez no exista o no deba existir...
        </p>
        <p className="font-secondary lg:text-sm">
          ...pero siempre eres bienvenido/a a volver al
          <Link to="/" className="yellow-neon ml-1 font-extrabold tracking-widest underline">
            INICIO.
          </Link>
        </p>
        <div className="absolute -bottom-20 -left-20">
          <AwsImage type="logos" identify="logoBlack" className="w-72 rotate-12" />
        </div>
        <div className="absolute -right-20 -top-10">
          <AwsImage type="logos" identify="logoWhite" className="w-72 -rotate-45" />
        </div>
      </section>
    </main>
  );
}
