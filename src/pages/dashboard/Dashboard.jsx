import { Suspense, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DefaultButton } from "src/components";
import FloatingLogos from "src/components/images/FloatingLogos";
import { Button, Divider, Spinner } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeIn, fadeInTop, zoomIn } from "src/styles/framerVariants";
import Loader from "src/components/Loader";

const selectButtonsData = [
  { name: "VENDEDORES", startIcon: "customer-service", link: "/dashboard/vendedores" },
  { name: "PRODUCTOS", startIcon: "image-2", link: "/dashboard/productos" },
  { name: "CUPONES", startIcon: "coupon-2", link: "/dashboard/cupones" },
  { name: "CLIENTES", startIcon: "user-3", link: "/dashboard/clientes/1" },
  { name: "ORDENES", startIcon: "shopping-cart-2", link: "/dashboard/ordenes" },
];

const sidebarVariants = {
  hidden: { width: "0%", opacity: 0, position: "absolute" },
  visible: { width: "100%", opacity: 1 },
};

export default function Dashboard({ children }) {
  const [hide, setHide] = useState(false);
  const [loading, setLoading] = useState("");

  return (
    <main>
      <DashboardNavBar hide={hide} setHide={setHide} />
      <section className="relative grid grid-cols-1 overflow-hidden lg:grid-cols-4">
        <FloatingLogos
          qty={4}
          positions={[
            "-left-40 -top-20 -rotate-45",
            "-right-40 -top-40 rotate-45",
            "-left-40 -bottom-32 rotate-180",
            "-right-40 -bottom-40",
          ]}
          size={"w-80 lg:w-[30vw]"}
        />
        <motion.div
          className="flex flex-col items-center gap-2 p-6 text-center lg:col-span-1 lg:pt-20"
          initial={hide ? "hidden" : "visible"}
          animate={hide ? "hidden" : "visible"}
          exit="hidden"
          variants={sidebarVariants}
        >
          <SelectButtons loading={loading} setLoading={setLoading} children={children} />
        </motion.div>
        <Divider className="h-[3px] rounded-xl bg-gradient-to-r from-primary to-yellow-600 lg:hidden" />
        <div
          className={`pt-61 min-h-[80vh] px-2 lg:py-10 lg:pr-10 lg:pt-20 ${
            hide ? "pl-10 lg:col-span-4" : "lg:col-span-3"
          } ${loading && "flex items-center justify-center"}`}
        >
          <Suspense key={children}>{loading ? <Spinner color="secondary" /> : children}</Suspense>
        </div>
      </section>
    </main>
  );
}

export function DashboardNavBar({ hide, setHide }) {
  const navigate = useNavigate();

  return (
    <>
      <nav className="relative flex flex-col overflow-hidden bg-dark/20 p-6 px-10 shadow-xl">
        <FloatingLogos
          qty={2}
          logoColour={["Yellow", "Black"]}
          positions={["-left-20 -bottom-10", "-right-20 -top-10"]}
          size={"w-40 lg:w-60"}
        />
        <section className="z-10 flex w-full items-center justify-between">
          <div className="text-center text-xl font-bold">
            <h2 className="text-2xl font-semibold tracking-wide lg:text-3xl">SPOTSLINE</h2>
            <p className="-mt-3 font-slogan lg:-mt-2 lg:text-xl">Se ve bien.</p>
          </div>
          <DefaultButton
            startContent={<i className="ri-logout-circle-line text-xl font-bold" />}
            className={"text-md !w-auto lg:!w-40"}
            onPress={() => navigate("/")}
          >
            <p className="hidden lg:inline">SALIR</p>
          </DefaultButton>
        </section>
      </nav>
      <section className="w-full  bg-background p-6 lg:p-10">
        <Button
          className="absolute hidden w-40 rounded-full bg-gradient-to-r from-primary to-yellow-200 font-semibold lg:flex"
          size="lg"
          onPress={() => setHide(!hide)}
        >
          <i className={`ri-arrow-left-double-line text-2xl transition ${hide && "rotate-180"}`} />
          {hide ? "MOSTRAR" : "OCULTAR"}
        </Button>
        <h1 className="text-center text-xl font-bold text-secondary lg:text-2xl xl:text-4xl">PANEL DE ADMINISTRADOR</h1>
      </section>
      <Divider className="h-[3px] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
    </>
  );
}

function SelectButtons({ loading, setLoading, children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handlePress = (name, link) => {
    setLoading(name);

    if (name === "PRODUCTOS") {
      navigate(`${link}/1`);
    } else {
      navigate(link);
    }

    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  useEffect(() => {
    setLoading(false);
  }, [children, pathname]);
  return (
    <>
      {selectButtonsData.map(({ name, startIcon, link }) => (
        <DefaultButton
          key={name}
          onPress={() => handlePress(name, link)}
          isDisabled={loading === name}
          startContent={
            <AnimatePresence mode="wait">
              {loading === name ? (
                <motion.div className="absolute left-10 flex items-center justify-center" {...fadeIn()}>
                  <Spinner color="secondary" />
                </motion.div>
              ) : (
                <motion.div className="absolute left-10 flex items-center justify-center" {...fadeIn()}>
                  <i
                    className={`ri-${startIcon}-fill  text-xl text-dark ${pathname.includes(link) && "animate-pulse"}`}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          }
          endContent={
            <i
              className={`ri-arrow-right-s-line absolute right-10 text-xl text-dark transition lg:rotate-90 ${
                pathname.includes(link) && "rotate-90 animate-pulse lg:!rotate-0"
              }`}
            />
          }
          className={`xl:!w-80 ${pathname.includes(link) && "from-yellow-200 to-primary"}`}
        >
          {name}
        </DefaultButton>
      ))}
      {pathname.includes("ordenes") && (
        <motion.p
          {...fadeInTop()}
          className="mt-4 flex w-full items-center gap-4 rounded-md border-2 border-primary bg-primary/20 p-2 text-left text-sm"
        >
          <i className="ri-information-line animate-pulse text-2xl" />
          Estas ordenes no estan sincronizadas con el sistema, son ordenes creadas desde esta WEB. Para consultar todas
          las ordenes revisar el sistema.
        </motion.p>
      )}
    </>
  );
}
