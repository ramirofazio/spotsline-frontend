import { assets } from "src/assets/index.js";
import { Contact } from "./Contact.jsx";

export function Rrhh() {
  return (
    <section className="min-h-screen">
      <header className="relative h-[300px] flex-col items-center justify-center overflow-hidden">
        <img
          src={assets.rrhh[4]}
          className="absolute w-full blur-md lg:-top-80"
          alt="landingBackground"
          loading="eager"
        />
        <h1 className="absolute inset-0 top-0 mx-auto w-fit translate-y-1/2 font-primary text-2xl font-thin  uppercase text-white">
          <strong className="font-extrabold">PODEMOS</strong>
          <br />
          SER LO QUE ESTÁS BUSCANDO
        </h1>
      </header>
      <Contact />
      <div className="mx-auto mb-6 h-fit w-full rounded-sm  p-6">
        <div className="w-500 relative h-96 border-2 border-primary text-right">
          <div className="h-full overflow-hidden bg-none">
            <iframe
              className="h-full w-full"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=Spotsline+Srl%2C+CGA%2C+Pedro+Ignacio+de+Rivera+5915%2C+B1606+Munro%2C+Provincia+de+Buenos+Aires&t=&z=15&ie=UTF8&iwloc=&output=embed"
              // frameBorder="0"
              // scrolling="no"
              // marginHeight="0"
              // marginWidth="0"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
