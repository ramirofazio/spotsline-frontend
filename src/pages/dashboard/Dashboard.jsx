import { useNavigate } from "react-router-dom";
import { DefaultButton } from "src/components";
import FloatingLogos from "src/components/images/FloatingLogos";
import { Coupons, Orders, Products, Users } from "./index";
import { Button, Divider } from "@nextui-org/react";
import { getOfStorage, saveInStorage } from "src/utils/localStorage";
import { useState } from "react";
import { motion } from "framer-motion";

const selectButtonsData = [
  { name: "PRODUCTOS", startIcon: "image-2", component: <Products /> },
  { name: "CUPONES", startIcon: "coupon-2", component: <Coupons /> },
  { name: "ORDENES", startIcon: "shopping-cart-2", component: <Orders /> },
  { name: "USUARIOS", startIcon: "user-3", component: <Users /> },
];

const sidebarVariants = {
  hidden: { width: "0%", opacity: 0, position: "absolute" },
  visible: { width: "100%", opacity: 1 },
};

export default function Dashboard() {
  const [hide, setHide] = useState(false);
  const [selectedSection, setSelectedSection] = useState(() => {
    const local = getOfStorage("selectedSection");
    if (local) {
      return local;
    }

    return "MI PERFIL";
  });

  return (
    <main>
      <DashboardNavBar hide={hide} setHide={setHide} />
      <section className="grid grid-cols-1 lg:grid-cols-4">
        <motion.div
          className="flex flex-col items-center gap-2 p-6 text-center lg:col-span-1 lg:p-20"
          initial={hide ? "hidden" : "visible"}
          animate={hide ? "hidden" : "visible"}
          exit="hidden"
          variants={sidebarVariants}
        >
          <SelectButtons selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
        </motion.div>
        <Divider className="h-[3px] rounded-xl bg-gradient-to-r from-primary to-yellow-600 lg:hidden" />
        <motion.div className={`px-2 pt-6 lg:pt-20 ${hide ? "lg:col-span-4" : "lg:col-span-3"}`}>
          {selectButtonsData.map(({ name, component }, index) => (
            <div key={index}>{name === selectedSection && component}</div>
          ))}
        </motion.div>
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

function SelectButtons({ selectedSection, setSelectedSection }) {
  const handleSelect = (name) => {
    setSelectedSection(name);
    saveInStorage("selectedSection", name);
  };

  return selectButtonsData.map(({ name, startIcon }) => (
    <DefaultButton
      key={name}
      onPress={() => handleSelect(name)}
      startContent={<i className={`ri-${startIcon}-fill text-xl text-dark transition`} />}
      endContent={
        <i
          className={`ri-arrow-right-s-line text-xl text-dark transition lg:rotate-90 ${
            selectedSection === name && "rotate-90 lg:!rotate-0"
          }`}
        />
      }
      className={`xl:!w-80 ${selectedSection === name && "!scale-110 from-dark/20 to-dark/20"}`}
    >
      {name}
    </DefaultButton>
  ));
}
