import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { APISpot, addAuthWithToken } from "src/api";
import { DarkModal, DefaultButton, PasswordInput } from "src/components";
import { actionsAuth, actionsUser } from "src/redux/reducers";
import { isValidPasswords } from "src/utils/validation";

const inputFields = [
  { name: "newPassword", label: "Nueva contraseña" },
  { name: "newPasswordConfirm", label: "Confirmar nueva contraseña" },
];

export function ChangePasswordModal({ isOpen, onOpenChange, navigate, email, onClose, isDismissable = false }) {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [errs, setErrs] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setData((prev) => {
      const newData = { ...prev, [name]: value };
      setErrs(isValidPasswords(newData));
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
      isDismissable={isDismissable}
      title={"ACTUALIZA TU CONTRASEÑA"}
      description={"¡Actualicemos tu contraseña!"}
    >
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

        <DefaultButton
          isDisabled={!data?.newPassword.length || !data?.newPasswordConfirm.length || Object.values(errs).length && true}
          type="submit"
          isLoading={isLoading}
        >
          ACTUALIZAR
        </DefaultButton>
      </form>
    </DarkModal>
  );
}
