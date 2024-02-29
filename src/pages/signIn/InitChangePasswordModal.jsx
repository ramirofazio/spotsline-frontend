import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";
import { APISpot } from "src/api";
import { DarkModal } from "src/components";

export function InitChangePasswordModal({ isOpen, onOpenChange }) {
  const [email, setEmail] = useState("");
  const [errs, setErrs] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await APISpot.auth.initPasswordReset(email);

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
        <Input
          classNames={{ label: "text-white" }}
          color="secondary"
          className="!text-white"
          name="email"
          isRequired
          size="lg"
          radius="full"
          type={"email"}
          label="Correo electrónico"
          variant="bordered"
          labelPlacement="outside"
          isInvalid={Boolean(errs)}
          errorMessage={errs}
          startContent={<i className="ri-mail-fill" />}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          isDisabled={!email}
          type="submit"
          variant="solid"
          color={"primary"}
          className="w-40 rounded-full font-bold tracking-widest text-dark"
          isLoading={isLoading}
        >
          ENVIAR
        </Button>
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
