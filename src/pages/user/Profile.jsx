import { Avatar, Button, Divider } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { removeAuthWithToken } from "src/api";
import { DefaultButton } from "src/components";
import FloatingLogos from "src/components/images/FloatingLogos";
import { actionsAuth, actionsUser } from "src/redux/reducers";
import ProfileData from "./ProfileData";
import ProfileOrders from "./ProfileOrders";

const selectButtonsData = [
  { name: "MI PERFIL", startIcon: "user", component: <ProfileData /> },
  { name: "MIS COMPRAS", startIcon: "shopping-cart-2", component: <ProfileOrders /> },
];

export function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useLoaderData();

  //TODO poner identificador en localStorage o URL para que quede guardado el selectedSection
  const [selectedSection, setSelectedSection] = useState({
    name: "MI PERFIL",
    startIcon: "user",
    component: <ProfileData />,
  });

  const handleSelect = (data) => {
    setSelectedSection(data);
  };

  return (
    <main className="pt-16">
      <section className="relative flex flex-col items-center justify-center gap-2 p-4">
        <FloatingLogos />
        <Avatar
          src={userData.avatar}
          name={userData.fantasyName}
          className="mx-auto mb-10 h-28 w-28 p-2"
          classNames={{ base: "bg-white" }}
        />
        <div className="items-cente r flex w-full justify-center gap-2">
          <h1 className="underliner  rounded-full bg-primary p-2 px-4 font-bold">{userData.fantasyName}</h1>
          <Button
            isIconOnly
            color="primary"
            radius="full"
            onPress={() => {
              navigate("/");
              toast.info("Sesión cerrada con exito", { description: "¡Esperamos verte pronto!" });
              setTimeout(() => {
                //? Para evitar salto y que aparezca el errorBundler
                removeAuthWithToken();
                dispatch(actionsUser.cleanUser());
                dispatch(actionsAuth.cleanAuth());
              }, 1000);
            }}
          >
            <i className="ri-logout-circle-line icons text-xl font-bold text-black" />
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <DefaultButton
            className="font-bold text-black"
            startContent={<i className="ri-pencil-line icons text-xl font-bold text-black" />}
          >
            Editar foto
          </DefaultButton>
        </div>
        <div className="mt-10 flex flex-col items-center justify-around gap-3">
          {selectButtonsData.map(({ name, startIcon, component }) => (
            <Button
              key={name}
              onPress={() => handleSelect({ name, startIcon, component })}
              startContent={<i className={`ri-${startIcon}-fill text-xl text-dark transition`} />}
              endContent={
                <i
                  className={`ri-arrow-right-s-line text-xl text-dark transition ${
                    selectedSection.name === name && "rotate-90"
                  }`}
                />
              }
              className={`flex w-60 justify-between bg-gradient-to-r from-primary to-yellow-200 py-8 text-lg font-bold transition ${
                selectedSection.name === name && "from-dark/20 to-dark/20"
              }`}
            >
              {name}
            </Button>
          ))}
        </div>
        <Divider className="mt-10 h-[3px] w-[60vw] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
      </section>
      <section>{selectedSection.component}</section>
      <Divider className="mx-auto mb-10 h-[3px] w-[60vw] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
    </main>
  );
}
