import { Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { DefaultButton } from "..";
import { images } from "src/assets";
import { twMerge } from "tailwind-merge";

const SOCIAL_ICONS = [
  { link: "https://api.whatsapp.com/send?phone=5491131441802&text=", icon: "ri-whatsapp-line" },
  { link: "https://www.instagram.com/spotsline_iluminacion/?hl=es-la", icon: "ri-instagram-line" },
  {
    link: "https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=spots@spotsline.com.ar",
    icon: "ri-mail-line",
  },
];

const MENU = [
  { name: "Inicio", link: "/" },
  { name: "Productos", link: "/productos/1" },
  { name: "Iniciar Sesión", link: "/sign-in" },
];

const LA_EMPRESA = [
  { name: "Empresa", link: "/empresa" },
  { name: "Recursos Humanos", link: "/rrhh" },
];

const INFORMACION_LEGAL = [
  { name: "Política de privacidad", link: "#" },
  { name: "Términos y condiciones", link: "#" },
];

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-gradient-to-b from-background to-primary/80 pb-5">
      <section className="relative flex flex-col items-center gap-6 overflow-hidden py-6 lg:gap-10 lg:py-10">
        <div className="z-10 my-10 flex  flex-col gap-5 px-10 text-center lg:gap-10">
          <h2 className="text-2xl font-semibold uppercase text-secondary md:text-3xl">
            {new Date().getFullYear() - 1986} AÑOS
          </h2>
          <p className="text-md font-medium text-secondary/80 md:text-xl">
            EVOLUCIONANDO Y DESARROLLANDO NUEVOS DISEÑOS <br className="hidden md:block" /> HACIÉNDOLE HONOR A NUESTRA
            TRAYECTORIA.
          </p>
          <DefaultButton as={Link} to={"/nosotros"} className="mx-auto w-max min-w-[20vw] shadow-xl">
            CONOCENOS
          </DefaultButton>
        </div>
      </section>
      <section className="relative flex w-full flex-col gap-10 px-10 text-[13px] text-dark lg:mx-auto lg:w-[100%] lg:flex-row lg:justify-between lg:px-20 lg:py-20 lg:text-[20px]">
        <div className="z-10 space-y-10 lg:w-[30vw] xl:space-y-8 2xl:space-y-10">
          <p className="font-primary text-4xl font-semibold tracking-widest text-dark">SPOTSLINE</p>
          <div>
            <p className="yellowGradient text-[20px] font-semibold xl:text-2xl">Seguinos en</p>
            <div className="mt-4 flex items-center gap-6">
              {SOCIAL_ICONS.map(({ icon, link }, index) => (
                <a href={link} key={index}>
                  <i className={twMerge(icon, "icons text-3xl font-medium text-secondary")} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="items-start justify-between space-y-10 lg:flex lg:w-[70vw] lg:space-y-0 xl:w-full">
          <FooterItem data={MENU} title="Menu" />
          <FooterItem data={LA_EMPRESA} title="La Empresa" />
          <FooterItem data={INFORMACION_LEGAL} title="Información Legal" />
        </div>
        <p className="w-full border-t-[1.5px] border-dark pt-2 text-center text-[12px] font-medium text-secondary md:text-left lg:hidden">
          Derechos de autor {new Date().getFullYear()} Spotsline SRL. <br className="md:hidden" /> Todos los derechos
          reservados.
        </p>
        <div className="absolute bottom-0 left-0 hidden -translate-x-32 translate-y-52 lg:block">
          <Image src={images.logoBlack} alt="logo-black" className="w-[500px] rotate-12 blur-lg" />
        </div>
        <div className="absolute right-0 top-0 -translate-y-40 translate-x-52">
          <Image src={images.logoBlack} alt="logo-black" className="w-[500px] -rotate-45 blur-md" />
        </div>
      </section>
      <div className="hidden space-y-2 px-20  pb-10 lg:block">
        <div className="mx-auto h-[1.5px] bg-dark" />
        <p className="mx-auto text-[12px]  font-medium text-secondary">
          Derechos de autor {new Date().getFullYear()} Spotsline SRL. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
const FooterItem = ({ data, title }) => {
  return (
    <article className="flex w-full flex-col gap-5">
      <h5 className="yellowGradient text-[20px] font-semibold xl:text-2xl">{title}</h5>
      {data.map(({ link, name }, index) => (
        <a href={link} key={index} className="w-fit">
          <p className="hover:text-primary-violet icons text-[15px] font-medium text-secondary transition xl:text-lg">
            <i className="ri-arrow-right-s-line" /> {name}
          </p>
        </a>
      ))}
    </article>
  );
};
