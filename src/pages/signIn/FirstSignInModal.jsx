import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { APISpot, removeAuthWithToken } from "src/api";
import { DarkModal, DefaultButton, PasswordInput } from "src/components";
import { actionsAuth, actionsUser } from "src/redux/reducers";

const inputFields = [
  { name: "newPassword", label: "Nueva contraseña" },
  { name: "newPasswordConfirm", label: "Confirmar nueva contraseña" },
];

export function FirstSignInModal({ navigate }) {
  const dispatch = useDispatch();

  const { firstSignIn, email } = useSelector((state) => state.user);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [data, setData] = useState({
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [errs, setErrs] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (firstSignIn) {
      onOpen();
    }
  }, [firstSignIn]);

  const handleChange = ({ target: { name, value } }) => {
    setData((prev) => {
      const newData = { ...prev, [name]: value };
      //todo: setErrs(isValidSignIn(newData));
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await APISpot.auth.firstTimePassword({ ...data, email: email });
      if (res === 200) {
        toast.success("Contraseña actualizada con exito.");
        navigate("/");
        onClose();
      }
    } catch (e) {
      toast.error("Hubo un error al actualizar la contraseña.", { description: e.response.data.message });
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogOut = () => {
    onClose();
    removeAuthWithToken();
    dispatch(actionsUser.cleanUser());
    dispatch(actionsAuth.cleanAuth());
    navigate("/");
  };

  return (
    <DarkModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      title={"¿PRIMERA VEZ?"}
      description={"¡Actualicemos tu contraseña!"}
    >
      <i className="ri-logout-circle-line icons absolute left-0 top-0 text-xl text-red-500" onClick={handleLogOut} />
      <form className="mb-20 flex flex-col items-center justify-start gap-4" onSubmit={(e) => handleSubmit(e)}>
        {inputFields.map(({ name, label }, index) => (
          <PasswordInput
            key={index}
            name={name}
            label={label}
            isInvalid={Boolean(errs[name])}
            errorMessage={errs[name]}
            onChange={handleChange}
          />
        ))}

        <DefaultButton isDisabled={!Object.values(data)?.length} type="submit" isLoading={isLoading}>
          ACTUALIZAR
        </DefaultButton>
      </form>
    </DarkModal>
  );
}
