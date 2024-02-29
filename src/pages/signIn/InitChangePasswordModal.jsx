import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";
import { APISpot } from "src/api";
import { DarkModal } from "src/components";

export function InitChangePasswordModal({ isOpen, onOpenChange, navigate }) {
  const [email, setEmail] = useState("");
  const [errs, setErrs] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await APISpot.auth.initPasswordReset(email);

      if (res === 200) {
        toast.success("¡Correo electronico enviado con exito! Por favor revise su casilla.");
        navigate("/");
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
      title={"¿OLVIDASTE TU CONTRASEÑA?"}
      description={"¡Dejanos acá tu mail y lo solucionamos!"}
    >
      <form className="mb-20 flex flex-col items-center justify-start gap-4" onSubmit={(e) => handleSubmit(e)}>
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
    </DarkModal>
  );
}
