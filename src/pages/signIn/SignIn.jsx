import { Input } from "@nextui-org/react";
import { DefaultButton } from "../../components/buttons";
import { useEffect, useState } from "react";
import { isValidSignIn } from "../utils/validation";
import { APISpot } from "../../api";

export function SignIn() {
  const [signInData, setSignInData] = useState(false);
  const [errs, setErrs] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  function setData({ target }) {
    setSignInData((prev) => {
      const newData = { ...prev, [target.name]: target.value };
      setErrs(isValidSignIn(newData));
      return newData;
    });
  }

  function handleSignIn() {}

  useEffect(() => {
    console.log(signInData);
  }, [signInData]);
  return (
    <section>
      <div className="mx-auto w-[65%] border-2">
        <h1 className="mx-auto">ACCEDER</h1>
        <form className="my-5 flex flex-col gap-4 px-2 ">
          <Input
            name="email"
            className="mx-auto w-1/2 min-w-fit "
            isRequired
            size="lg"
            type="email"
            label="Correo electrónico"
            variant="bordered"
            labelPlacement="outside"
            errorMessage={errs.email && errs.email}
            onChange={setData}
          />
          <Input
            name="password"
            className="mx-auto w-1/2 min-w-fit"
            isRequired
            size="lg"
            type={isVisible ? "text" : "password"}
            label="Correo electrónico"
            variant="bordered"
            labelPlacement="outside"
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
          <DefaultButton
            disabled={Object.values(errs)?.length ? true : false}
            onClick={handleSignIn}
            className="mx-auto"
            text="acceder"
          />
        </form>
      </div>
    </section>
  );
}
