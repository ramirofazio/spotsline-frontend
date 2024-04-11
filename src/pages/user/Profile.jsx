import { Avatar, Button, Divider } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { removeAuthWithToken } from "src/api";
import { actionsAuth, actionsUser } from "src/redux/reducers";
import ProfileData from "./ProfileData";
import ProfileOrders from "./ProfileOrders";
import { DefaultButton } from "src/components";
import { getOfStorage, saveInStorage } from "src/utils/localStorage";

const selectButtonsData = [
  { name: "MI PERFIL", startIcon: "user", component: <ProfileData /> },
  { name: "MIS COMPRAS", startIcon: "shopping-cart-2", component: <ProfileOrders /> },
];

export function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //TODO crear avatar en tabla CLIENTE
  const { userData } = useLoaderData();

  const [selectedSection, setSelectedSection] = useState(() => {
    const local = getOfStorage("profileSelectedSection");
    if (local) {
      return local;
    }

    return "MI PERFIL";
  });

  async function updateAvatar(file) {
    console.log(file);
  }

  const handleSelect = (name) => {
    setSelectedSection(name);
    saveInStorage("profileSelectedSection", name);
  };

  return (
    <main className="pt-16 md:pt-20">
      <header className="relative hidden flex-col items-center justify-center md:flex md:h-40">
        <h1 className="text-2xl font-bold lg:text-3xl">MI CUENTA</h1>
        <DefaultButton
          className="absolute right-10 bg-gradient-to-r from-primary to-yellow-200 font-bold"
          radius="full"
          endContent={<i className="ri-logout-circle-line icons text-xl font-bold text-black" />}
          onPress={() => {
            navigate("/");
            toast.info("Sesión cerrada con exito", { description: "¡Esperamos verte pronto!" });
            setTimeout(() => {
              //? Para evitar salto y que aparezca el errorBundler
              //TODO ANALIZAR ESTO
              removeAuthWithToken();
              dispatch(actionsUser.cleanUser());
              dispatch(actionsAuth.cleanAuth());
            }, 1000);
          }}
        >
          CERRAR SESIÓN
        </DefaultButton>
        <Divider className="absolute bottom-0 mx-auto h-[3px] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
      </header>
      <div className="md:grid md:grid-cols-2">
        <section className="flex flex-col items-center justify-start gap-2 p-10 pt-10">
          <div className="relative">
            <Avatar
              src={userData.avatar}
              name={userData.fantasyName}
              className="mx-auto mb-10 h-28 w-28 p-2 md:h-40 md:w-40"
              classNames={{ base: "bg-white" }}
            />
            {/* acaaa */}
            <Button
              onPress={() => updateAvatar("zaracatunga")}
              isIconOnly
              className="-right-20 -top-20 rounded-full bg-gradient-to-r from-primary to-yellow-200 font-bold text-black md:-right-28 md:flex"
              startContent={
                <i className="ri-pencil-line icons text-xl font-bold text-black">
                  <input type="file" className="bg-transparent"/>
                </i>
              }
            />
          </div>
          <h1 className="underliner -mt-10 rounded-full bg-gradient-to-r from-primary to-yellow-200 p-2 px-4 text-center font-bold md:text-xl lg:w-80">
            {userData.fantasyName}
          </h1>

          <div className="mt-10 flex flex-col items-center justify-around gap-3">
            {selectButtonsData.map(({ name, startIcon }) => (
              <Button
                key={name}
                onPress={() => handleSelect(name)}
                startContent={<i className={`ri-${startIcon}-fill text-xl text-dark transition`} />}
                endContent={
                  <i
                    className={`ri-arrow-right-s-line text-xl text-dark transition ${
                      selectedSection === name && "rotate-90"
                    }`}
                  />
                }
                className={`flex w-60 justify-between bg-gradient-to-r from-primary to-yellow-200 py-8 text-lg font-bold transition lg:w-80 lg:text-xl ${
                  selectedSection === name && "from-dark/20 to-dark/20"
                }`}
              >
                {name}
              </Button>
            ))}
          </div>
          <Divider className="mt-10 h-[3px] w-[60vw] rounded-xl bg-gradient-to-r from-primary to-yellow-600 md:hidden" />
        </section>
        <section className="md:col-start-2">
          {selectButtonsData.map(({ name, component }, index) => (
            <div key={index}>{name === selectedSection && component}</div>
          ))}
        </section>
        <Divider className="mx-auto mb-10 h-[3px] w-[60vw] rounded-xl bg-gradient-to-r from-primary to-yellow-600 md:hidden" />
      </div>
    </main>
  );
}
