import { images } from "src/assets/index.js";
import { Contact } from "./Contact.jsx";
import PageSimpleHeader from "src/components/PageHeader.jsx";
import { useEffect } from "react";

export function Rrhh() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="min-h-screen">
      <PageSimpleHeader
        image={images.empresaWorkspace1}
        title={"¿Queres unirte?"}
        subtitle={"En Spotsline somos un gran equipo humano y profesional."}
      />
      <Contact />
      <div className="mx-auto mb-6 h-fit w-full  p-6 md:hidden">
        <div className="w-500 relative h-96 rounded-md border-2 border-primary text-right">
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
