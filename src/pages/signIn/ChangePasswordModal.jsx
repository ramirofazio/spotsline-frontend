import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";
import { APISpot } from "src/api";
import { DarkModal } from "src/components";

const inputFields = [
  { name: "newPassword", label: "Nueva contraseña" },
  { name: "newPasswordConfirm", label: "Confirmar nueva contraseña" },
];

export function ChangePasswordModal({ isOpen, onOpenChange, navigate, email }) {
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
      const res = await APISpot.auth.confirmPasswordReset({ ...data, email: email });
      if (res) {
        //! CHEQUEAR ESTA LOGICA
        toast.success("Contraseña actualizada con exito.");
        navigate("/");
        //! TODO Hacer auto login
      }
      console.log(res);
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
          className="w-40 rounded-full font-bold tracking-widest text-white"
          isLoading={isLoading}
        >
          ACTUALIZAR
        </Button>
      </form>
    </DarkModal>
  );
}
