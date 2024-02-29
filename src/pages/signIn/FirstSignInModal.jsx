import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { APISpot } from "src/api";
import { DarkModal } from "src/components";
import { deleteOfStorage } from "src/utils/localStorage";

const inputFields = [
  { name: "newPassword", label: "Nueva contraseña" },
  { name: "newPasswordConfirm", label: "Confirmar nueva contraseña" },
];

export function FirstSignInModal() {
  const { firstSignIn, email } = useSelector((state) => state.user);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [data, setData] = useState({
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [errs, setErrs] = useState({});
  const [revealPasswordInput, setRevealPasswordInput] = useState(false);
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
      console.log({ ...data, email: email });
      const res = await APISpot.auth.firstTimePassword({ ...data, email: email });
      if (res.status === 200) {
        window.location.replace("/");
      }
      //TODO
    } catch (e) {
      toast.error("Hubo un error al actualizar la contraseña.");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogOut = () => {
    deleteOfStorage("user");
    deleteOfStorage("access_token");
    window.location.replace("/");
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
          <Input
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
