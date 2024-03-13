import { Avatar, Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { removeAuthWithToken } from "src/api";
import { DefaultButton } from "src/components";
import { actionsAuth, actionsUser } from "src/redux/reducers";

export function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useLoaderData();
  console.log(userData);

  return (
    <main className="relative h-screen pt-16">
      <section className="flex flex-col items-center justify-center gap-2 p-4">
        <Avatar
          src={userData.avatar}
          name={userData.fantasyName}
          className="mx-auto mb-10 h-28 w-28 p-2"
          classNames={{ base: "bg-white" }}
        />
        <div className="flex w-full items-center justify-center gap-2">
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
      </section>
      <section></section>
    </main>
  );
}
