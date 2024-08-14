import { useRouteError, Link } from "react-router-dom";
import { GoBackButton } from "src/components/buttons/GoBackButton";

export function DefaultError({ link }) {
  console.log(useRouteError());

  return (
    <main id="error-page" className="grid h-screen w-screen place-items-center bg-background">
      <GoBackButton link={link ? link : -1} className={"absolute left-4 top-4"} />
      <section className="relative flex max-w-[80vw] flex-col items-center gap-3 overflow-hidden rounded-xl bg-dark p-10 py-20 text-center text-background shadow-2xl">
        <div className="toolsBg absolute inset-0 h-full w-full opacity-50 blur-sm" />
        <i className="ri-information-line animate-pulse text-7xl text-primary" />
        <div className="z-20 space-y-10">
          <h1 className="text-2xl font-bold uppercase underline">Not Found (aka 404)</h1>
          <p className="lg:text-md mx-auto font-secondary lg:max-w-[60%]">
            Estás buscando algo que no existe, no ha existido, no existirá, tal vez no exista o no deba existir...
          </p>
          <p className="lg:text-md mx-auto font-secondary lg:max-w-[60%]">
            ...pero siempre eres bienvenido/a a volver al
            <Link to={link ? link : "/"} className="ml-1 font-extrabold tracking-widest text-primary underline">
              INICIO.
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
