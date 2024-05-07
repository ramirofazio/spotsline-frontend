import { Divider, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BasicInput, DefaultButton } from "src/components";
import { ChangePasswordModal } from "../signIn/ChangePasswordModal";
import { APISpot } from "src/api";
import { useSelector } from "react-redux";

const inputFields = [
  { name: "username", startIcon: "ri-user-fill", label: "NOMBRE COMPLETO" },
  { name: "cuit", startIcon: "ri-profile-line", label: "CUIT" },
  { name: "email", startIcon: "ri-mail-line", label: "EMAIL" },
  { name: "password", startIcon: "ri-key-line", label: "CONTRASEÑA", pencil: true },
];

//TODO Alerta cuando navegan hacia atras para avisar que sus datos no se guardaran o algo asi, puede ser un modal con un boton para que los
export default function ProfileData() {
  const navigate = useNavigate();
  const { userData } = useLoaderData();

  const { managedClient } = useSelector((state) => state.seller);

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    id: userData.id,
    username: userData.fantasyName,
    cuit: userData.cuit ?? "xxxxxxxxxxxx",
    email: userData.email,
    password: "***********",
  });

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await APISpot.user.updateData(data).then((res) => {
        if (res === 200) {
          toast.success("Datos modificados con exito!");
          navigate();
        }
      });
    } catch (e) {
      console.log(e);
      toast.info("Hubo un error al guardar tus datos", { description: e.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData({
      email: managedClient.email,
      id: managedClient.id,
      username: managedClient.fantasyName,
      cuit: managedClient.cuit ?? "xxxxxxxxxxxx",
    });
  }, [managedClient]);

  return (
    <main className="relative flex flex-col items-center gap-6 py-10 text-center">
      <header className="md:w-full md:text-left">
        <h2 className="text-xl font-bold">DATOS PERSONALES</h2>
        <Divider className="my-2 hidden h-[2px] rounded-xl bg-dark md:flex lg:w-80" />
        <p className="text-xs">Edita los datos de tu perfil de usuario.</p>
      </header>
      <form className="flex flex-col gap-4 lg:w-[80%] lg:self-start lg:pr-10" onSubmit={handleSubmit}>
        {inputFields.map(({ name, startIcon, label, pencil }) => (
          <div key={name} className="relative">
            <BasicInput
              name={name}
              startContentIcon={startIcon}
              endContent={
                !managedClient.id &&
                pencil && <i className="ri-pencil-line icons text-xl text-dark" onClick={() => onOpen()} />
              }
              label={label}
              onChange={handleOnChange}
              value={data[name]}
              disabled={name === "password" || name === "email" || managedClient.id}
              labelClass="text-dark font-bold mt-1 text-sm"
              inputWrapperClass="bg-white border-none"
            />
            {name === "email" && (
              <p className="absolute right-0 mt-1 text-right text-[9px]">*Esta información no puede editarse.</p>
            )}
          </div>
        ))}
        <DefaultButton
          isDisabled={loading || managedClient.id}
          type="submit"
          className={"mt-6 font-bold lg:mx-auto "}
          isLoading={loading}
        >
          GUARDAR CAMBIOS
        </DefaultButton>
      </form>
      <ChangePasswordModal
        isDismissable={true}
        isOpen={isOpen}
        navigate={navigate}
        onClose={onClose}
        onOpenChange={onOpenChange}
        email={userData.email}
      />
    </main>
  );
}
