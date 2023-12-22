import { Input } from "@nextui-org/react";
import { useState } from "react";
import { isValidPasswords } from "../../utils/validation";
import { APISpot } from "../../api";
import { DefaultButton } from "../../components/buttons";
import { useLocation } from "react-router-dom";

export function ChangePassword() {
  const { search } = useLocation();
  const [passwords, setPasswords] = useState("");
  const [errs, setErrs] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  function handlePassword({ target }) {
    setPasswords((prev) => {
      const newData = { ...prev, [target.name]: target.value };
      setErrs(isValidPasswords(newData));
      return newData;
    });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const res = await APISpot.auth.signIn(passwords);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <form className="flex flex-col items-center gap-6" onSubmit={handleSubmit}>
      {search === "?type=first" && (
        <span className="flex w-fit flex-col items-center justify-center gap-2">
          <h1>Bienvenido al nuevo sistema web de Spotsline!</h1>
          <h2>cambie la contraseña otorgada</h2>
        </span>
      )}
      {search === "?type=change" && (
        <span className="flex w-fit flex-col items-center justify-center gap-2">
          <h1>A continuación ingrese su nueva contraseña</h1>
          <h2>esta debe ser distinta a la anterior</h2>
        </span>
      )}
      <Input
        name="password"
        className="mx-auto w-1/2 min-w-fit"
        isRequired
        size="lg"
        type={isVisible ? "text" : "password"}
        label="Contraseña"
        variant="bordered"
        labelPlacement="outside"
        isInvalid={Boolean(errs)}
        errorMessage={errs && errs}
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <i className="ri-eye-fill pointer-events-none text-2xl text-default-400" />
            ) : (
              <i className="ri-eye-off-fill pointer-events-none text-2xl text-default-400" />
            )}
          </button>
        }
        onChange={handlePassword}
      />
      <Input
        name="confirmPassword"
        className="mx-auto w-1/2 min-w-fit"
        isRequired
        size="lg"
        type={isVisible ? "text" : "password"}
        label="Confirmar contraseña"
        variant="bordered"
        labelPlacement="outside"
        isInvalid={Boolean(errs)}
        errorMessage={errs && errs}
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <i className="ri-eye-fill pointer-events-none text-2xl text-default-400" />
            ) : (
              <i className="ri-eye-off-fill pointer-events-none text-2xl text-default-400" />
            )}
          </button>
        }
        onChange={handlePassword}
      />
      <DefaultButton
        disabled={Object.values(errs)?.length || !Object.values(passwords)?.length ? true : false}
        type="submit"
        className=""
        text="cambiar contraseña"
      />
    </form>
  );
}
