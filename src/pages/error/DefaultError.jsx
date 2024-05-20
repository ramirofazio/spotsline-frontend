import { useRouteError, Link } from "react-router-dom";
import AwsImage from "src/components/images/AwsImage";

export function DefaultError({ link }) {
  console.log(useRouteError());

  return (
    <main id="error-page" className="grid h-screen w-screen place-items-center bg-gradient-to-tr from-dark to-dark/80">
      <Link to={link ? link : -1} className="icons absolute left-4 top-4 flex items-center">
        <i className="ri-arrow-left-s-line white-neon  animate-pulse text-4xl" />
        <p className="white-neon font-secondary">VOLVER</p>
      </Link>
      <section className="relative flex max-w-[80vw] flex-col items-center gap-3 overflow-hidden rounded-xl p-10 py-40 text-center text-background shadow-2xl">
        <div className="toolsBg absolute inset-0 h-full w-full opacity-50 blur-sm" />
        <i className="ri-information-line yellow-neon animate-pulse text-7xl" />

        <div className="z-20 space-y-4">
          <h1 className="text-2xl font-bold uppercase underline">Not Found (aka 404)</h1>
          <p className="font-secondary lg:text-sm">
            Estás buscando algo que no existe, no ha existido, no existirá, tal vez no exista o no deba existir...
          </p>
          <p className="font-secondary lg:text-sm">
            ...pero siempre eres bienvenido/a a volver al
            <Link to={link ? link : "/"} className="yellow-neon ml-1 font-extrabold tracking-widest underline">
              INICIO.
            </Link>
          </p>
          <div className="absolute -bottom-20 -left-20">
            <AwsImage type="logos" identify="logoWhite" className="w-72 rotate-12" />
          </div>
          <div className="absolute -right-20 -top-10">
            <AwsImage type="logos" identify="logoWhite" className="w-72 -rotate-45" />
          </div>
        </div>
      </section>
    </main>
  );
}
