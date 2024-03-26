import { useState } from "react";
import { toast } from "sonner";
import { APISpot } from "src/api";
import { BasicInput, DarkModal, DefaultButton } from "src/components";
import { isValidEmail } from "src/utils/validation";

export function InitChangePasswordModal({ isOpen, onOpenChange }) {
  const [email, setEmail] = useState("");
  const [errs, setErrs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  const handleChange = ({ target }) => {
    setEmail((prev) => {
      setErrs(isValidEmail(target.value));
      return target.value;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await APISpot.auth.initPasswordReset(email.trim());

      if (res === 200) {
        setFlag(true);
      }
    } catch (e) {
      toast.error("Hubo un error, por favor intentalo de nuevo.");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DarkModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={flag ? "¡LISTO!" : "¿OLVIDASTE TU CONTRASEÑA?"}
      description={flag ? "" : "¡Dejanos acá tu mail y lo solucionamos!"}
    >
      <form
        className={`${flag && "hidden"} mb-20 flex flex-col items-center justify-start gap-4`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <BasicInput
          name="email"
          type="email"
          label="Correo electrónico"
          isInvalid={Boolean(errs)}
          errorMessage={errs}
          startContentIcon={"ri-mail-fill text-xl"}
          onChange={handleChange}
        />

        <DefaultButton isDisabled={errs} type="submit" isLoading={isLoading}>
          ENVIAR
        </DefaultButton>
      </form>

      <section className={`${!flag && "hidden"} mb-20 grid place-items-center gap-4`}>
        <i className="ri-mail-check-line  text-5xl text-primary" />
        <div className="grid text-center text-lg text-primary/50">
          <p className="flex ">
            ENVIAMOS UN MAIL A <strong className="ml-1 blur-[3px]">{email.split("@")[0]}</strong>@{email.split("@")[1]}
          </p>
          <p>¡No olvides chequear spam!</p>
        </div>
        <p className="absolute bottom-0 text-primary/50">
          ¿Te confundiste de mail?{" "}
          <strong className="icons text-secondary underline" onClick={() => setFlag(false)}>
            Reenviar a otro
          </strong>
        </p>
      </section>
    </DarkModal>
  );
}
