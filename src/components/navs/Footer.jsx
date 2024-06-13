import { Button, Divider } from "@nextui-org/react";
import { Link, NavLink } from "react-router-dom";
import { links } from ".";
import AwsImage from "../images/AwsImage";
import FloatingLogos from "../images/FloatingLogos";
import { DefaultButton } from "..";

const socialNetworksIcons = [
  {
    icon: "ri-instagram-line",
    link: "https://www.instagram.com/spotsline_iluminacion/?hl=es-la",
    text: "@spotsline_iluminacion",
  },
  {
    icon: "ri-whatsapp-line",
    link: "https://api.whatsapp.com/send?phone=5491131441802&text=",
    text: "+54 911 31441802",
  },
  {
    icon: "ri-mail-line",
    link: "https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=spots@spotsline.com.ar",
    text: "spots@spotsline.com.ar",
  },
  {
    icon: "ri-map-pin-line",
    link: "https://maps.app.goo.gl/bwMPFj61VBXV9kUy7",
    text: "Pedro I. Rivera 5915/23, Buenos Aires, Argentina",
  },
];

export default function Footer() {
  return (
    <>
      {/* MOBILE */}{" "}
      <section className="relative flex flex-col items-center gap-6 overflow-hidden bg-gradient-to-b from-background to-primary py-6 lg:gap-10 lg:py-10">
        <div className="z-10 my-10 flex  flex-col gap-5 text-center lg:gap-10">
          <h2 className="text-2xl font-semibold uppercase text-secondary md:text-3xl">
            {new Date().getFullYear() - 1986} AÑOS
          </h2>
          <p className="text-md font-medium text-secondary/80 md:text-xl">
            EVOLUCIONANDO Y DESARROLLANDO NUEVOS DISEÑOS <br /> HACIÉNDOLE HONOR A NUESTRA TRAYECTORIA.
          </p>

          <DefaultButton as={Link} to={"/nosotros"} className="mx-auto w-max min-w-[20vw] shadow-xl">
            CONOCENOS
          </DefaultButton>
        </div>
      </section>
      <footer className="grid gap-10 bg-gradient-to-b from-primary to-background pt-10 lg:hidden">
        <div className="mx-auto grid w-[80%] gap-2">
          <h1 className="mx-auto text-xl tracking-wider">SPOTSLINE</h1>
          <p className="mx-auto -mt-4 font-slogan text-lg font-bold">Se ve bien.</p>
          <div className="flex items-center justify-around">
            {socialNetworksIcons.map(({ icon, link }, index) => (
              <Button
                isIconOnly
                onPress={() => window.open(link)}
                key={index}
                radius="full"
                className="bg-gradient-to-tl from-primary to-background shadow-xl"
              >
                <i className={`${icon} text-2xl font-bold text-secondary`} />
              </Button>
            ))}
          </div>
        </div>
        <Button
          radius="full"
          isIconOnly
          onPress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mx-auto bg-gradient-to-tl from-primary to-background p-8 shadow-xl "
        >
          <i className="ri-arrow-up-s-line text-xl font-bold text-secondary" />
        </Button>
        <p className="self-end px-4 pb-1 text-center font-secondary text-sm text-secondary">
          © Copyright {new Date().getFullYear()} Spotsline - Todos los Derechos Reservados
        </p>
      </footer>
      {/* DESKTOP */}
      <footer className="relative hidden gap-10 bg-gradient-to-b  from-primary to-background pt-10 lg:grid">
        <FloatingLogos qty={1} positions={["-top-40 -right-60"]} size={"w-[50vw]"} />
        <section className="flex w-full items-start justify-between gap-4  px-20">
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <AwsImage type="logos" identify="logoBlack" width={80} />
              <p className="mr-2 text-lg font-semibold">SPOTSLINE</p>
            </div>
            <span className="mt-2 w-40  text-center font-secondary text-xs">
              Es una empresa argentina que hace {new Date().getFullYear() - 1994} años se dedica al diseño, producción y
              comercialización de luminarias para el área industrial, comercial y del hogar.
            </span>
          </div>
          <div className="flex flex-col ">
            <p className="mx-auto mb-4 text-lg font-semibold">MENÚ</p>
            {links.map(({ name, path }, index) => (
              <NavLink
                to={path}
                key={index}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group -mt-1 flex items-center gap-3   hover:cursor-pointer"
              >
                <i className="ri-lightbulb-line tranisiton bg-gradient-to-tl from-secondary to-background bg-clip-text text-xl font-bold text-transparent  transition  group-hover:animate-glow group-hover:text-white" />
                <span className="font-secondary  capitalize group-hover:drop-shadow-xl">{name}</span>
              </NavLink>
            ))}
          </div>
          <div className="flex flex-col">
            <p className="mx-auto mb-4 text-lg font-semibold">CONTACTO</p>
            {socialNetworksIcons.map(({ icon, link, text }, index) => (
              <div
                key={index}
                className="group -mt-1 flex items-center gap-3  hover:cursor-pointer"
                onClick={() => window.open(link)}
              >
                <i
                  className={`${icon} tranisiton bg-gradient-to-tl from-secondary to-background bg-clip-text text-xl font-bold text-transparent  group-hover:scale-125 group-hover:animate-glow group-hover:text-white`}
                />
                <span className="w-40 font-secondary group-hover:drop-shadow-xl">{text}</span>
              </div>
            ))}
          </div>
          <div></div>
          <div className="flex flex-col items-center gap-10">
            <Button
              isIconOnly
              radius="full"
              onPress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mx-auto bg-gradient-to-tl from-primary to-background p-8 shadow-xl hover:scale-125 "
            >
              <i className="ri-arrow-up-s-line text-4xl  text-secondary" />
            </Button>
            <h1 className="font-slogan text-4xl font-bold drop-shadow-xl">Se ve bien.</h1>
          </div>
        </section>
        <Divider />
        <p className="self-end px-4 pb-1 text-center font-secondary text-sm text-secondary drop-shadow-2xl">
          © Copyright {new Date().getFullYear()} Spotsline - Todos los Derechos Reservados
        </p>
      </footer>
    </>
  );
}
