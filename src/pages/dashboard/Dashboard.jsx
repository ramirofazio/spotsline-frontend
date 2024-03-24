import { useNavigate } from "react-router-dom";
import { DefaultButton } from "src/components";
import FloatingLogos from "src/components/images/FloatingLogos";
import { Coupons, Orders, Products, Users } from "./index";
import { Button, Divider } from "@nextui-org/react";
import { getOfStorage, saveInStorage } from "src/utils/localStorage";
import { useState } from "react";

const selectButtonsData = [
  { name: "PRODUCTOS", startIcon: "image-2", component: <Products /> },
  { name: "CUPONES", startIcon: "coupon-2", component: <Coupons /> },
  { name: "ORDENES", startIcon: "shopping-cart-2", component: <Orders /> },
  { name: "USUARIOS", startIcon: "user-3", component: <Users /> },
];
export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState(() => {
    const local = getOfStorage("selectedSection");
    if (local) {
      return local;
    }

    return "MI PERFIL";
  });

  return (
    <main>
      <DashboardNavBar />
      <section className="grid grid-cols-1 lg:h-screen lg:grid-cols-3">
        <div className="flex flex-col items-center gap-2 p-6 text-center lg:col-span-1 lg:p-20">
          <SelectButtons selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
        </div>
        <Divider className="h-[3px] rounded-xl bg-gradient-to-r from-primary to-yellow-600 lg:hidden" />
        <div className="p-6 lg:col-span-2 lg:p-20">
          {selectButtonsData.map(({ name, component }, index) => (
            <div key={index}>{name === selectedSection && component}</div>
          ))}
        </div>
      </section>
      <Divider className="h-[3px] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
      <div className="flex flex-col items-center p-6">
        <Button
          isIconOnly
          className="rounded-full bg-gradient-to-t from-primary to-yellow-200  p-6 shadow-xl hover:scale-110"
          onPress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <i className="ri-arrow-up-s-line text-4xl  text-secondary" />
        </Button>
        <h1 className="font-slogan text-2xl font-bold drop-shadow-xl">Se ve bien.</h1>
      </div>
    </main>
  );
}

export function DashboardNavBar() {
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
        <h1 className="text-center text-xl font-bold text-secondary lg:text-2xl">PANEL DE ADMINISTRADOR</h1>
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
