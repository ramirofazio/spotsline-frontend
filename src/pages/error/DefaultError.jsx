import { useRouteError, Link } from "react-router-dom";
import logo from "src/assets/logo.png";

export function DefaultError() {
  console.log(useRouteError());

  return (
    <div
      id="error-page"
      className="mx-auto grid h-screen place-content-center place-items-center gap-6 p-4 text-center outline"
    >
      <h1 className="textGoldGradient border-gold border-b-[1px] lg:text-3xl">Not Found (aka 404)</h1>
      <p className="lg:text-sm">
        Estás buscando algo que no existe, no ha existido, no existirá, tal vez no exista o no deba existir ...
      </p>
      <p className="lg:text-sm">
        ... pero siempre eres bienvenido/a a volver al
        <Link to="/" className="icons ml-2 border-b-[1px] border-yellow">
          Inicio.
        </Link>
      </p>
      <Link to="/">
        <img src={logo} className="w-20 hover:cursor-pointer lg:w-32" />
      </Link>
    </div>
  );
}
