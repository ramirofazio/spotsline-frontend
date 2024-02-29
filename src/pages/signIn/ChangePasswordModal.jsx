import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { APISpot, addAuthWithToken } from "src/api";
import { DarkModal } from "src/components";
import { actionsAuth, actionsUser } from "src/redux/reducers";

const inputFields = [
  { name: "newPassword", label: "Nueva contraseña" },
  { name: "newPasswordConfirm", label: "Confirmar nueva contraseña" },
];

export function ChangePasswordModal({ isOpen, onOpenChange, navigate, email, onClose }) {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [errs, setErrs] = useState({});
  const [revealPasswordInput, setRevealPasswordInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      //? Esta ruta me devuelve lo mismo que al hacer un login si sale todo OK
      const { access_token, user } = await APISpot.auth.confirmPasswordReset({ ...data, email: email });
      if (access_token && user) {
        addAuthWithToken(access_token);
        dispatch(actionsAuth.setAccessToken(access_token));
        dispatch(actionsUser.setUser(user));

        onClose();
        toast.success("Contraseña actualizada con exito.");
        navigate("/");
      }
    } catch (e) {
      toast.error("Hubo un error al actualizar la contraseña.");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DarkModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      title={"ACTUALIZA TU CONTRASEÑA"}
      description={"¡Actualicemos tu contraseña!"}
    >
      <form className="mb-20 flex flex-col items-center justify-start gap-4" onSubmit={(e) => handleSubmit(e)}>
        {inputFields.map(({ name, label }, index) => (
          <Input
            classNames={{ label: "text-white" }}
            key={index}
            color="secondary"
            className="!text-white"
            name={name}
            isRequired
            size="lg"
            radius="full"
            type={revealPasswordInput ? "text" : "password"}
            label={label}
            variant="bordered"
            labelPlacement="outside"
            isInvalid={Boolean(errs[name])}
            errorMessage={errs[name]}
            startContent={<i className="ri-key-fill text-xl" />}
            endContent={
              <i
                className={`${
                  revealPasswordInput ? "ri-lightbulb-fill text-primary" : "ri-lightbulb-line"
                }  icons text-xl `}
                onClick={() => setRevealPasswordInput(!revealPasswordInput)}
              />
            }
            onChange={handleChange}
          />
        ))}

        <Button
          isDisabled={!Object.values(data)?.length}
          type="submit"
          variant="solid"
          color={"primary"}
          className="w-40 rounded-full font-bold tracking-widest text-dark"
          isLoading={isLoading}
        >
          ACTUALIZAR
        </Button>
      </form>
    </DarkModal>
  );
}
