import { Input } from "@nextui-org/react";
import { useState } from "react";

export function FirstSignIn() {

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <main>
      <h1>Bienvenido al nuevo sistema web de Spotsline!</h1>
      <h2>cambie la contraseña otorgada</h2>
      <Input
        name="password"
        className="mx-auto w-1/2 min-w-fit"
        isRequired
        size="lg"
        type={isVisible ? "text" : "password"}
        label="Contraseña"
        variant="bordered"
        labelPlacement="outside"
        isInvalid={Boolean(errs.password)}
        errorMessage={errs.password && errs.password}
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <i className="ri-eye-fill pointer-events-none text-2xl text-default-400" />
            ) : (
              <i className="ri-eye-off-fill pointer-events-none text-2xl text-default-400" />
            )}
          </button>
        }
        onChange={setData}
      />
    </main>
  );
}
